
import React from 'react';
import { Screen } from '../types.ts';

const MapIcon = ({ active }) => (
  <svg className={`w-6 h-6 mb-1 ${active ? 'fill-purple-600' : 'fill-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
     <path d="M12 2C7.589 2 4 5.589 4 9.995 3.971 16.44 11.696 21.784 12 22c0 0 8.029-5.56 8-12 0-4.411-3.589-8-8-8zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
  </svg>
);

const WalletIcon = ({ active }) => (
  <svg className={`w-6 h-6 mb-1 ${active ? 'fill-purple-600' : 'fill-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 6h16v2H4V6zm0 12v-6h16.001l.001 6H4z"/><path d="M6 14h6v2H6z"/>
  </svg>
);

const TimeIcon = ({ active }) => (
   <svg className={`w-6 h-6 mb-1 ${active ? 'fill-purple-600' : 'fill-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13.414 12z"/>
  </svg>
);

const SettingsIcon = ({ active }) => (
  <svg className={`w-6 h-6 mb-1 ${active ? 'fill-purple-600' : 'fill-gray-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);

const QrIcon = () => (
    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h6v6H4V4zm2 2v2h2V6H6zM4 14h6v6H4v-6zm2 2v2h2v-2H6zm10-12h6v6h-6V4zm2 2v2h2V6h-2zM14 14h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm-2-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2-4h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
    </svg>
);

const NavButton = ({ icon, label, active, onClick }) => (
    <button 
        onClick={onClick}
        className="flex flex-col items-center justify-center flex-1 py-1 active:bg-gray-50 transition-colors"
    >
        {icon}
        <span className={`text-[10px] font-medium ${active ? 'text-purple-600' : 'text-gray-400'}`}>
            {label}
        </span>
    </button>
)

const BottomNav = ({ activeScreen, onNavigate, onScan }) => {
  return (
    <div className="w-full bg-white border-t border-gray-200 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-end px-2 pt-2 pb-2 relative">
            
            <NavButton 
                icon={<MapIcon active={activeScreen === Screen.Map} />} 
                label="Mapa" 
                active={activeScreen === Screen.Map}
                onClick={() => onNavigate(Screen.Map)}
            />
            
            <NavButton 
                icon={<TimeIcon active={activeScreen === Screen.Trips} />} 
                label="Viagens" 
                active={activeScreen === Screen.Trips}
                onClick={() => onNavigate(Screen.Trips)}
            />

            {/* Central Action Button (Docked style) */}
            <div className="flex flex-col items-center justify-end -mt-8 px-2">
                 <button 
                    onClick={onScan}
                    className="w-16 h-16 bg-purple-600 rounded-2xl shadow-lg shadow-purple-500/40 flex items-center justify-center transform active:scale-95 transition-all rotate-3 hover:rotate-0"
                >
                    <QrIcon />
                 </button>
                 <span className="text-[10px] font-medium text-gray-400 mt-1">Escanear</span>
            </div>

            <NavButton 
                icon={<WalletIcon active={activeScreen === Screen.Wallet} />} 
                label="Carteira" 
                active={activeScreen === Screen.Wallet}
                onClick={() => onNavigate(Screen.Wallet)}
            />

            <NavButton 
                icon={<SettingsIcon active={activeScreen === Screen.Settings} />} 
                label="Config" 
                active={activeScreen === Screen.Settings}
                onClick={() => onNavigate(Screen.Settings)}
            />

        </div>
    </div>
  );
};

export default BottomNav;
