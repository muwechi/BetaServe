import React, { useState } from 'react';

export default function SecurityGatePortal({
  estates,
  visitorPasses,
  setVisitorPasses,
  platform
}) {
  const [pinInput, setPinInput] = useState('');
  const [verificationResult, setVerificationResult] = useState(null); // null, success, error
  const [scannedPass, setScannedPass] = useState(null);
  const isIos = platform === 'ios';

  const handleVerifyPIN = (e) => {
    e.preventDefault();
    if (!pinInput) return;

    // Normalize pin format (with or without 'BS-')
    let normalizedPin = pinInput.trim().toUpperCase();
    if (!normalizedPin.startsWith('BS-')) {
      normalizedPin = `BS-${normalizedPin}`;
    }

    // Lookup pass code in current global database state
    const matchedPass = visitorPasses.find(p => p.passCode === normalizedPin);

    if (matchedPass) {
      setVerificationResult('success');
      setScannedPass(matchedPass);
    } else {
      setVerificationResult('error');
      setScannedPass(null);
    }
  };

  const handleCheckIn = () => {
    if (!scannedPass) return;
    const nowStr = '2025-02-24 15:30';

    // Update global state
    const updatedPasses = visitorPasses.map(pass => {
      if (pass.id === scannedPass.id) {
        const updated = {
          ...pass,
          status: 'Checked-In',
          checkInTime: nowStr
        };
        setScannedPass(updated); // update local viewport display
        return updated;
      }
      return pass;
    });
    setVisitorPasses(updatedPasses);
    setPinInput('');
  };

  const handleCheckOut = () => {
    if (!scannedPass) return;
    const nowStr = '2025-02-24 17:45';

    // Update global state
    const updatedPasses = visitorPasses.map(pass => {
      if (pass.id === scannedPass.id) {
        const updated = {
          ...pass,
          status: 'Checked-Out',
          checkOutTime: nowStr
        };
        setScannedPass(updated); // update local viewport display
        return updated;
      }
      return pass;
    });
    setVisitorPasses(updatedPasses);
    setPinInput('');
  };

  const handleResetScanner = () => {
    setPinInput('');
    setVerificationResult(null);
    setScannedPass(null);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100">

      {/* Security Gate Header */}
      <div className={`px-4 py-3 border-b flex items-center justify-between ${
        isIos
          ? 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
          : 'bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-white font-black text-sm shadow-md">
            🛡️
          </div>
          <div>
            <h1 className="text-sm font-extrabold leading-tight">Security Checkpoint</h1>
            <p className="text-[10px] text-slate-500 font-medium">Main Gate Entry Scanner</p>
          </div>
        </div>
        <span className="text-[9px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
          LIVE GUARD
        </span>
      </div>

      {/* Main scanner view */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Pass Verification Terminal */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2.5">PIN Access Verification</h3>

          {verificationResult === null && (
            <form onSubmit={handleVerifyPIN} className="space-y-3">
              <p className="text-[11px] text-slate-500 leading-normal">
                Enter the 6-digit access PIN (e.g. <strong>BS-882190</strong> or just <strong>882190</strong>) presented by the visitor to query verification databases.
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. BS-882190"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full text-center tracking-widest font-black text-lg py-2 border-2 border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 uppercase"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-md transition-all uppercase tracking-wider"
              >
                Scan Access Pass
              </button>
            </form>
          )}

          {/* Verification Result display */}
          {verificationResult === 'success' && scannedPass && (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-950/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-xl font-bold border border-green-200 dark:border-green-800/40">
                ✓
              </div>
              <div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400">Verified Guest Code</span>
                <p className="text-lg font-black tracking-wider text-indigo-600 dark:text-indigo-400 mt-0.5">
                  {scannedPass.passCode}
                </p>
              </div>

              {/* Guest Profile Card */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 text-left space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100/50 dark:border-slate-800/50">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Visitor Profile</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                    scannedPass.status === 'Checked-In'
                      ? 'bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-300'
                      : scannedPass.status === 'Checked-Out'
                      ? 'bg-rose-100 dark:bg-rose-950/20 text-rose-700 dark:text-rose-300'
                      : 'bg-amber-100 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300'
                  }`}>
                    {scannedPass.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400">Full Name</span>
                    <p className="font-extrabold text-slate-800 dark:text-slate-100">{scannedPass.visitorName}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400">Host (Resident)</span>
                    <p className="font-extrabold text-slate-800 dark:text-slate-100">{scannedPass.hostResident}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400">Purpose</span>
                    <p className="font-semibold text-slate-600 dark:text-slate-300">{scannedPass.purpose}</p>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold uppercase text-slate-400">Valid Until</span>
                    <p className="font-semibold text-slate-500 dark:text-slate-400 text-[10px]">{scannedPass.validUntil}</p>
                  </div>
                </div>
              </div>

              {/* Guard entry buttons */}
              <div className="flex gap-2">
                {scannedPass.status === 'Issued' && (
                  <button
                    onClick={handleCheckIn}
                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-md uppercase tracking-wider"
                  >
                    Check In Guest
                  </button>
                )}
                {scannedPass.status === 'Checked-In' && (
                  <button
                    onClick={handleCheckOut}
                    className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md uppercase tracking-wider"
                  >
                    Check Out Guest
                  </button>
                )}
                <button
                  onClick={handleResetScanner}
                  className="flex-1 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl shadow-md uppercase tracking-wider"
                >
                  Clear Scanner
                </button>
              </div>
            </div>
          )}

          {verificationResult === 'error' && (
            <div className="space-y-4 text-center">
              <div className="mx-auto w-12 h-12 bg-rose-100 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-600 dark:text-rose-400 text-xl font-bold border border-rose-200 dark:border-rose-800/40">
                ✕
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-rose-600 dark:text-rose-400">Access Denied</h4>
                <p className="text-[11px] text-slate-500 mt-1">
                  The PIN code you scanned could not be verified in our current database registry. Access has been locked.
                </p>
              </div>
              <button
                onClick={handleResetScanner}
                className="w-full py-2 bg-slate-800 hover:bg-slate-900 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-bold text-xs rounded-xl shadow-md uppercase tracking-wider"
              >
                Scan Another Code
              </button>
            </div>
          )}

        </div>

        {/* Real-time Gate Log Feed */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xs font-bold text-slate-400 uppercase">Recent Security Gate Logs ({visitorPasses.length})</h3>
            <span className="text-[9px] bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-black uppercase">
              RECORDS
            </span>
          </div>

          {visitorPasses.map(pass => (
            <div key={pass.id} className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100">{pass.visitorName}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Host: {pass.hostResident} • {pass.purpose}</p>
                </div>
                <span className="text-xs font-black tracking-wider text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                  {pass.passCode}
                </span>
              </div>

              <div className="mt-3.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-[10px]">
                <span className="text-slate-500 font-semibold">
                  {pass.status === 'Issued' && '🕒 Waiting check-in'}
                  {pass.status === 'Checked-In' && `🟢 Checked-in at ${pass.checkInTime}`}
                  {pass.status === 'Checked-Out' && `🔴 Left at ${pass.checkOutTime}`}
                </span>

                {pass.status !== 'Checked-Out' && (
                  <button
                    onClick={() => {
                      setPinInput(pass.passCode);
                      setVerificationResult('success');
                      setScannedPass(pass);
                    }}
                    className="text-[9px] font-extrabold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Quick Check ➔
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
