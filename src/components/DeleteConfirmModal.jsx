"use client";

import React from 'react';

export default function DeleteConfirmModal({ deleteConfirmId, setDeleteConfirmId, handleDeleteSetup }) {
  if (!deleteConfirmId) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-sm rounded-xl shadow-2xl overflow-hidden p-6 space-y-5 text-center text-xs">
        
        <div className="w-12 h-12 bg-red-100 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">⚠️</div>
        
        <div>
          <h4 className="text-base font-black uppercase text-neutral-900 dark:text-neutral-100">KONFIRMASI HAPUS</h4>
          <p className="text-neutral-500 mt-2 leading-relaxed font-medium">
            Apakah Anda benar-benar yakin ingin menghapus data setup motor ini secara permanen? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => setDeleteConfirmId(null)}
            className="w-full py-2 border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded font-bold transition"
          >
            BATAL
          </button>
          <button
            onClick={() => handleDeleteSetup(deleteConfirmId)}
            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded font-bold transition"
          >
            YA, HAPUS
          </button>
        </div>

      </div>
    </div>
  );
}
