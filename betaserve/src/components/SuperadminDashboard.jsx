import React, { useState } from 'react';

export default function SuperadminDashboard({
  estates,
  setEstates,
  admins,
  setAdmins,
  serviceRequests,
  serviceCats,
  platform
}) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, estates, admins, services
  const isIos = platform === 'ios';

  // Forms states
  const [newEstateName, setNewEstateName] = useState('');
  const [newEstateAddress, setNewEstateAddress] = useState('');
  const [newEstateZone, setNewEstateZone] = useState('South-West');
  const [newEstateBilling, setNewEstateBilling] = useState('Premium');

  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPhone, setNewAdminPhone] = useState('');
  const [newAdminEstateId, setNewAdminEstateId] = useState('');

  // Total calculated statistics
  const totalEstatesCount = estates.length;
  const activeEstatesCount = estates.filter((e) => e.status === 'Active').length;
  const totalAdminsCount = admins.length;
  const totalRevenue = serviceRequests.reduce((sum, r) => sum + (r.cost || 0), 0) * 0.15; // 15% platform cut

  const handleAddEstate = (e) => {
    e.preventDefault();
    if (!newEstateName || !newEstateAddress) return;
    const newEst = {
      id: `est-${Date.now()}`,
      name: newEstateName,
      address: newEstateAddress,
      zone: newEstateZone,
      billingPlan: newEstateBilling,
      status: 'Active'
    };
    setEstates([...estates, newEst]);
    setNewEstateName('');
    setNewEstateAddress('');
    setActiveTab('estates');
  };

  const handleAddAdmin = (e) => {
    e.preventDefault();
    if (!newAdminName || !newAdminEmail || !newAdminEstateId) return;
    const newAd = {
      id: `adm-${Date.now()}`,
      name: newAdminName,
      email: newAdminEmail,
      phone: newAdminPhone || '+234 800 000 0000',
      estateId: newAdminEstateId,
      role: 'Estate Admin',
      status: 'Active'
    };
    setAdmins([...admins, newAd]);
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPhone('');
    setNewAdminEstateId('');
    setActiveTab('admins');
  };

  const toggleEstateStatus = (id) => {
    setEstates(estates.map(e => e.id === id ? { ...e, status: e.status === 'Active' ? 'Suspended' : 'Active' } : e));
  };

  const toggleAdminStatus = (id) => {
    setAdmins(admins.map(a => a.id === id ? { ...a, status: a.status === 'Active' ? 'Suspended' : 'Active' } : a));
  };

  // Platform styling helpers
  const tabButtonClass = (tab) => {
    const isActive = activeTab === tab;
    if (isIos) {
      return `flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
        isActive
          ? 'bg-white text-slate-900 shadow-sm'
          : 'text-slate-500 hover:text-slate-800'
      }`;
    } else {
      return `flex-1 py-2 text-xs font-bold uppercase tracking-wider border-b-2 transition-all ${
        isActive
          ? 'border-green-600 text-green-600'
          : 'border-transparent text-zinc-500 hover:text-zinc-800'
      }`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">

      {/* Header Bar */}
      <div className={`px-4 py-3 border-b flex items-center justify-between ${
        isIos
          ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
            BS
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">Betaserve</h1>
            <p className="text-[10px] text-slate-500 font-medium">Platform Superadmin Portal</p>
          </div>
        </div>
        <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-bold">
          ROOT ACCESS
        </span>
      </div>

      {/* Segmented Control / Tabs */}
      <div className="p-3">
        {isIos ? (
          <div className="flex bg-slate-200/70 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/30">
            <button onClick={() => setActiveTab('overview')} className={tabButtonClass('overview')}>Overview</button>
            <button onClick={() => setActiveTab('estates')} className={tabButtonClass('estates')}>Estates</button>
            <button onClick={() => setActiveTab('admins')} className={tabButtonClass('admins')}>Admins</button>
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
          </div>
        ) : (
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            <button onClick={() => setActiveTab('overview')} className={tabButtonClass('overview')}>Overview</button>
            <button onClick={() => setActiveTab('estates')} className={tabButtonClass('estates')}>Estates</button>
            <button onClick={() => setActiveTab('admins')} className={tabButtonClass('admins')}>Admins</button>
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
          </div>
        )}
      </div>

      {/* Main Tab Contents */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {/* TAB: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* System Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Estates</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">
                  {activeEstatesCount} <span className="text-xs font-normal text-slate-400">/ {totalEstatesCount}</span>
                </p>
                <div className="mt-2 w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-600 h-full rounded-full"
                    style={{ width: `${(activeEstatesCount/totalEstatesCount)*100}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">System Admins</span>
                <p className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{totalAdminsCount}</p>
                <p className="text-[10px] text-green-500 font-semibold flex items-center gap-0.5 mt-2">
                  <span>●</span> 100% Active Duty
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Commission Revenue</span>
                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                      ₦{(totalRevenue).toLocaleString()}
                    </p>
                  </div>
                  <div className="bg-indigo-50 dark:bg-indigo-950/50 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/40">
                    <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Based on a 15% marketplace platform cut on completed service provider bookings</p>
              </div>
            </div>

            {/* Quick Action Forms */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Onboard New Estate</h2>
              <form onSubmit={handleAddEstate} className="space-y-2.5">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Estate Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Oakwood Villas"
                    value={newEstateName}
                    onChange={(e) => setNewEstateName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Street Address</label>
                  <input
                    type="text"
                    placeholder="Address, City"
                    value={newEstateAddress}
                    onChange={(e) => setNewEstateAddress(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Zone</label>
                    <select
                      value={newEstateZone}
                      onChange={(e) => setNewEstateZone(e.target.value)}
                      className="w-full text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                    >
                      <option>South-West</option>
                      <option>North-Central</option>
                      <option>South-South</option>
                      <option>South-East</option>
                      <option>North-West</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Billing Tier</label>
                    <select
                      value={newEstateBilling}
                      onChange={(e) => setNewEstateBilling(e.target.value)}
                      className="w-full text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                    >
                      <option>Basic</option>
                      <option>Standard</option>
                      <option>Premium</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-md transition-all mt-2"
                >
                  Onboard Estate
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB: ESTATES */}
        {activeTab === 'estates' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-xs font-bold text-slate-400 uppercase">Registered Estates ({estates.length})</h2>
              <span className="text-[10px] text-slate-400 italic">Tap to toggle status</span>
            </div>

            {estates.map((est) => (
              <div
                key={est.id}
                className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-100">{est.name}</h3>
                    <p className="text-[10px] text-slate-400 mt-0.5">{est.address}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                    est.status === 'Active'
                      ? 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                  }`}>
                    {est.status}
                  </span>
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 font-semibold">{est.zone} • <span className="text-indigo-600 dark:text-indigo-400">{est.billingPlan} Tier</span></span>
                  <button
                    onClick={() => toggleEstateStatus(est.id)}
                    className="text-[10px] font-extrabold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 underline decoration-dotted"
                  >
                    Change Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB: ADMINS */}
        {activeTab === 'admins' && (
          <div className="space-y-4">

            {/* Create Admin Form */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">Provision Estate Admin</h2>
              <form onSubmit={handleAddAdmin} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      placeholder="Admin Name"
                      value={newAdminName}
                      onChange={(e) => setNewAdminName(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="name@estate.com"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Assigned Estate</label>
                    <select
                      value={newAdminEstateId}
                      onChange={(e) => setNewAdminEstateId(e.target.value)}
                      className="w-full text-[11px] p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                      required
                    >
                      <option value="">Select Estate</option>
                      {estates.map(est => (
                        <option key={est.id} value={est.id}>{est.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Phone Contact</label>
                    <input
                      type="text"
                      placeholder="+234..."
                      value={newAdminPhone}
                      onChange={(e) => setNewAdminPhone(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm transition-all mt-1"
                >
                  Create Estate Admin Account
                </button>
              </form>
            </div>

            {/* Admins List */}
            <div className="space-y-2.5">
              <h2 className="text-xs font-bold text-slate-400 uppercase mb-1">Estate Administrators ({admins.length})</h2>
              {admins.map((admin) => {
                const assignedEst = estates.find(e => e.id === admin.estateId);
                return (
                  <div key={admin.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{admin.name}</h4>
                      <p className="text-[10px] text-slate-400">{admin.email} • {admin.phone}</p>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold mt-1">
                        🏢 {assignedEst ? assignedEst.name : 'Unknown Estate'}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleAdminStatus(admin.id)}
                      className={`text-[9px] font-bold px-2 py-1 rounded-md border ${
                        admin.status === 'Active'
                          ? 'border-green-200 text-green-700 bg-green-50/50 dark:bg-green-950/20'
                          : 'border-rose-200 text-rose-700 bg-rose-50/50 dark:bg-rose-950/20'
                      }`}
                    >
                      {admin.status}
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 mb-1">Betaserve Professional Network</h2>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Platform-wide certified third-party service provider metrics. Superadmins retain configuration privileges for active service dispatch.
              </p>
            </div>

            <div className="space-y-2.5">
              <h2 className="text-xs font-bold text-slate-400 uppercase mb-1">Managed Service Categories</h2>
              {serviceCats.map((cat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
                      {cat.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{cat.name}</h4>
                      <p className="text-[10px] text-slate-400">{cat.activeTechs} certified technicians available</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">
                      {cat.count} Dispatches
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
