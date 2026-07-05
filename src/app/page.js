"use client";

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import DashboardTab from '@/components/DashboardTab';
import SetupsTab from '@/components/SetupsTab';
import AboutTab from '@/components/AboutTab';
import SetupFormModal from '@/components/SetupFormModal';
import SetupDetailModal from '@/components/SetupDetailModal';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';

// Data setup awal yang realistis untuk pre-seeding aplikasi
const INITIAL_SETUPS = [
  {
    id: "RSG-2026-001",
    motor: "Yamaha YZF-R15 V4 VVA",
    sirkuit: "Sirkuit Internasional Mandalika",
    gearRatio: "14-45 (Rantai 428)",
    mainJet: 122,
    pilotJet: 45,
    needleClip: "Klip 3 (Tengah)",
    ignition: "32° BTDC @ 10,000 RPM",
    temperatur: 31,
    cuaca: "Cerah",
    mekanik: "Hadi Wijaya",
    catatan: "Sangat stabil di tikungan cepat R5-R7. Mesin sedikit bergetar di trek lurus panjang, namun suhu radiator stabil pada kisaran 82 derajat.",
    createdAt: "2026-07-01T10:30:00.000Z"
  },
  {
    id: "RSG-2026-002",
    motor: "Honda CBR150R Racing",
    sirkuit: "Sirkuit Internasional Sentul",
    gearRatio: "13-43 (Rantai 415)",
    mainJet: 118,
    pilotJet: 42,
    needleClip: "Klip 2 (Kering)",
    ignition: "34° BTDC @ 9,500 RPM",
    temperatur: 26,
    cuaca: "Mendung",
    mekanik: "Budi Pramono",
    catatan: "Setelan basah dipersiapkan jika hujan turun. Torsi bawah ditingkatkan untuk menghadapi tikungan S-Besar.",
    createdAt: "2026-07-03T14:15:00.000Z"
  },
  {
    id: "RSG-2026-003",
    motor: "Kawasaki Ninja ZX-25R",
    sirkuit: "Sirkuit Gelora Bung Tomo",
    gearRatio: "14-48 (Rantai 415)",
    mainJet: 125,
    pilotJet: 48,
    needleClip: "Klip 3 (Standar)",
    ignition: "30° BTDC @ 12,000 RPM",
    temperatur: 34,
    cuaca: "Sangat Panas",
    mekanik: "Hadi Wijaya",
    catatan: "Kinerja mesin stabil di suhu ekstrem. Respons gas instan saat keluar dari tikungan sempit hairpin.",
    createdAt: "2026-07-04T09:00:00.000Z"
  },
  {
    id: "RSG-2026-004",
    motor: "Suzuki GSX-R150",
    sirkuit: "Sirkuit Internasional Sentul",
    gearRatio: "14-44 (Rantai 415)",
    mainJet: 115,
    pilotJet: 40,
    needleClip: "Klip 4 (Basah)",
    ignition: "33° BTDC @ 10,500 RPM",
    temperatur: 24,
    cuaca: "Hujan",
    mekanik: "Ahmad Yani",
    catatan: "Menggunakan ban basah dengan tekanan udara 26 psi depan dan 28 psi belakang. Tenaga dibuat halus agar tidak mudah slip.",
    createdAt: "2026-07-05T11:45:00.000Z"
  }
];

