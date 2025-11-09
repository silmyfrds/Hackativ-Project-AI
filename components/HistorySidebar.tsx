
import React from 'react';
import { Conversation } from '../types';

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const ChatBubbleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
);


interface HistorySidebarProps {
    conversations: Conversation[];
    activeConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
    isOpen: boolean;
    onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
    conversations,
    activeConversationId,
    onNewChat,
    onSelectConversation,
    isOpen,
    onClose
}) => {
    return (
       <>
         <div className={`fixed inset-0 bg-black/60 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
         <aside className={`absolute md:relative flex flex-col h-full bg-zinc-950 border-r border-zinc-700/50 w-64 lg:w-72 shrink-0 transition-transform duration-300 ease-in-out z-30 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
            <div className="p-3 border-b border-zinc-700/50">
                <button
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                >
                    <PlusIcon />
                    Percakapan Baru
                </button>
            </div>
            <nav className="flex-grow overflow-y-auto p-2 space-y-1">
                {conversations.map((convo) => (
                    <button
                        key={convo.id}
                        onClick={() => onSelectConversation(convo.id)}
                        className={`w-full text-left flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                            activeConversationId === convo.id ? 'bg-zinc-800' : 'hover:bg-zinc-800/50'
                        }`}
                    >
                        <ChatBubbleIcon />
                        <span className="truncate flex-grow text-gray-200">{convo.title}</span>
                    </button>
                ))}
            </nav>
        </aside>
       </>
    );
};

export default HistorySidebar;
