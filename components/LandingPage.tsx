import React from 'react';

interface LandingPageProps {
    onStartChat: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStartChat }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-zinc-900 text-gray-200 font-sans p-4">
            <div className="text-center">
                <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-zinc-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                    Asisten Toko AI
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
                    Dapatkan rekomendasi produk instan dan akurat untuk pelanggan Anda. Cukup tanyakan, dan biarkan AI membantu Anda.
                </p>
                <button
                    onClick={onStartChat}
                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-500 transition-all duration-300 text-lg shadow-lg shadow-blue-600/20"
                >
                    Mulai Percakapan
                </button>
            </div>
             <footer className="absolute bottom-4 text-center text-zinc-500 text-sm">
                <p>Didukung oleh Gemini API</p>
            </footer>
        </div>
    );
};

export default LandingPage;
