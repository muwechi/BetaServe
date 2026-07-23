import React, { useState } from 'react';

export default function AdminDashboard({
  estates,
  residents,
  setResidents,
  serviceRequests,
  setServiceRequests,
  visitorPasses,
  setVisitorPasses,
  announcements,
  setAnnouncements,
  currentAdmin,
  platform
}) {
  const [activeTab, setActiveTab] = useState('services'); // residents, services, visitor, announcements
  const isIos = platform === 'ios';

  const assignedEstate = estates.find(e => e.id === currentAdmin.estateId) || estates[0];

  // Form states
  const [newResName, setNewResName] = useState('');
  const [newResEmail, setNewResEmail] = useState('');
  const [newResPhone, setNewResPhone] = useState('');
  const [newResHouse, setNewResHouse] = useState('');

  const [newVisitorName, setNewVisitorName] = useState('');
  const [newVisitorHost, setNewVisitorHost] = useState('');
  const [newVisitorPurpose, setNewVisitorPurpose] = useState('Social Visit');

  const [newReqResName, setNewReqResName] = useState('');
  const [newReqResHouse, setNewReqResHouse] = useState('');
  const [newReqServiceType, setNewReqServiceType] = useState('Plumbing');
  const [newReqDesc, setNewReqDesc] = useState('');
  const [newReqPriority, setNewReqPriority] = useState('Medium');
  const [newReqCost, setNewReqCost] = useState('12000');

  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnContent, setNewAnnContent] = useState('');
  const [newAnnCat, setNewAnnCat] = useState('General');

  // Stats
  const estateResidents = residents.filter(r => r.estateId === assignedEstate.id);
  const estateRequests = serviceRequests.filter(r => r.estateId === assignedEstate.id);
  const estatePasses = visitorPasses.filter(p => p.estateId === assignedEstate.id);
  const estateAnnouncements = announcements.filter(a => a.estateId === assignedEstate.id);

  // Handlers
  const handleAddResident = (e) => {
    e.preventDefault();
    if (!newResName || !newResEmail) return;
    const newRes = {
      id: `res-${Date.now()}`,
      name: newResName,
      email: newResEmail,
      phone: newResPhone || '+234 800 000 0000',
      houseNo: newResHouse || 'TBD',
      estateId: assignedEstate.id,
      status: 'Active'
    };
    setResidents([...residents, newRes]);
    setNewResName('');
    setNewResEmail('');
    setNewResPhone('');
    setNewResHouse('');
  };

  const handleGeneratePass = (e) => {
    e.preventDefault();
    if (!newVisitorName || !newVisitorHost) return;
    const pin = `BS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newPass = {
      id: `pass-${Date.now()}`,
      estateId: assignedEstate.id,
      visitorName: newVisitorName,
      hostResident: newVisitorHost,
      passCode: pin,
      validUntil: '2025-02-25 18:00',
      purpose: newVisitorPurpose,
      status: 'Issued',
      checkInTime: '',
      checkOutTime: ''
    };
    setVisitorPasses([...visitorPasses, newPass]);
    setNewVisitorName('');
    setNewVisitorHost('');
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newReqResName || !newReqDesc) return;
    const newReq = {
      id: `req-${Date.now()}`,
      estateId: assignedEstate.id,
      residentName: newReqResName,
      residentPhone: '+234 803 123 4567',
      houseNo: newReqResHouse || 'Villa 1',
      serviceType: newReqServiceType,
      description: newReqDesc,
      priority: newReqPriority,
      status: 'Pending',
      assignedTo: '',
      createdAt: '2025-02-24 12:00',
      cost: parseInt(newReqCost) || 10000
    };
    setServiceRequests([...serviceRequests, newReq]);
    setNewReqResName('');
    setNewReqResHouse('');
    setNewReqDesc('');
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnTitle || !newAnnContent) return;
    const newAnn = {
      id: `ann-${Date.now()}`,
      estateId: assignedEstate.id,
      title: newAnnTitle,
      content: newAnnContent,
      category: newAnnCat,
      date: '2025-02-24'
    };
    setAnnouncements([...announcements, newAnn]);
    setNewAnnTitle('');
    setNewAnnContent('');
  };

  // Quick state actions
  const updateRequestStatus = (id, nextStatus) => {
    const assignedProviders = {
      'Plumbing': 'Alhaji & Sons Plumbing',
      'Electrical': 'Musa (Lead Electrician)',
      'HVAC AC Repair': 'Chill Air Conditioning Corp',
      'Waste Disposal': 'CleanWay Disposal',
      'Gardening & Landscaping': 'GreenThumb Gardens',
      'Security & Access Control': 'Fortress Security Systems'
    };

    setServiceRequests(serviceRequests.map(req => {
      if (req.id === id) {
        return {
          ...req,
          status: nextStatus,
          assignedTo: nextStatus === 'In Progress' ? (assignedProviders[req.serviceType] || 'Standard Dispatch') : req.assignedTo
        };
      }
      return req;
    }));
  };

  const updatePassStatus = (id, nextStatus) => {
    const nowStr = '2025-02-24 13:00';
    setVisitorPasses(visitorPasses.map(pass => {
      if (pass.id === id) {
        return {
          ...pass,
          status: nextStatus,
          checkInTime: nextStatus === 'Checked-In' ? nowStr : pass.checkInTime,
          checkOutTime: nextStatus === 'Checked-Out' ? nowStr : pass.checkOutTime
        };
      }
      return pass;
    }));
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
          ? 'border-emerald-600 text-emerald-600'
          : 'border-transparent text-zinc-500 hover:text-zinc-800'
      }`;
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">

      {/* Admin header */}
      <div className={`px-4 py-3 border-b flex flex-col gap-1 ${
        isIos
          ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md">
              A
            </div>
            <div>
              <h1 className="text-sm font-bold leading-tight">{currentAdmin.name}</h1>
              <p className="text-[10px] text-slate-500 font-medium">Estate Manager Portal</p>
            </div>
          </div>
          <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
            ADMIN
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-1 flex items-center gap-1">
          🏢 {assignedEstate.name}
        </p>
      </div>

      {/* Navigation tabs */}
      <div className="p-3">
        {isIos ? (
          <div className="flex bg-slate-200/70 dark:bg-slate-900 p-0.5 rounded-lg border border-slate-300/30">
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
            <button onClick={() => setActiveTab('visitor')} className={tabButtonClass('visitor')}>Passes</button>
            <button onClick={() => setActiveTab('residents')} className={tabButtonClass('residents')}>Residents</button>
            <button onClick={() => setActiveTab('announcements')} className={tabButtonClass('announcements')}>Alerts</button>
          </div>
        ) : (
          <div className="flex border-b border-zinc-200 dark:border-zinc-800">
            <button onClick={() => setActiveTab('services')} className={tabButtonClass('services')}>Services</button>
            <button onClick={() => setActiveTab('visitor')} className={tabButtonClass('visitor')}>Passes</button>
            <button onClick={() => setActiveTab('residents')} className={tabButtonClass('residents')}>Residents</button>
            <button onClick={() => setActiveTab('announcements')} className={tabButtonClass('announcements')}>Alerts</button>
          </div>
        )}
      </div>

      {/* Content wrapper */}
      <div className="flex-1 overflow-y-auto px-4 pb-6">

        {/* TAB: SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">

            {/* Create Service Request Form */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Dispatch Service Request</h3>
              <form onSubmit={handleCreateRequest} className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Resident Name"
                    value={newReqResName}
                    onChange={(e) => setNewReqResName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    required
                  />
                  <input
                    type="text"
                    placeholder="House / Apt No"
                    value={newReqResHouse}
                    onChange={(e) => setNewReqResHouse(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    required
                  />
                </div>
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
                      placeholder="Service issue detail..."
                      value={newReqDesc}
                      onChange={(e) => setNewReqDesc(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Cost (₦)"
                      value={newReqCost}
                      onChange={(e) => setNewReqCost(e.target.value)}
                      className="w-full text-xs px-2 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                >
                  Book Service Dispatch
                </button>
              </form>
            </div>

            {/* Service Requests List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Service Dispatches ({estateRequests.length})</h3>
              {estateRequests.map(req => (
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
                      🛠️ Contractor: {req.assignedTo}
                    </p>
                  )}

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400">₦{(req.cost || 0).toLocaleString()}</span>

                    {/* Action buttons based on status */}
                    <div className="flex gap-1.5">
                      {req.status === 'Pending' && (
                        <button
                          onClick={() => updateRequestStatus(req.id, 'In Progress')}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9px] font-bold px-2.5 py-1 rounded"
                        >
                          Approve & Assign
                        </button>
                      )}
                      {req.status === 'In Progress' && (
                        <button
                          onClick={() => updateRequestStatus(req.id, 'Completed')}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-2.5 py-1 rounded"
                        >
                          Mark Completed
                        </button>
                      )}
                      {req.status === 'Completed' && (
                        <span className="text-green-600 dark:text-green-400 text-[10px] font-black flex items-center gap-1">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB: VISITOR PASSES */}
        {activeTab === 'visitor' && (
          <div className="space-y-4">

            {/* Generate Pass Code */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Gate Visitor Access Code</h3>
              <form onSubmit={handleGeneratePass} className="space-y-2">
                <input
                  type="text"
                  placeholder="Visitor's Full Name"
                  value={newVisitorName}
                  onChange={(e) => setNewVisitorName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Host (Resident)"
                    value={newVisitorHost}
                    onChange={(e) => setNewVisitorHost(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                    required
                  />
                  <select
                    value={newVisitorPurpose}
                    onChange={(e) => setNewVisitorPurpose(e.target.value)}
                    className="w-full text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option>Social Visit</option>
                    <option>Delivery</option>
                    <option>Maintenance</option>
                    <option>Business</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg shadow-sm"
                >
                  Generate Access Code
                </button>
              </form>
            </div>

            {/* Passes Directory */}
            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Active Access Gate Logs ({estatePasses.length})</h3>
              {estatePasses.map(pass => (
                <div key={pass.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100">{pass.visitorName}</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Host: {pass.hostResident} • {pass.purpose}</p>
                    </div>
                    <span className="text-xs font-black tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-900/30">
                      {pass.passCode}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                    <span className="text-slate-500 font-semibold">
                      {pass.status === 'Issued' && '🕒 Waiting check-in'}
                      {pass.status === 'Checked-In' && `🟢 Checked-in at ${pass.checkInTime}`}
                      {pass.status === 'Checked-Out' && `🔴 Left at ${pass.checkOutTime}`}
                    </span>

                    <div className="flex gap-1.5">
                      {pass.status === 'Issued' && (
                        <button
                          onClick={() => updatePassStatus(pass.id, 'Checked-In')}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold px-2 py-0.5 rounded"
                        >
                          Check In
                        </button>
                      )}
                      {pass.status === 'Checked-In' && (
                        <button
                          onClick={() => updatePassStatus(pass.id, 'Checked-Out')}
                          className="bg-slate-600 hover:bg-slate-700 text-white text-[9px] font-bold px-2 py-0.5 rounded"
                        >
                          Check Out
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB: RESIDENTS */}
        {activeTab === 'residents' && (
          <div className="space-y-4">

            {/* Create Resident Form */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Register Resident</h3>
              <form onSubmit={handleAddResident} className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newResName}
                  onChange={(e) => setNewResName(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newResEmail}
                  onChange={(e) => setNewResEmail(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Phone"
                    value={newResPhone}
                    onChange={(e) => setNewResPhone(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  />
                  <input
                    type="text"
                    placeholder="House Number"
                    value={newResHouse}
                    onChange={(e) => setNewResHouse(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                >
                  Confirm Registration
                </button>
              </form>
            </div>

            {/* Residents Directory */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Directory ({estateResidents.length})</h3>
              {estateResidents.map(res => (
                <div key={res.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex justify-between items-center">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{res.name}</h4>
                    <p className="text-[10px] text-slate-400">{res.email} • {res.phone}</p>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-1">🏠 {res.houseNo}</p>
                  </div>
                  <span className="text-[9px] font-bold bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-900/40 px-2 py-0.5 rounded-full">
                    {res.status}
                  </span>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB: ANNOUNCEMENTS / ALERTS */}
        {activeTab === 'announcements' && (
          <div className="space-y-4">

            {/* Create Announcement Form */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Publish Announcement</h3>
              <form onSubmit={handleCreateAnnouncement} className="space-y-2">
                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={newAnnTitle}
                  onChange={(e) => setNewAnnTitle(e.target.value)}
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <textarea
                  placeholder="Publish emergency alert or announcement description..."
                  value={newAnnContent}
                  onChange={(e) => setNewAnnContent(e.target.value)}
                  rows="2"
                  className="w-full text-xs px-2.5 py-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 border-slate-200 dark:border-slate-800"
                  required
                />
                <div className="flex gap-2">
                  <select
                    value={newAnnCat}
                    onChange={(e) => setNewAnnCat(e.target.value)}
                    className="flex-1 text-xs p-1.5 border rounded-lg bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100"
                  >
                    <option>General</option>
                    <option>Security</option>
                    <option>Maintenance</option>
                    <option>Event</option>
                  </select>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm"
                  >
                    Publish Bulletin
                  </button>
                </div>
              </form>
            </div>

            {/* Bulletins List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase">Bulletin Board ({estateAnnouncements.length})</h3>
              {estateAnnouncements.map(ann => (
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
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
