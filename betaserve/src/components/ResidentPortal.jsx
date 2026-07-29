import React, { useState } from 'react';

export default function ResidentPortal({
  estates,
  currentResident,
  announcements,
  visitorPasses,
  setVisitorPasses,
  serviceRequests,
  setServiceRequests,
  serviceCats,
  platform
}) {
  const [activeTab, setActiveTab] = useState('announcements'); // announcements, passes, services
  const isIos = platform === 'ios';

  const assignedEstate = estates.find(e => e.id === currentResident.estateId) || estates[0];

  // Pass Form state
  const [newVisitorName, setNewVisitorName] = useState('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState('Social Visit');

  // Service Request Form state
  const [newReqServiceType, setNewReqServiceType] = useState('Plumbing');
  const [newReqDesc, setNewReqDesc] = useState('');
  const [newReqPriority, setNewReqPriority] = useState('Medium');
  const [newReqCost, setNewReqCost] = useState('15000');

  // Filtered resident specific lists
  const residentAnnouncements = announcements.filter(a => a.estateId === assignedEstate.id);
  const residentPasses = visitorPasses.filter(
    p => p.estateId === assignedEstate.id && p.hostResident.toLowerCase() === currentResident.name.toLowerCase()
  );
  const residentRequests = serviceRequests.filter(
    r => r.estateId === assignedEstate.id && r.residentName.toLowerCase() === currentResident.name.toLowerCase()
  );

  const handleGeneratePass = (e) => {
    e.preventDefault();
    if (!newVisitorName) return;
    const pin = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPass = {
      id: `pass-${Date.now()}`,
      estateId: assignedEstate.id,
      visitorName: newVisitorName,
      hostResident: currentResident.name,
      passCode: pin,
      validUntil: '2025-02-25 23:59',
      purpose: newVisitorPurpose,
      status: 'Issued',
      checkInTime: '',
      checkOutTime: ''
    };
    setVisitorPasses([...visitorPasses, newPass]);
    setNewVisitorName('');
  };

  const handleBookService = (e) => {
    e.preventDefault();
    if (!newReqDesc) return;
    const newReq = {
      id: `req-${Date.now()}`,
      estateId: assignedEstate.id,
      residentName: currentResident.name,
      residentPhone: currentResident.phone,
      houseNo: currentResident.houseNo,
      serviceType: newReqServiceType,
      description: newReqDesc,
      priority: newReqPriority,
      status: 'Pending',
      assignedTo: '',
      createdAt: '2025-02-24 14:00',
      cost: parseInt(newReqCost) || 12000
    };
    setServiceRequests([...serviceRequests, newReq]);
    setNewReqDesc('');
  };

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
          ? 'border-indigo-600 text-indigo-600'
          : 'border-transparent text-zinc-500 hover:text-zinc-800'
      }`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">

      {/* Resident Portal Header */}
      <div className={`px-4 py-3 border-b flex flex-col gap-1 ${
        isIos
          ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              R
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">{currentResident.name}</h1>
              <p className="text-[10px] text-slate-500 font-medium">Resident Hub • {currentResident.houseNo}</p>
            </div>
          </div>
          <span className="text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
            RESIDENT
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
          🏢 {assignedEstate.name}
        </p>
      </div>

      {/* Tabs */}
      <div className="p-3">
        {isIos ? (
          <div className="flex bg-slate-200/70 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/30">
            <button onClick={() => setActiveTab('announcements')} className={tabButtonClass('announcements')}>Bulletins</button>
            <button onClick={() => setActiveTab('passes')} className={tabButtonClass('passes')}>My Passes</button>
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
          </div>
        ) : (
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            <button onClick={() => setActiveTab('announcements')} className={tabButtonClass('announcements')}>Bulletins</button>
            <button onClick={() => setActiveTab('passes')} className={tabButtonClass('passes')}>My Passes</button>
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {/* TAB: BULLETINS */}
        {activeTab === 'announcements' && (
          <div className="space-y-3.5">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Estate Announcements ({residentAnnouncements.length})</h3>
            </div>
            {residentAnnouncements.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-6">No announcements published for your estate yet.</p>
            ) : (
              residentAnnouncements.map(ann => (
                <div key={ann.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                      ann.category === 'Security'
                        ? 'bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300'
                        : ann.category === 'Maintenance'
                        ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                        : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    }`}>
                      {ann.category}
                    </span>
                    <span className="text-[9px] text-slate-400">{ann.date}</span>
                  </div>
                  <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{ann.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">{ann.content}</p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB: VISITOR PASSES */}
        {activeTab === 'passes' && (
          <div className="space-y-4">

            {/* Generate Pass Form */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Create Guest Access Code</h3>
              <form onSubmit={handleGeneratePass} className="space-y-2">
                <input
                  type="text"
                  placeholder="Guest's Full Name"
                  value={newVisitorName}
                  onChange={(e) => setNewVisitorName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <div className="flex gap-2">
                  <select
                    value={newVisitorPurpose}
                    onChange={(e) => setNewVisitorPurpose(e.target.value)}
                    className="flex-1 text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option>Social Visit</option>
                    <option>Delivery</option>
                    <option>Maintenance</option>
                    <option>Business</option>
                  </select>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    Generate Pass PIN
                  </button>
                </div>
              </form>
            </div>

            {/* Passes Directory */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase">My Guest Access Codes ({residentPasses.length})</h3>
              {residentPasses.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">You haven't generated any passes yet.</p>
              ) : (
                residentPasses.map(pass => (
                  <div key={pass.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{pass.visitorName}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Purpose: {pass.purpose}</p>
                      </div>
                      <span className="text-xs font-black tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/30">
                        {pass.passCode}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                      <span className="text-slate-500 font-semibold">
                        {pass.status === 'Issued' && '🕒 Waiting check-in'}
                        {pass.status === 'Checked-In' && `🟢 Checked-in at ${pass.checkInTime}`}
                        {pass.status === 'Checked-Out' && `🔴 Checked-out at ${pass.checkOutTime}`}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">

            {/* Create Service Request Form */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Request Maintenance Service</h3>
              <form onSubmit={handleBookService} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={newReqServiceType}
                    onChange={(e) => setNewReqServiceType(e.target.value)}
                    className="w-full text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option>Plumbing</option>
                    <option>Electrical</option>
                    <option>HVAC AC Repair</option>
                    <option>Waste Disposal</option>
                    <option>Gardening & Landscaping</option>
                    <option>Security & Access Control</option>
                  </select>
                  <select
                    value={newReqPriority}
                    onChange={(e) => setNewReqPriority(e.target.value)}
                    className="w-full text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="e.g. Broken faucet, power trip..."
                      value={newReqDesc}
                      onChange={(e) => setNewReqDesc(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Budget (₦)"
                      value={newReqCost}
                      onChange={(e) => setNewReqCost(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm"
                >
                  Book Maintenance Dispatch
                </button>
              </form>
            </div>

            {/* Service Requests List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase">My Requests ({residentRequests.length})</h3>
              {residentRequests.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">You haven't requested any services yet.</p>
              ) : (
                residentRequests.map(req => (
                  <div key={req.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-bold">
                          {req.serviceType}
                        </span>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mt-1.5">{req.residentName} • {req.houseNo}</h4>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        req.priority === 'Critical' || req.priority === 'High'
                          ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                          : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                      }`}>
                        {req.priority}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 mt-1.5 leading-tight">{req.description}</p>

                    {req.assignedTo && (
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">
                        🛠️ Assigned Specialist: {req.assignedTo}
                      </p>
                    )}

                    <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                      <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">₦{(req.cost || 0).toLocaleString()}</span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${
                        req.status === 'Completed'
                          ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300'
                          : req.status === 'In Progress'
                          ? 'bg-blue-100 dark:bg-blue-950/20 text-blue-700 dark:text-blue-300'
                          : 'bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
