"use client";

import React from 'react';

export default function DashboardTab({ 
  statistics, 
  sirkuitOptions, 
  setups, 
  setSelectedSetup, 
  triggerPrintSetup, 
  setActiveTab, 
  setFilterSirkuit 
}) {
  return (
    <section className="space-y-8 animate-fadeIn">
      
      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Total Setups */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">TOTAL SETUP MOTOR</span>
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm font-bold">🏁</div>
          </div>
          <div className="text-4xl font-extrabold tracking-tight font-mono">{statistics.total}</div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2 font-bold">TEREKAM DI SISTEM</p>
        </div>

        {/* Stat Motor Terpopuler */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">MOTOR TERPOPULER</span>
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm font-bold">🏍️</div>
          </div>
          <div className="text-lg font-extrabold truncate text-neutral-900 dark:text-neutral-100 uppercase mt-2">
            {statistics.topMotor}
          </div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2.5 font-bold">DOMINASI DATASET</p>
        </div>

        {/* Stat Sirkuit Teraktif */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">SIRKUIT TERAKTIF</span>
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm font-bold">🗺️</div>
          </div>
          <div className="text-lg font-extrabold truncate text-neutral-900 dark:text-neutral-100 uppercase mt-2">
            {statistics.topSirkuit}
          </div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2.5 font-bold">SERING DIPILIH</p>
        </div>

        {/* Stat Rata-rata Suhu */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">RERATA TEMPERATURE</span>
            <div className="w-8 h-8 rounded bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-sm font-bold">🌡️</div>
          </div>
          <div className="text-4xl font-extrabold tracking-tight font-mono">{statistics.avgTemp}°C</div>
          <p className="text-[10px] text-neutral-400 uppercase tracking-widest mt-2 font-bold">SUHU LINTASAN AKTIF</p>
        </div>
      </div>

      {/* QUICK ACTIONS & RECENT LISTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: QUICK VIEW / SIRKUIT LISTING */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-6 rounded-xl shadow-sm space-y-6">
          <div>
            <h3 className="text-sm font-extrabold tracking-tight uppercase text-neutral-900 dark:text-neutral-100">
              Daftar Sirkuit Aktif
            </h3>
            <p className="text-xs text-neutral-500">Menganalisis jangkauan sirkuit balap yang terdaftar.</p>
          </div>

          <div className="space-y-3">
            {sirkuitOptions.filter(opt => opt !== 'Semua').map((sirk, idx) => {
              const count = setups.filter(s => s.sirkuit === sirk).length;
              return (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800"
                >
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 truncate max-w-[200px]">
                    {sirk}
                  </span>
                  <span className="text-xs bg-black text-white dark:bg-white dark:text-black font-extrabold px-2 py-0.5 rounded font-mono">
                    {count} setup
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => {
              setActiveTab('setups');
              setFilterSirkuit('Semua');
            }}
            className="w-full text-center text-xs font-extrabold uppercase py-2 border border-dashed border-neutral-300 dark:border-neutral-800 rounded hover:border-black dark:hover:border-white transition"
          >
            LIHAT SEMUA DATA SETUP &rarr;
          </button>
        </div>

        {/* KOLOM KANAN: PREVIEW TERBARU (3 DATA) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-extrabold tracking-tight uppercase text-neutral-900 dark:text-neutral-100">
                Setup Terkini
              </h3>
              <p className="text-xs text-neutral-500">Spesifikasi motor balap yang baru-baru ini disimpan.</p>
            </div>
            <button
              onClick={() => setActiveTab('setups')}
              className="text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white transition"
            >
              Selengkapnya &rarr;
            </button>
          </div>

          <div className="space-y-4">
            {setups.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-5 rounded-xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 rounded">
                      {item.id}
                    </span>
                    <span className="text-xs text-neutral-400">|</span>
                    <span className="text-xs font-semibold text-neutral-500">{item.sirkuit}</span>
                  </div>
                  <h4 className="text-base font-black uppercase tracking-tight">{item.motor}</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                      MJ: {item.mainJet}
                    </span>
                    <span className="text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                      PJ: {item.pilotJet}
                    </span>
                    <span className="text-[10px] font-semibold bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded text-neutral-600 dark:text-neutral-400">
                      Gir: {item.gearRatio}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    onClick={() => setSelectedSetup(item)}
                    className="flex-1 sm:flex-initial text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 font-bold px-3 py-1.5 rounded transition"
                  >
                    DETAIL SPEC
                  </button>
                  <button
                    onClick={() => triggerPrintSetup(item)}
                    className="flex-1 sm:flex-initial text-xs bg-black text-white dark:bg-white dark:text-black font-bold px-3 py-1.5 rounded transition hover:opacity-90"
                  >
                    CETAK / PDF
                  </button>
                </div>
              </div>
            ))}
            {setups.length === 0 && (
              <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-8 rounded-xl shadow-sm text-center text-xs text-neutral-500">
                Belum ada data setup. Silakan tambah setup baru.
              </div>
            )}
          </div>
        </div>

      </div>

    </section>
  );
}
