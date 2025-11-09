
import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-start gap-3 my-4 justify-start">
             <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm shrink-0">
                AI
            </div>
            <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-zinc-800 text-gray-200">
                <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
