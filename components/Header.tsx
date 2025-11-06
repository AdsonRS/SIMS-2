
import React from 'react';

const BikeIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.5 4a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM5 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0ZM19 16.5a3.5 3.5 0 1 0 7 0 3.5 3.5 0 0 0-7 0Zm-11-2.04a5.5 5.5 0 0 1 10.95.94L18.7 17.5h2.15l-1.95-3.51A4.5 4.5 0 0 0 15.5 11H8.83l-2.4-4.8A2 2 0 0 0 4.6 5H2V3h2.6a4 4 0 0 1 3.8 2.8l1.4 2.8H15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5h-1.54l-2.9 5.8a1.5 1.5 0 0 0 1.34 2.2h9.2a1.5 1.5 0 0 0 1.4-2.1L19.3 12.8A5.5 5.5 0 0 1 8 14.46Z"/>
  </svg>
);

const UserIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.717 7.717 0 0 1 12 15.75a7.717 7.717 0 0 1 5.855 2.062A8.25 8.25 0 0 1 12 20.25a8.25 8.25 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
  </svg>
);

const Header = ({ onProfileClick }) => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-20">
      <div className="flex items-center space-x-2">
        <BikeIcon className="w-8 h-8 text-purple-600" />
        <span className="text-xl font-bold text-purple-600">SIMS UFMA</span>
      </div>
      <button onClick={onProfileClick} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
        <UserIcon className="w-7 h-7 text-purple-600" />
      </button>
    </header>
  );
};

export default Header;