export default function Home() {
  const [setups, setSetups] = useState(INITIAL_SETUPS);
  const [isMounted, setIsMounted] = useState(false);

  // Sinkronisasi data dari localStorage saat mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('race_setup_data');
    if (saved) {
      try {
        setSetups(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse setups from localStorage", e);
      }
    }
  }, []);

  // Sinkronisasi data ke localStorage
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('race_setup_data', JSON.stringify(setups));
    }
  }, [setups, isMounted]);

  // Tab Menu Utama (Dashboard, All Setups, About)
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filter & Search & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSirkuit, setFilterSirkuit] = useState('Semua');
  const [filterCuaca, setFilterCuaca] = useState('Semua');
  const [sortBy, setSortBy] = useState('createdAt_desc');

  // State untuk form CRUD (Tambah / Edit)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null); // Jika null berarti "Tambah", jika ada ID berarti "Edit"
  const [formMotor, setFormMotor] = useState('');
  const [formSirkuit, setFormSirkuit] = useState('');
  const [formGearRatio, setFormGearRatio] = useState('');
  const [formMainJet, setFormMainJet] = useState('');
  const [formPilotJet, setFormPilotJet] = useState('');
  const [formNeedleClip, setFormNeedleClip] = useState('Klip 3 (Tengah)');
  const [formIgnition, setFormIgnition] = useState('');
  const [formTemperatur, setFormTemperatur] = useState('');
  const [formCuaca, setFormCuaca] = useState('Cerah');
  const [formMekanik, setFormMekanik] = useState('');
  const [formCatatan, setFormCatatan] = useState('');

  // State untuk Detail Modal
  const [selectedSetup, setSelectedSetup] = useState(null);

  // State untuk konfirmasi hapus kustom (Tanpa alert)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  // State untuk notifikasi Toast sukses/gagal
  const [toastMessage, setToastMessage] = useState(null);

  // Dark Mode state (default light minimalis sesuai request "primary color white")
  const [darkMode, setDarkMode] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // List Sirkuit & Cuaca yang unik untuk dropdown filter
  const sirkuitOptions = useMemo(() => {
    const list = setups.map(s => s.sirkuit);
    return ['Semua', ...Array.from(new Set(list))];
  }, [setups]);

  const cuacaOptions = ['Semua', 'Cerah', 'Mendung', 'Hujan', 'Sangat Panas'];

  const filteredAndSortedSetups = useMemo(() => {
    let result = [...setups];

    // Search filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.motor.toLowerCase().includes(q) ||
        item.sirkuit.toLowerCase().includes(q) ||
        item.mekanik.toLowerCase().includes(q) ||
        item.catatan.toLowerCase().includes(q)
      );
    }

    // Sirkuit filter
    if (filterSirkuit !== 'Semua') {
      result = result.filter(item => item.sirkuit === filterSirkuit);
    }

    // Cuaca filter
    if (filterCuaca !== 'Semua') {
      result = result.filter(item => item.cuaca === filterCuaca);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === 'createdAt_desc') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'createdAt_asc') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      if (sortBy === 'temp_asc') {
        return a.temperatur - b.temperatur;
      }
      if (sortBy === 'temp_desc') {
        return b.temperatur - a.temperatur;
      }
      if (sortBy === 'motor_asc') {
        return a.motor.localeCompare(b.motor);
      }
      return 0;
    });

    return result;
  }, [setups, searchQuery, filterSirkuit, filterCuaca, sortBy]);

  const statistics = useMemo(() => {
    if (setups.length === 0) return { total: 0, topMotor: '-', topSirkuit: '-', avgTemp: 0 };

    const total = setups.length;

    // Hitung motor terpopuler
    const motorsCount = {};
    setups.forEach(s => { motorsCount[s.motor] = (motorsCount[s.motor] || 0) + 1; });
    const topMotor = Object.entries(motorsCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // Hitung sirkuit terpopuler
    const sirkuitCount = {};
    setups.forEach(s => { sirkuitCount[s.sirkuit] = (sirkuitCount[s.sirkuit] || 0) + 1; });
    const topSirkuit = Object.entries(sirkuitCount).sort((a, b) => b[1] - a[1])[0]?.[0] || '-';

    // Hitung rata-rata temperatur
    const avgTemp = (setups.reduce((acc, curr) => acc + Number(curr.temperatur || 0), 0) / total).toFixed(1);

    return { total, topMotor, topSirkuit, avgTemp };
  }, [setups]);

  const handleOpenAddForm = () => {
    setEditId(null);
    setFormMotor('');
    setFormSirkuit('');
    setFormGearRatio('');
    setFormMainJet('');
    setFormPilotJet('');
    setFormNeedleClip('Klip 3 (Tengah)');
    setFormIgnition('');
    setFormTemperatur('');
    setFormCuaca('Cerah');
    setFormMekanik('');
    setFormCatatan('');
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (setup) => {
    setEditId(setup.id);
    setFormMotor(setup.motor);
    setFormSirkuit(setup.sirkuit);
    setFormGearRatio(setup.gearRatio);
    setFormMainJet(setup.mainJet.toString());
    setFormPilotJet(setup.pilotJet.toString());
    setFormNeedleClip(setup.needleClip);
    setFormIgnition(setup.ignition);
    setFormTemperatur(setup.temperatur.toString());
    setFormCuaca(setup.cuaca);
    setFormMekanik(setup.mekanik);
    setFormCatatan(setup.catatan);
    setIsFormOpen(true);
  };

  const handleSaveSetup = (e) => {
    e.preventDefault();

    // Validasi input wajib
    if (!formMotor.trim() || !formSirkuit.trim() || !formMekanik.trim()) {
      showToast("Gagal menyimpan! Nama Motor, Sirkuit, dan Mekanik wajib diisi.");
      return;
    }

    const payload = {
      motor: formMotor.trim(),
      sirkuit: formSirkuit.trim(),
      gearRatio: formGearRatio.trim() || "N/A",
      mainJet: parseInt(formMainJet) || 0,
      pilotJet: parseInt(formPilotJet) || 0,
      needleClip: formNeedleClip,
      ignition: formIgnition.trim() || "N/A",
      temperatur: parseInt(formTemperatur) || 0,
      cuaca: formCuaca,
      mekanik: formMekanik.trim(),
      catatan: formCatatan.trim(),
    };

    if (editId) {
      // Edit mode
      setSetups(prev => prev.map(item =>
        item.id === editId
          ? { ...item, ...payload }
          : item
      ));
      showToast(`Setup ${payload.motor} berhasil diperbarui!`);
    } else {
      // Create mode
      const newId = `RSG-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
      const newSetup = {
        id: newId,
        ...payload,
        createdAt: new Date().toISOString()
      };
      setSetups(prev => [newSetup, ...prev]);
      showToast(`Setup ${payload.motor} baru berhasil ditambahkan!`);
    }

    setIsFormOpen(false);
  };

  const handleDeleteSetup = (id) => {
    const target = setups.find(s => s.id === id);
    setSetups(prev => prev.filter(item => item.id !== id));
    showToast(`Setup ${target ? target.motor : ''} berhasil dihapus.`);
    setDeleteConfirmId(null);
  };

  const exportToCSV = () => {
    if (setups.length === 0) {
      showToast("Tidak ada data untuk diekspor!");
      return;
    }

    const headers = ["ID", "Motor", "Sirkuit", "Gear Ratio", "Main Jet", "Pilot Jet", "Needle Clip", "Pengapian", "Temperatur (C)", "Cuaca", "Mekanik", "Catatan", "Tanggal Buat"];
    const rows = setups.map(s => [
      s.id,
      `"${s.motor.replace(/"/g, '""')}"`,
      `"${s.sirkuit.replace(/"/g, '""')}"`,
      `"${s.gearRatio}"`,
      s.mainJet,
      s.pilotJet,
      `"${s.needleClip}"`,
      `"${s.ignition.replace(/"/g, '""')}"`,
      s.temperatur,
      s.cuaca,
      `"${s.mekanik.replace(/"/g, '""')}"`,
      `"${s.catatan.replace(/"/g, '""')}"`,
      s.createdAt
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `race_setup_garage_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Berhasil mengekspor data setup ke file Excel/CSV!");
  };

  const triggerPrintSetup = (setup) => {
    // Membuka jendela cetak yang diformat dengan sangat rapi dan profesional khusus berkas balap
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      showToast("Gagal membuka jendela cetak! Pastikan pop-up diblokir tidak aktif.");
      return;
    }
    printWindow.document.write(`
<html>
<head>
    <title>SPECIFICATION SHEET - ${setup.id}</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <style>
        @media print {
            body {
                font-size: 12px;
                color: #000;
                background: #fff;
            }
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body class="p-8 bg-white font-sans">
    <div class="max-w-4xl mx-auto border border-black p-8">
        <div class="flex justify-between items-start border-b border-black pb-6 mb-6">
            <div>
                <h1 class="text-2xl font-black uppercase tracking-widest text-black">RACE SETUP GARAGE</h1>
                <p class="text-xs uppercase tracking-wider text-gray-500">Official Circuit Specification Sheet</p>
            </div>
            <div class="text-right">
                <div class="text-sm font-bold bg-black text-white px-3 py-1 mb-1 inline-block uppercase">${setup.id}</div>
                <p class="text-xs text-gray-600">${new Date(setup.createdAt).toLocaleDateString('id-ID', { dateStyle: 'long' })}</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-6 mb-6">
            <div>
                <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">IDENTIFIKASI UNIT BALAP</h2>
                <div class="space-y-1">
                    <p class="text-sm"><strong>Motor:</strong> ${setup.motor}</p>
                    <p class="text-sm"><strong>Sirkuit:</strong> ${setup.sirkuit}</p>
                    <p class="text-sm"><strong>Mekanik Utama:</strong> ${setup.mekanik}</p>
                </div>
            </div>
            <div>
                <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">KONDISI LINTASAN & LINGKUNGAN</h2>
                <div class="space-y-1">
                    <p class="text-sm"><strong>Cuaca:</strong> ${setup.cuaca}</p>
                    <p class="text-sm"><strong>Suhu Sekitar:</strong> ${setup.temperatur}°C</p>
                    <p class="text-sm"><strong>Rasio Gir (Final Gear):</strong> ${setup.gearRatio}</p>
                </div>
            </div>
        </div>

        <div class="border-t border-b border-black py-6 my-6 grid grid-cols-4 gap-4 text-center">
            <div class="border-r border-gray-300">
                <span class="block text-xs text-gray-500 uppercase font-semibold">MAIN JET</span>
                <span class="text-3xl font-bold font-mono text-black">${setup.mainJet}</span>
            </div>
            <div class="border-r border-gray-300">
                <span class="block text-xs text-gray-500 uppercase font-semibold">PILOT JET</span>
                <span class="text-3xl font-bold font-mono text-black">${setup.pilotJet}</span>
            </div>
            <div class="border-r border-gray-300">
                <span class="block text-xs text-gray-500 uppercase font-semibold">NEEDLE CLIP</span>
                <span class="text-sm font-bold font-mono text-black block mt-2">${setup.needleClip}</span>
            </div>
            <div>
                <span class="block text-xs text-gray-500 uppercase font-semibold">IGNITION TIMING</span>
                <span class="text-xs font-bold font-mono text-black block mt-2">${setup.ignition}</span>
            </div>
        </div>

        <div class="mb-8">
            <h2 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">CATATAN & EVALUASI MEKANIK</h2>
            <div class="bg-gray-50 p-4 border border-gray-200 rounded min-h-[120px]">
                <p class="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">${setup.catatan || "Tidak ada catatan tambahan."}</p>
            </div>
        </div>

        <div class="flex justify-between items-center text-xs text-gray-400 pt-6 border-t border-dashed border-gray-300">
            <p>Race Setup Garage - Sistem Manajemen Setup Motor Balap Berbasis Website</p>
            <p>Mekanik Penanggung Jawab: ___________________</p>
        </div>
    </div>
    <div class="mt-6 text-center no-print">
        <button onclick="window.print()" class="bg-black text-white px-6 py-2 rounded text-sm font-medium tracking-wide shadow-md hover:bg-gray-800 transition">Cetak Sekarang (Save to PDF)</button>
    </div>
</body>
</html>
    `);
    printWindow.document.close();
    showToast("Membuka Spec Sheet di tab baru untuk pencetakan / ekspor PDF.");
  };

  return (
    <div className={`min-h-screen font-sans ${darkMode ? 'dark bg-neutral-950 text-neutral-100' : 'bg-neutral-50 text-neutral-900'} transition-colors duration-200`}>
      
      {/* HEADER NAV */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        handleOpenAddForm={handleOpenAddForm} 
      />

      {/* Dynamic Toast System */}
      <Toast message={toastMessage} />

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* BANNER UTAMA */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-xl p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neutral-50 dark:bg-neutral-900 opacity-50 rounded-full blur-3xl -z-10"></div>
          <div>
            <div className="inline-flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3">
              🏎️ GARAGE MANAGEMENT SYSTEM
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
              Race Setup Garage
            </h1>
            <p className="text-sm text-neutral-500 max-w-2xl mt-1 leading-relaxed">
              Platform modern pencatatan setup motor balap secara digital. Tinggalkan kertas manual dan simpan spesifikasi rasio gir, jetting karburator, timing pengapian, dan temperatur sirkuit dengan rapi.
            </p>
          </div>
          <div className="flex space-x-2 w-full md:w-auto">
            <button
              onClick={exportToCSV}
              className="flex-1 md:flex-initial border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs px-4 py-2.5 rounded font-bold transition flex items-center justify-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>EKSPOR EXCEL (CSV)</span>
            </button>
          </div>
        </div>

        {/* TAB SWITCH-CASE */}
        {activeTab === 'dashboard' && (
          <DashboardTab 
            statistics={statistics} 
            sirkuitOptions={sirkuitOptions} 
            setups={setups} 
            setSelectedSetup={setSelectedSetup} 
            triggerPrintSetup={triggerPrintSetup} 
            setActiveTab={setActiveTab} 
            setFilterSirkuit={setFilterSirkuit} 
          />
        )}

        {activeTab === 'setups' && (
          <SetupsTab 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            filterSirkuit={filterSirkuit} 
            setFilterSirkuit={setFilterSirkuit} 
            filterCuaca={filterCuaca} 
            setFilterCuaca={setFilterCuaca} 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            sirkuitOptions={sirkuitOptions} 
            cuacaOptions={cuacaOptions} 
            filteredAndSortedSetups={filteredAndSortedSetups} 
            setSelectedSetup={setSelectedSetup} 
            triggerPrintSetup={triggerPrintSetup} 
            handleOpenEditForm={handleOpenEditForm} 
            setDeleteConfirmId={setDeleteConfirmId} 
          />
        )}

        {activeTab === 'about' && <AboutTab />}

      </main>

      {/* ADD/EDIT SETUP MODAL */}
      {isFormOpen && (
        <SetupFormModal 
          editId={editId} 
          setIsFormOpen={setIsFormOpen} 
          handleSaveSetup={handleSaveSetup} 
          formMotor={formMotor} 
          setFormMotor={setFormMotor} 
          formSirkuit={formSirkuit} 
          setFormSirkuit={setFormSirkuit} 
          formGearRatio={formGearRatio} 
          setFormGearRatio={setFormGearRatio} 
          formMainJet={formMainJet} 
          setFormMainJet={setFormMainJet} 
          formPilotJet={formPilotJet} 
          setFormPilotJet={setFormPilotJet} 
          formNeedleClip={formNeedleClip} 
          setFormNeedleClip={setFormNeedleClip} 
          formIgnition={formIgnition} 
          setFormIgnition={setFormIgnition} 
          formTemperatur={formTemperatur} 
          setFormTemperatur={setFormTemperatur} 
          formCuaca={formCuaca} 
          setFormCuaca={setFormCuaca} 
          formMekanik={formMekanik} 
          setFormMekanik={setFormMekanik} 
          formCatatan={formCatatan} 
          setFormCatatan={setFormCatatan} 
        />
      )}

      {/* DETAILED SPEC SHEET MODAL */}
      <SetupDetailModal 
        selectedSetup={selectedSetup} 
        setSelectedSetup={setSelectedSetup} 
        triggerPrintSetup={triggerPrintSetup} 
      />

      {/* CUSTOM CONFIRM DELETE MODAL (NO ALERT) */}
      <DeleteConfirmModal 
        deleteConfirmId={deleteConfirmId} 
        setDeleteConfirmId={setDeleteConfirmId} 
        handleDeleteSetup={handleDeleteSetup} 
      />

      {/* FOOTER */}
      <Footer />

    </div>
  );
}
