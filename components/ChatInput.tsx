
import React, { useState, KeyboardEvent } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string) => void;
    isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="bg-zinc-900 p-4 border-t border-zinc-700/50 sticky bottom-0">
            <div className="max-w-4xl mx-auto flex items-start bg-zinc-800 rounded-xl px-2 py-2">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Tanyakan tentang rekomendasi produk..."
                    className="flex-grow bg-transparent p-2 pl-4 border-none focus:outline-none focus:ring-0 resize-y max-h-40 text-gray-200 placeholder-gray-400"
                    rows={1}
                    disabled={isLoading}
                    style={{ minHeight: '2.5rem' }} 
                />
                <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-500 disabled:bg-zinc-700 disabled:cursor-not-allowed transition-colors duration-200 self-end"
                    aria-label="Kirim pesan"
                >
                    <SendIcon />
                </button>
            </div>
        </div>
    );
};

export default ChatInput;
