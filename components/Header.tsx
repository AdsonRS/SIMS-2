
import React from 'react';

const TrophyIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.767 47.767 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.348Zm13.668 0c.325.054.65.116.974.184-.593 1.18-1.55 2.147-2.771 2.809a5.22 5.22 0 0 1 .94-2.645l.857-.348Z" clipRule="evenodd" />
  </svg>
);

const UserAvatar = ({ onClick }) => (
  <button onClick={onClick} className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-0.5 shadow-lg active:scale-95 transition-transform">
    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
        <img src="https://api.dicebear.com/9.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full" />
    </div>
  </button>
);

const EcoBadge = () => (
    <div className="flex items-center space-x-1 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/50">
        <span className="text-green-600 text-xs font-bold">🌱 4.2 kg</span>
        <span className="text-gray-500 text-[10px] font-medium uppercase tracking-wide">CO2 Salvo</span>
    </div>
)

const Header = ({ onProfileClick, onRankingClick }) => {
  return (
    <header className="px-4 py-4 flex justify-between items-start pointer-events-none">
      {/* Left: Brand & Eco */}
      <div className="flex flex-col items-start space-y-2 pointer-events-auto">
         <div className="flex items-center space-x-2 bg-purple-600 text-white px-3 py-1.5 rounded-full shadow-lg shadow-purple-500/30">
            <span className="font-bold tracking-tight text-sm">SIMS</span>
            <span className="font-light text-purple-200 text-sm">| UFMA</span>
         </div>
         <EcoBadge />
      </div>

      {/* Right: Ranking & Profile */}
      <div className="flex items-center space-x-3 pointer-events-auto">
        <button 
            onClick={onRankingClick}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur shadow-lg flex items-center justify-center text-yellow-500 active:scale-95 transition-all border border-yellow-100"
        >
            <TrophyIcon className="w-5 h-5" />
        </button>
        <UserAvatar onClick={onProfileClick} />
      </div>
    </header>
  );
};

export default Header;
