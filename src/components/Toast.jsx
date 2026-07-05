"use client";

import React from 'react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 rounded-lg shadow-xl border border-neutral-800 dark:border-neutral-200 text-xs font-semibold flex items-center space-x-3 animate-bounce"
    >
      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
      <span>{message}</span>
    </div>
  );
}
