import React, { useState } from 'react';
import DeviceSimulator from './components/DeviceSimulator';
import SuperadminDashboard from './components/SuperadminDashboard';
import AdminDashboard from './components/AdminDashboard';
import ResidentPortal from './components/ResidentPortal';

import {
  initialEstates,
  initialAdmins,
  initialResidents,
  initialServiceRequests,
  initialVisitorPasses,
  initialAnnouncements,
  serviceCategories
} from './mockData';

export default function App() {
  // Global simulation states (Read/Write)
  const [estates, setEstates] = useState(initialEstates);
  const [admins, setAdmins] = useState(initialAdmins);
  const [residents, setResidents] = useState(initialResidents);
  const [serviceRequests, setServiceRequests] = useState(initialServiceRequests);
  const [visitorPasses, setVisitorPasses] = useState(initialVisitorPasses);
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  // Selector states
  const [role, setRole] = useState('superadmin'); // superadmin, admin, resident
  const [selectedAdminId, setSelectedAdminId] = useState(initialAdmins[0].id);
  const [selectedResidentId, setSelectedResidentId] = useState(initialResidents[0].id);
  const [platform, setPlatform] = useState('ios'); // ios or android

  const currentAdmin = admins.find(a => a.id === selectedAdminId) || admins[0];
  const currentResident = residents.find(r => r.id === selectedResidentId) || residents[0];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">

      {/* Top Main Panel Header */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white m-0 flex items-center gap-2">
              Betaserve <span className="text-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md font-semibold">V2.1</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Professional Estate Service & Management Simulator</p>
          </div>
        </div>

        {/* Dynamic Controls Pane */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Role Selector Trigger */}
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700/50">
            <button
              onClick={() => setRole('superadmin')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                role === 'superadmin'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👑 Superadmin
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                role === 'admin'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              🏢 Estate Admin
            </button>
            <button
              onClick={() => setRole('resident')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all duration-300 ${
                role === 'resident'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              👤 Resident
            </button>
          </div>

          {/* Active Admin Switcher (Shows up when Role is Admin) */}
          {role === 'admin' && (
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/50">
              <span className="text-[10px] uppercase font-extrabold text-slate-400">Acting Admin:</span>
              <select
                value={selectedAdminId}
                onChange={(e) => setSelectedAdminId(e.target.value)}
                className="bg-transparent text-xs font-semibold text-emerald-300 focus:outline-none cursor-pointer"
              >
                {admins.map((adm) => {
                  const estate = estates.find((e) => e.id === adm.estateId);
                  return (
                    <option key={adm.id} value={adm.id} className="bg-slate-900 text-slate-100">
                      {adm.name} ({estate ? estate.name : 'Estate'})
                    </option>
                  );
                })}
              </select>
            </div>
          )}

          {/* Active Resident Switcher (Shows up when Role is Resident) */}
          {role === 'resident' && (
            <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/50">
              <span className="text-[10px] uppercase font-extrabold text-slate-400">Acting Resident:</span>
              <select
                value={selectedResidentId}
                onChange={(e) => setSelectedResidentId(e.target.value)}
                className="bg-transparent text-xs font-semibold text-blue-300 focus:outline-none cursor-pointer"
              >
                {residents.map((res) => {
                  const estate = estates.find((e) => e.id === res.estateId);
                  return (
                    <option key={res.id} value={res.id} className="bg-slate-900 text-slate-100">
                      {res.name} ({estate ? estate.name : 'Estate'})
                    </option>
                  );
                })}
              </select>
            </div>
          )}
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left column: Simulator Device Shell */}
        <div className="lg:col-span-5 flex justify-center">
          <DeviceSimulator platform={platform} setPlatform={setPlatform}>
            {role === 'superadmin' ? (
              <SuperadminDashboard
                estates={estates}
                setEstates={setEstates}
                admins={admins}
                setAdmins={setAdmins}
                serviceRequests={serviceRequests}
                serviceCats={serviceCategories}
                platform={platform}
              />
            ) : role === 'admin' ? (
              <AdminDashboard
                estates={estates}
                residents={residents}
                setResidents={setResidents}
                serviceRequests={serviceRequests}
                setServiceRequests={setServiceRequests}
                visitorPasses={visitorPasses}
                setVisitorPasses={setVisitorPasses}
                announcements={announcements}
                setAnnouncements={setAnnouncements}
                currentAdmin={currentAdmin}
                platform={platform}
              />
            ) : (
              <ResidentPortal
                estates={estates}
                currentResident={currentResident}
                announcements={announcements}
                visitorPasses={visitorPasses}
                setVisitorPasses={setVisitorPasses}
                serviceRequests={serviceRequests}
                setServiceRequests={setServiceRequests}
                serviceCats={serviceCategories}
                platform={platform}
              />
            )}
          </DeviceSimulator>
        </div>

        {/* Right column: Informative Simulator Controller Guide */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-indigo-400 mb-3">Simulator instructions</h2>
            <h3 className="text-lg font-bold text-white mb-2">Dual-Platform Mobile Interface</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We built <strong className="text-indigo-400 font-extrabold">Betaserve</strong> specifically tailored for cross-platform estate operations.
              Use the platform switcher above the phone simulation container to alternate between the elegant <strong className="text-blue-400">iOS layout shell</strong> and the material <strong className="text-green-400">Android layout shell</strong> in real-time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-extrabold uppercase">Superadmin</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Onboard new residential estates, manage estate billing tiers, provision administrators, and review marketplace provider analytics.
                  </p>
                </div>
                <button
                  onClick={() => setRole('superadmin')}
                  className="mt-3 text-[11px] font-bold text-indigo-400 hover:underline flex items-center gap-0.5"
                >
                  Superadmin view →
                </button>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-extrabold uppercase">Estate Admin</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Track directories, publish notices, generate temporary secure guest passes, and dispatch certified service contractors.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRole('admin');
                    setSelectedAdminId(admins[0].id);
                  }}
                  className="mt-3 text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-0.5"
                >
                  Admin view →
                </button>
              </div>

              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/60 flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded font-extrabold uppercase">Resident Hub</span>
                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                    Read estate bulletins, generate guest PIN codes directly, and book professional maintenance services with budget estimation.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setRole('resident');
                    setSelectedResidentId(residents[0].id);
                  }}
                  className="mt-3 text-[11px] font-bold text-blue-400 hover:underline flex items-center gap-0.5"
                >
                  Resident view →
                </button>
              </div>
            </div>
          </div>

          {/* Quick Real-Time Simulator Database Metrics */}
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-emerald-400 mb-3">Live Simulation Database States</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-2xl font-black text-white">{estates.length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Estates</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-2xl font-black text-white">{admins.length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Admins</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-2xl font-black text-white">{residents.length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Residents</p>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 text-center">
                <p className="text-2xl font-black text-white">{serviceRequests.length}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold mt-1">Dispatches</p>
              </div>
            </div>

            {/* Short helpful hint */}
            <p className="text-[11px] text-slate-500 italic mt-3 text-center">
              *All actions completed inside the simulated phone view dynamically update this global database immediately.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-center py-4 text-xs text-slate-500 font-medium">
        Betaserve Estate Professional Service and Management App © 2025. All Rights Reserved.
      </footer>
    </div>
  );
}
