
import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
        K
    </div>
);

const AIIcon = () => (
    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
        AI
    </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
    const isUser = message.sender === 'user';
    
    const formattedText = message.text.split('\n').map((line, index) => (
        <p key={index} className="mb-2 last:mb-0">{line}</p>
    ));

    return (
        <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
            {!isUser && <AIIcon />}
            <div className={`max-w-xs md:max-w-md lg:max-w-2xl p-3 rounded-lg ${isUser ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-gray-200'}`}>
                {formattedText}
            </div>
            {isUser && <UserIcon />}
        </div>
    );
};

export default ChatMessage;
