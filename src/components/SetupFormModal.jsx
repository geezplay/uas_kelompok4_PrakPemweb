"use client";

import React from 'react';

export default function SetupFormModal({
  editId,
  setIsFormOpen,
  handleSaveSetup,
  formMotor,
  setFormMotor,
  formSirkuit,
  setFormSirkuit,
  formGearRatio,
  setFormGearRatio,
  formMainJet,
  setFormMainJet,
  formPilotJet,
  setFormPilotJet,
  formNeedleClip,
  setFormNeedleClip,
  formIgnition,
  setFormIgnition,
  formTemperatur,
  setFormTemperatur,
  formCuaca,
  setFormCuaca,
  formMekanik,
  setFormMekanik,
  formCatatan,
  setFormCatatan
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-900 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
              {editId ? 'SUNTING DATA SETUP' : 'TAMBAH SETUP BARU'}
            </h2>
            <p className="text-xs text-neutral-500 font-medium">
              Masukkan spesifikasi motor dan kondisi sirkuit secara rinci.
            </p>
          </div>
          <button
            onClick={() => setIsFormOpen(false)}
            className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-900 transition"
          >
            <svg className="w-6 h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Scrollable Form */}
        <form onSubmit={handleSaveSetup} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          
          {/* Seksi 1: Informasi Dasar */}
          <div>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-400 mb-3">
              A. Identitas Dasar
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama Unit Motor *
                </label>
                <input
                  type="text"
                  required
                  value={formMotor}
                  onChange={(e) => setFormMotor(e.target.value)}
                  placeholder="Contoh: Yamaha R15 V4, Honda CBR150"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama Sirkuit *
                </label>
                <input
                  type="text"
                  required
                  value={formSirkuit}
                  onChange={(e) => setFormSirkuit(e.target.value)}
                  placeholder="Contoh: Sirkuit Internasional Mandalika"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
            </div>
          </div>

          {/* Seksi 2: Spesifikasi Mesin & Karburator */}
          <div>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-400 mb-3">
              B. Jetting Karburator & Pengapian
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Main Jet (MJ)
                </label>
                <input
                  type="number"
                  value={formMainJet}
                  onChange={(e) => setFormMainJet(e.target.value)}
                  placeholder="Contoh: 115"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Pilot Jet (PJ)
                </label>
                <input
                  type="number"
                  value={formPilotJet}
                  onChange={(e) => setFormPilotJet(e.target.value)}
                  placeholder="Contoh: 40"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Klip Jarum (Needle Clip)
                </label>
                <select
                  value={formNeedleClip}
                  onChange={(e) => setFormNeedleClip(e.target.value)}
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                >
                  <option value="Klip 1 (Atas/Paling Kering)">Klip 1 (Kering)</option>
                  <option value="Klip 2 (Kering)">Klip 2</option>
                  <option value="Klip 3 (Tengah)">Klip 3 (Tengah)</option>
                  <option value="Klip 4 (Basah)">Klip 4</option>
                  <option value="Klip 5 (Bawah/Paling Basah)">Klip 5 (Basah)</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Timing Pengapian
                </label>
                <input
                  type="text"
                  value={formIgnition}
                  onChange={(e) => setFormIgnition(e.target.value)}
                  placeholder="Contoh: 33° BTDC"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
            </div>
          </div>

          {/* Seksi 3: Mekanikal & Kondisi Lintasan */}
          <div>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-400 mb-3">
              C. Mekanikal & Kondisi Lintasan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Rasio Final Gir (Gear Ratio)
                </label>
                <input
                  type="text"
                  value={formGearRatio}
                  onChange={(e) => setFormGearRatio(e.target.value)}
                  placeholder="Contoh: 14-43"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Suhu Udara (°C)
                </label>
                <input
                  type="number"
                  value={formTemperatur}
                  onChange={(e) => setFormTemperatur(e.target.value)}
                  placeholder="Contoh: 30"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Cuaca
                </label>
                <select
                  value={formCuaca}
                  onChange={(e) => setFormCuaca(e.target.value)}
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                >
                  <option value="Cerah">Cerah</option>
                  <option value="Mendung">Mendung</option>
                  <option value="Hujan">Hujan</option>
                  <option value="Sangat Panas">Sangat Panas</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seksi 4: Mekanik & Catatan Tambahan */}
          <div>
            <h3 className="text-[10px] font-black tracking-widest uppercase text-neutral-400 mb-3">
              D. PIC & Rekomendasi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Nama Mekanik Penanggung Jawab *
                </label>
                <input
                  type="text"
                  required
                  value={formMekanik}
                  onChange={(e) => setFormMekanik(e.target.value)}
                  placeholder="Nama Mekanik"
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition"
                />
              </div>
              <div>
                <label className="block font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                  Catatan Tambahan & Evaluasi Performa
                </label>
                <textarea
                  rows="4"
                  value={formCatatan}
                  onChange={(e) => setFormCatatan(e.target.value)}
                  placeholder="Tuliskan catatan detail mengenai perilaku ban, suspensi, dan torsi mesin saat di sirkuit..."
                  className="w-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded p-2 text-xs focus:outline-none focus:border-black dark:focus:border-white transition resize-none"
                />
              </div>
            </div>
          </div>

          {/* Modal Actions Footer */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-neutral-100 dark:border-neutral-900">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border border-neutral-200 dark:border-neutral-850 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded font-bold transition text-xs"
            >
              BATAL
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black hover:opacity-90 rounded font-bold transition text-xs"
            >
              {editId ? 'SIMPAN PERUBAHAN' : 'SIMPAN DATA SETUP'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
