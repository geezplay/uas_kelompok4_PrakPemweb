"use client";

import React from 'react';

export default function SetupDetailModal({ selectedSetup, setSelectedSetup, triggerPrintSetup }) {
  if (!selectedSetup) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
          <div>
            <span className="text-[10px] font-mono font-black px-2.5 py-1 bg-black text-white dark:bg-white dark:text-black rounded uppercase tracking-wider">
              {selectedSetup.id}
            </span>
            <p className="text-xs text-neutral-400 mt-1">Spesifikasi komplit untuk keperluan analisis sirkuit.</p>
          </div>
          <button
            onClick={() => setSelectedSetup(null)}
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition"
          >
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Header Spec Block */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-1">MOTOR RACING</h4>
            <div className="text-xl font-black uppercase text-black dark:text-white leading-tight">
              {selectedSetup.motor}
            </div>
            <div className="text-sm text-neutral-500 mt-1 font-semibold">{selectedSetup.sirkuit}</div>
          </div>

          {/* Big Core Jetting Metric Board */}
          <div className="grid grid-cols-2 gap-4 border border-neutral-200 dark:border-neutral-800 p-4 rounded-lg text-center bg-neutral-50 dark:bg-neutral-900">
            <div className="border-r border-neutral-200 dark:border-neutral-800">
              <span className="block text-[10px] text-neutral-400 font-bold uppercase">MAIN JET (MJ)</span>
              <span className="text-3xl font-black font-mono tracking-tight text-black dark:text-white">
                {selectedSetup.mainJet}
              </span>
            </div>
            <div>
              <span className="block text-[10px] text-neutral-400 font-bold uppercase">PILOT JET (PJ)</span>
              <span className="text-3xl font-black font-mono tracking-tight text-black dark:text-white">
                {selectedSetup.pilotJet}
              </span>
            </div>
          </div>

          {/* Spec Details List */}
          <div className="space-y-3">
            <h5 className="text-[10px] font-black tracking-widest uppercase text-neutral-400">
              DETAIL SPESIFIKASI MOTOR & LINTASAN
            </h5>
            
            <div className="grid grid-cols-2 gap-4 border-t border-neutral-100 dark:border-neutral-900 pt-3">
              <div>
                <span className="text-neutral-400 block font-semibold">Needle Clip (Klip Jarum):</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedSetup.needleClip}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-semibold">Timing Pengapian:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedSetup.ignition || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-semibold">Final Gir (Gear Ratio):</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">{selectedSetup.gearRatio || 'N/A'}</span>
              </div>
              <div>
                <span className="text-neutral-400 block font-semibold">Kondisi Udara / Cuaca:</span>
                <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                  {selectedSetup.cuaca} ({selectedSetup.temperatur}°C)
                </span>
              </div>
            </div>
          </div>

          {/* Catatan Mekanik */}
          <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4">
            <h5 className="text-[10px] font-black tracking-widest uppercase text-neutral-400 mb-2">
              CATATAN & EVALUASI MEKANIK
            </h5>
            <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded border border-neutral-100 dark:border-neutral-800 leading-relaxed text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
              {selectedSetup.catatan || "Tidak ada catatan evaluasi khusus untuk setup ini."}
            </div>
          </div>

          {/* Penanggung Jawab */}
          <div className="flex justify-between items-center border-t border-neutral-100 dark:border-neutral-900 pt-4 text-[10px] text-neutral-400">
            <span>Dibuat: {new Date(selectedSetup.createdAt).toLocaleString('id-ID')}</span>
            <span>Mekanik: <strong className="text-neutral-700 dark:text-neutral-300">{selectedSetup.mekanik}</strong></span>
          </div>

        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-neutral-100 dark:border-neutral-900 flex justify-end space-x-2">
          <button
            onClick={() => { triggerPrintSetup(selectedSetup); setSelectedSetup(null); }}
            className="px-4 py-2 border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded font-bold transition flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>PRINT SPEC SHEET (PDF)</span>
          </button>
          <button
            onClick={() => setSelectedSetup(null)}
            className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 rounded font-bold transition"
          >
            TUTUP
          </button>
        </div>

      </div>
    </div>
  );
}
