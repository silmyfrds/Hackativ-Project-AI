import React from 'react';

const StoreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
);

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
);

const SidebarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="3" x2="9" y2="21"></line>
    </svg>
);


interface HeaderProps {
    onToggleSidebar: () => void;
    onToggleHistory: () => void;
    onDeleteChat: () => void;
    isDeleteDisabled: boolean;
    isHistoryVisible: boolean;
}


const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleHistory, onDeleteChat, isDeleteDisabled, isHistoryVisible }) => {
    return (
        <header className="bg-black/30 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-zinc-700/50">
            <div className="grid grid-cols-3 items-center max-w-4xl mx-auto">
                <div className="flex justify-start">
                    <button onClick={onToggleSidebar} className="text-gray-200 hover:text-white transition-colors p-2 rounded-full -ml-2 md:hidden" aria-label="Buka riwayat">
                        <MenuIcon />
                    </button>
                    <button 
                        onClick={onToggleHistory} 
                        className="hidden md:flex text-gray-200 hover:text-white transition-colors p-2 rounded-full -ml-2"
                        aria-label={isHistoryVisible ? "Sembunyikan riwayat" : "Tampilkan riwayat"}
                    >
                        <SidebarIcon />
                    </button>
                </div>
                <div className="flex items-center justify-center col-start-2">
                    <StoreIcon />
                    <h1 className="text-xl md:text-2xl font-bold text-gray-100 ml-3">Asisten Toko AI</h1>
                </div>
                <div className="flex justify-end">
                    <button 
                        onClick={onDeleteChat} 
                        className="text-gray-200 hover:text-white transition-colors p-2 rounded-full -mr-2 disabled:text-zinc-600 disabled:cursor-not-allowed" 
                        aria-label="Hapus percakapan"
                        disabled={isDeleteDisabled}
                    >
                        <DeleteIcon />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
