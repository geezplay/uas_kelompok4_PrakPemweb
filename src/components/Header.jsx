"use client";

import React from 'react';

export default function Header({ activeTab, setActiveTab, darkMode, setDarkMode, handleOpenAddForm }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white dark:bg-neutral-950 dark:border-neutral-800 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo & Project Title */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center rounded font-black text-lg tracking-tighter">
            RG
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight uppercase block text-black dark:text-white">
              RACE SETUP GARAGE
            </span>
            <span className="text-[10px] text-neutral-500 uppercase block tracking-wider font-semibold">
              TUGAS AKHIR • PEMROGRAMAN WEB
            </span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex space-x-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 text-sm font-medium rounded transition ${
              activeTab === 'dashboard'
                ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('setups')}
            className={`px-4 py-2 text-sm font-medium rounded transition ${
              activeTab === 'setups'
                ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Semua Setup
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`px-4 py-2 text-sm font-medium rounded transition ${
              activeTab === 'about'
                ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            Tentang Aplikasi
          </button>
        </nav>

        {/* Action Buttons Right */}
        <div className="flex items-center space-x-3">
          {/* Quick Add Button */}
          <button
            onClick={handleOpenAddForm}
            className="bg-black hover:bg-neutral-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-100 text-xs px-4 py-2 rounded font-bold tracking-wide transition flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>TAMBAH SETUP</span>
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              // Sun Icon
              <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 2.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm2.121 4.21a1 1 0 011 1v1a1 1 0 11-2 0V9.414a1 1 0 011-1zM14 14.707a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.172 13.293a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-3.88-4.21a1 1 0 011-1h1a1 1 0 110 2H2.293a1 1 0 01-1-1zM5.172 5.172a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 7a3 3 0 100 6 3 3 0 000-6z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              // Moon Icon
              <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Header Tabs */}
      <div className="md:hidden border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950 flex justify-around py-2">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`text-xs px-3 py-1.5 font-bold ${
            activeTab === 'dashboard'
              ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
              : 'text-neutral-500'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('setups')}
          className={`text-xs px-3 py-1.5 font-bold ${
            activeTab === 'setups'
              ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
              : 'text-neutral-500'
          }`}
        >
          Semua Setup
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`text-xs px-3 py-1.5 font-bold ${
            activeTab === 'about'
              ? 'text-black dark:text-white border-b-2 border-black dark:border-white'
              : 'text-neutral-500'
          }`}
        >
          Tentang
        </button>
      </div>
    </header>
  );
}
