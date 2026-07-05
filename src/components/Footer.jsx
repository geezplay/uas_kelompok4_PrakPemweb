import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 py-8 mt-16 text-center text-xs text-neutral-400 space-y-2">
      <p className="font-semibold text-neutral-600 dark:text-neutral-300 uppercase tracking-wider">RACE SETUP GARAGE &copy; 2026</p>
      <p>Sistem CRUD Manajemen Setup Motor Balap Tanpa Database &bull; Tugas Akhir Pemrograman Website</p>
      <p className="text-[10px]">Tampilan Responsif &bull; Didukung Ekspor PDF (Cetak Spec) & Excel CSV</p>
    </footer>
  );
}
