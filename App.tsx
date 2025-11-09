import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Chat } from '@google/genai';
import { Message, Conversation } from './types';
import { createChatSession, sendMessageToAI } from './services/geminiService';
import * as historyService from './services/historyService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import WelcomeScreen from './components/WelcomeScreen';
import LoadingSpinner from './components/LoadingSpinner';
import HistorySidebar from './components/HistorySidebar';

const App: React.FC = () => {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHistoryVisible, setIsHistoryVisible] = useState(true);
    const chatRef = useRef<Chat | null>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsHistoryVisible(historyService.loadHistoryVisibility());
        const loadedConversations = historyService.loadConversations();
        if (loadedConversations.length > 0) {
            setConversations(loadedConversations);
            const lastActiveId = historyService.loadActiveConversationId();
            const activeId = loadedConversations.find(c => c.id === lastActiveId) 
                ? lastActiveId 
                : loadedConversations[0].id;
            setActiveConversationId(activeId);
        } else {
            handleNewChat();
        }
    }, []);

    useEffect(() => {
        if (conversations.length > 0) {
            historyService.saveConversations(conversations);
        }
    }, [conversations]);

    useEffect(() => {
        historyService.saveActiveConversationId(activeConversationId);
    }, [activeConversationId]);

    useEffect(() => {
        historyService.saveHistoryVisibility(isHistoryVisible);
    }, [isHistoryVisible]);
    
    useEffect(() => {
        const activeConversation = conversations.find(c => c.id === activeConversationId);
        if (activeConversation) {
            chatRef.current = createChatSession(activeConversation.messages);
        }
    }, [activeConversationId, conversations]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversations, isLoading, activeConversationId]);

    const handleSendMessage = async (text: string) => {
        if (!chatRef.current || !activeConversationId) return;

        const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };

        setConversations(prev =>
            prev.map(convo => {
                if (convo.id === activeConversationId) {
                    const newTitle = convo.messages.length === 0
                        ? text.substring(0, 40) + (text.length > 40 ? '...' : '')
                        : convo.title;
                    return { ...convo, title: newTitle, messages: [...convo.messages, userMessage] };
                }
                return convo;
            })
        );
        setIsLoading(true);

        try {
            const aiResponseText = await sendMessageToAI(chatRef.current, text);
            const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: aiResponseText };
            setConversations(prev =>
                prev.map(convo =>
                    convo.id === activeConversationId
                        ? { ...convo, messages: [...convo.messages, aiMessage] }
                        : convo
                )
            );
        } catch (error) {
            console.error(error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                sender: 'ai',
                text: 'Maaf, terjadi kesalahan. Silakan coba lagi.'
            };
            setConversations(prev =>
                prev.map(convo =>
                    convo.id === activeConversationId
                        ? { ...convo, messages: [...convo.messages, errorMessage] }
                        : convo
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = useCallback(() => {
        const newId = Date.now().toString();
        const newConversation: Conversation = { id: newId, title: "Percakapan Baru", messages: [] };
        setConversations(prev => [newConversation, ...prev]);
        setActiveConversationId(newId);
        setIsSidebarOpen(false);
    }, []);

    const handleSelectConversation = useCallback((id: string) => {
        setActiveConversationId(id);
        setIsSidebarOpen(false);
    }, []);

    const handleDeleteChat = useCallback(() => {
        if (!activeConversationId || conversations.length <= 1) return;

        const conversationIdToDelete = activeConversationId;
        
        setConversations(prev => {
            const remaining = prev.filter(c => c.id !== conversationIdToDelete);
            if (remaining.length > 0) {
                 setActiveConversationId(remaining[0].id);
            }
            return remaining;
        });
    }, [activeConversationId, conversations]);
    
    const handleToggleHistory = () => {
        setIsHistoryVisible(prev => !prev);
    };

    const activeConversation = conversations.find(c => c.id === activeConversationId);
    const messages = activeConversation ? activeConversation.messages : [];

    return (
        <div className="flex h-screen bg-zinc-950 text-gray-200 font-sans">
            {isHistoryVisible && (
                <HistorySidebar 
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onNewChat={handleNewChat}
                    onSelectConversation={handleSelectConversation}
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
            <div className="flex flex-col flex-grow bg-zinc-900 min-w-0">
                <Header 
                    onToggleSidebar={() => setIsSidebarOpen(prev => !prev)} 
                    onToggleHistory={handleToggleHistory}
                    onDeleteChat={handleDeleteChat}
                    isDeleteDisabled={conversations.length <= 1}
                    isHistoryVisible={isHistoryVisible}
                />
                <main ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
                    <div className="max-w-4xl mx-auto">
                        {messages.length === 0 ? (
                            <WelcomeScreen onExampleClick={handleSendMessage} />
                        ) : (
                           <>
                             {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
                             {isLoading && <LoadingSpinner />}
                           </>
                        )}
                    </div>
                </main>
                <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
            </div>
        </div>
    );
};

export default App;
