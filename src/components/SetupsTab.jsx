"use client";

import React from 'react';

export default function SetupsTab({
  searchQuery,
  setSearchQuery,
  filterSirkuit,
  setFilterSirkuit,
  filterCuaca,
  setFilterCuaca,
  sortBy,
  setSortBy,
  sirkuitOptions,
  cuacaOptions,
  filteredAndSortedSetups,
  setSelectedSetup,
  triggerPrintSetup,
  handleOpenEditForm,
  setDeleteConfirmId
}) {
  return (
    <section className="space-y-6 animate-fadeIn">

      {/* SEARCH, FILTER, AND SORT CONTROL BAR */}
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 p-5 rounded-xl shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <label className="block text-[10px] font-extrabold uppercase text-neutral-400 mb-1 tracking-wider">
              Pencarian Data
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari motor, sirkuit, mekanik, catatan..."
                className="w-full text-xs border border-neutral-200 dark:border-neutral-880 bg-white dark:bg-neutral-900 rounded p-2.5 pl-8 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-black dark:focus:border-white transition"
              />
              <svg className="w-4 h-4 text-neutral-400 absolute left-2.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Filter Sirkuit */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-neutral-400 mb-1 tracking-wider">
              Filter Sirkuit
            </label>
            <select
              value={filterSirkuit}
              onChange={(e) => setFilterSirkuit(e.target.value)}
              className="w-full text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-black dark:focus:border-white transition"
            >
              {sirkuitOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Filter Cuaca */}
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-neutral-400 mb-1 tracking-wider">
              Filter Cuaca
            </label>
            <select
              value={filterCuaca}
              onChange={(e) => setFilterCuaca(e.target.value)}
              className="w-full text-xs border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2.5 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:border-black dark:focus:border-white transition"
            >
              {cuacaOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom control row: Sorting & Reset */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-2 border-t border-neutral-100 dark:border-neutral-900 space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-neutral-400 font-medium">Urutkan berdasarkan:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-xs border-0 bg-transparent font-bold text-black dark:text-white focus:ring-0 cursor-pointer"
            >
              <option value="createdAt_desc">Terbaru Ditambahkan</option>
              <option value="createdAt_asc">Terlama Ditambahkan</option>
              <option value="temp_asc">Temperatur Sirkuit Terdingin</option>
              <option value="temp_desc">Temperatur Sirkuit Terpanas</option>
              <option value="motor_asc">Nama Motor (A-Z)</option>
            </select>
          </div>

          <div className="flex space-x-2 w-full sm:w-auto justify-end">
            {/* Clear filter button if any active */}
            {(searchQuery !== '' || filterSirkuit !== 'Semua' || filterCuaca !== 'Semua') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterSirkuit('Semua');
                  setFilterCuaca('Semua');
                }}
                className="text-xs font-bold text-red-600 hover:text-red-700 transition"
              >
                Hapus Semua Filter [x]
              </button>
            )}
            <span className="text-xs text-neutral-400 font-medium">
              {filteredAndSortedSetups.length} data ditemukan
            </span>
          </div>
        </div>
      </div>

      {/* SETUP TABLE & CARDS SECTION */}
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-xl shadow-sm overflow-hidden">
        
        {/* DESKTOP TABLE VIEW */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider">ID</th>
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider">Identitas Motor / Sirkuit</th>
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider">Setup Karburator</th>
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider">Spesifikasi Lain</th>
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider">Mekanik</th>
                <th className="p-4 text-xs font-black uppercase text-neutral-400 tracking-wider text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900">
              {filteredAndSortedSetups.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-sm text-neutral-500">
                    Tidak ada data setup motor balap yang sesuai dengan kriteria pencarian Anda.
                  </td>
                </tr>
              ) : (
                filteredAndSortedSetups.map((setup) => (
                  <tr key={setup.id} className="hover:bg-neutral-50/55 dark:hover:bg-neutral-900/40 transition">
                    <td className="p-4 font-mono text-xs font-bold whitespace-nowrap">{setup.id}</td>
                    <td className="p-4">
                      <span className="block text-sm font-bold uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                        {setup.motor}
                      </span>
                      <span className="block text-xs text-neutral-400 mt-0.5">{setup.sirkuit}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex space-x-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900" title="Main Jet">
                          MJ: {setup.mainJet}
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900" title="Pilot Jet">
                          PJ: {setup.pilotJet}
                        </span>
                      </div>
                      <span className="block text-[10px] text-neutral-400 mt-1 font-mono">{setup.needleClip}</span>
                    </td>
                    <td className="p-4">
                      <span className="block text-xs"><strong>Gir:</strong> {setup.gearRatio}</span>
                      <span className="block text-xs mt-0.5"><strong>Suhu:</strong> {setup.temperatur}°C ({setup.cuaca})</span>
                    </td>
                    <td className="p-4">
                      <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{setup.mekanik}</span>
                      <span className="block text-[10px] text-neutral-400">
                        {new Date(setup.createdAt).toLocaleDateString('id-ID')}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center space-x-1">
                        
                        {/* Detail Spec Sheet */}
                        <button
                          onClick={() => setSelectedSetup(setup)}
                          className="p-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                          title="Lihat Detail Lembar Setup"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>

                        {/* Cetak PDF */}
                        <button
                          onClick={() => triggerPrintSetup(setup)}
                          className="p-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                          title="Cetak Lembar Spesifikasi (PDF)"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-3a2 2 0 00-2-2H5a2 2 0 00-2 2v3a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                          </svg>
                        </button>

                        {/* Edit Setup */}
                        <button
                          onClick={() => handleOpenEditForm(setup)}
                          className="p-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
                          title="Sunting Setup"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                        </button>

                        {/* Hapus Setup */}
                        <button
                          onClick={() => setDeleteConfirmId(setup.id)}
                          className="p-2 border border-neutral-200 dark:border-neutral-800 rounded hover:bg-red-100 dark:hover:bg-red-950/40 text-red-600 transition"
                          title="Hapus Setup"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS VIEW */}
        <div className="md:hidden divide-y divide-neutral-100 dark:divide-neutral-900">
          {filteredAndSortedSetups.length === 0 ? (
            <div className="p-12 text-center text-sm text-neutral-500">
              Tidak ada data setup motor balap yang sesuai dengan kriteria.
            </div>
          ) : (
            filteredAndSortedSetups.map((setup) => (
              <div key={setup.id} className="p-4 space-y-4">
                
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-neutral-100 dark:bg-neutral-900 rounded">
                      {setup.id}
                    </span>
                    <h4 className="text-base font-black uppercase tracking-tight mt-1 text-neutral-900 dark:text-neutral-100">
                      {setup.motor}
                    </h4>
                    <span className="text-xs text-neutral-500">{setup.sirkuit}</span>
                  </div>
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {new Date(setup.createdAt).toLocaleDateString('id-ID')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-neutral-50 dark:bg-neutral-900 p-3 rounded-lg text-xs">
                  <div><strong>Main Jet:</strong> {setup.mainJet}</div>
                  <div><strong>Pilot Jet:</strong> {setup.pilotJet}</div>
                  <div><strong>Final Gir:</strong> {setup.gearRatio}</div>
                  <div><strong>Cuaca/Suhu:</strong> {setup.cuaca} / {setup.temperatur}°C</div>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-neutral-500">Mekanik: <strong>{setup.mekanik}</strong></span>
                  <div className="flex space-x-1">
                    <button onClick={() => setSelectedSetup(setup)} className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950 text-xs font-semibold">Detail</button>
                    <button onClick={() => triggerPrintSetup(setup)} className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950 text-xs font-semibold">Cetak</button>
                    <button onClick={() => handleOpenEditForm(setup)} className="p-2 border border-neutral-200 dark:border-neutral-800 rounded bg-white dark:bg-neutral-950 text-xs font-semibold">Edit</button>
                    <button onClick={() => setDeleteConfirmId(setup.id)} className="p-2 border border-red-200 dark:border-red-900/40 text-red-600 rounded bg-red-50 dark:bg-red-950/20 text-xs font-semibold">Hapus</button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

      </div>

    </section>
  );
}
