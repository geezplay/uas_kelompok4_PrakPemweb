import React from 'react';

export default function AboutTab() {
  return (
    <section className="max-w-4xl mx-auto bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-xl p-8 shadow-sm space-y-8 animate-fadeIn">
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <span className="text-xs bg-black text-white dark:bg-white dark:text-black font-extrabold px-3 py-1 rounded uppercase tracking-wider">
          PROJECT OVERVIEW
        </span>
        <h2 className="text-2xl font-black uppercase tracking-tight mt-3 text-neutral-900 dark:text-neutral-100">
          Race Setup Garage
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Sistem Manajemen Setup Motor Balap Berbasis Website CRUD untuk Mata Kuliah Pemrograman Website
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-bold uppercase tracking-wide text-neutral-800 dark:text-neutral-200">
          1. Latar Belakang & Deskripsi
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          Dalam dunia balap motor, mekanik seringkali melakukan banyak perubahan setelan (setup) mesin,
          suspensi, pengapian, hingga final gear sesuai dengan karakteristik sirkuit dan kondisi iklim
          sekitar. Selama ini pencatatan manual sering berisiko rusak atau hilang.
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
          <strong>Race Setup Garage</strong> hadir untuk memecahkan masalah ini dengan menyediakan basis data
          digital berbobot ringan, berorientasi performa tinggi, dengan pengorganisasian data yang andal tanpa
          ketergantungan database tradisional, melainkan disimulasikan melalui penyimpanan JSON client-side
          (Local Storage).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-neutral-100 dark:border-neutral-900">
        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
            TEKNOLOGI PENDUKUNG
          </h3>
          <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span><strong>Framework:</strong> React (Simulated Next.js 15 Environment)</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span><strong>Styling:</strong> Tailwind CSS V3</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span><strong>Bahasa:</strong> JavaScript ES6 / React</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-emerald-500">✓</span>
              <span><strong>Penyimpanan:</strong> LocalStorage Stream (JSON)</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-wider text-neutral-400 mb-3">
            INFORMASI AKADEMIS
          </h3>
          <table className="w-full text-xs text-neutral-600 dark:text-neutral-400">
            <tbody>
              <tr className="border-b border-neutral-100 dark:border-neutral-900">
                <td className="py-2 font-semibold">Mata Kuliah:</td>
                <td className="py-2 text-right">Pemrograman Website</td>
              </tr>
              <tr className="border-b border-neutral-100 dark:border-neutral-900">
                <td className="py-2 font-semibold">Status Project:</td>
                <td className="py-2 text-right text-emerald-600 font-bold uppercase">Final (Versi 1.0)</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold">Target Platform:</td>
                <td className="py-2 text-right">Web Browser & Vercel Deployment</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-150 dark:border-neutral-850 rounded-xl text-center">
        <p className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">
          Desain UI minimalis profesional &bull; Dikembangkan khusus untuk efisiensi mekanik garasi balap
        </p>
      </div>
    </section>
  );
}
