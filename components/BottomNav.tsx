
import React from 'react';
import { Screen } from '../types.ts';

const MapPinIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
    </svg>
);

const ClockIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const CreditCardIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15z" />
    <path fill="#fff" d="M21 9.75H3v-.75a3 3 0 013-3h15a.75.75 0 01.75.75v3z" />
  </svg>
);

const CogIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
  </svg>
);


// FIX: Explicitly type NavItem as a React Functional Component to correctly handle the 'key' prop.
const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-1/4 py-2 transition-colors duration-200 ${
      isActive ? 'text-purple-600' : 'text-gray-500 hover:text-purple-500'
    }`}
  >
    {icon}
    <span className={`text-xs font-medium ${isActive ? 'font-bold' : ''}`}>{label}</span>
  </button>
);

const BottomNav = ({ activeScreen, setActiveScreen }) => {
  const navItems = [
    { screen: Screen.Map, icon: <MapPinIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Trips, icon: <ClockIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Wallet, icon: <CreditCardIcon className="w-6 h-6 mb-1" /> },
    { screen: Screen.Settings, icon: <CogIcon className="w-6 h-6 mb-1" /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)] flex justify-around max-w-md mx-auto z-20">
      {navItems.map((item) => (
        <NavItem
          key={item.screen}
          icon={item.icon}
          label={item.screen}
          isActive={activeScreen === item.screen}
          onClick={() => setActiveScreen(item.screen)}
        />
      ))}
    </div>
  );
};

export default BottomNav;
