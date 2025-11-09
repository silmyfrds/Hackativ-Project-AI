
import React from 'react';

interface WelcomeScreenProps {
    onExampleClick: (prompt: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onExampleClick }) => {
    const examples = [
        "Pelanggan mencari ponsel untuk fotografi dengan budget di bawah 5 juta.",
        "Sarankan laptop untuk mahasiswa desain grafis.",
        "Bandingkan TV LED 4K ukuran 55 inch dari merek Samsung dan LG.",
        "Apa headset noise-cancelling terbaik untuk bekerja dari rumah?"
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-100 mb-2">Selamat Datang di Asisten Toko AI</h2>
            <p className="text-gray-400 mb-8 max-w-md">Saya di sini untuk membantu Anda memberikan rekomendasi produk terbaik kepada pelanggan. Coba mulai dengan salah satu contoh di bawah ini.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
                {examples.map((example, index) => (
                    <button
                        key={index}
                        onClick={() => onExampleClick(example)}
                        className="bg-zinc-800 p-4 rounded-lg border border-zinc-700/50 hover:bg-zinc-700 text-left transition-colors duration-200"
                    >
                        <p className="font-medium text-gray-300">{example}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WelcomeScreen;
