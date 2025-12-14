import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-border-dark px-6 py-3 bg-white dark:bg-background-dark shrink-0 z-20">
      <div className="flex items-center gap-4">
        <div className="size-8 text-[#0071dc] dark:text-white">
          <svg viewBox="0 0 48 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"></path>
          </svg>
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-gray-900 dark:text-white">Walmart Sales Forecast</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 opacity-70 hover:opacity-100 transition-opacity">
          <span className="material-symbols-outlined text-[20px]">help</span>
          <span>Help</span>
        </button>
        <div 
            className="bg-center bg-no-repeat bg-cover rounded-full size-9 border border-border-dark" 
            style={{ backgroundImage: 'url("https://picsum.photos/100/100")' }}
            title="User Profile"
        ></div>
      </div>
    </header>
  );
};

export default Header;