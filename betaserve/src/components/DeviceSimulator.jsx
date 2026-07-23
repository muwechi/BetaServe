import React from 'react';

export default function DeviceSimulator({ platform, setPlatform, children }) {
  const isIos = platform === 'ios';

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Platform Selector Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-4 shadow-inner border border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={() => setPlatform('ios')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            isIos
              ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.22.67-2.94 1.5-.63.73-1.18 1.87-1.03 2.97 1.12.09 2.27-.6 2.98-1.41z" />
          </svg>
          iOS Device Shell
        </button>
        <button
          onClick={() => setPlatform('android')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
            !isIos
              ? 'bg-white dark:bg-slate-700 text-green-600 dark:text-green-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.63 21.93c-.22 0-.44-.06-.64-.17L12 19.53l-3.99 2.23a1.27 1.27 0 01-1.89-1.09V6.43c0-.62.33-1.2.88-1.5L11.12 2.6a2 2 0 011.76 0l4.13 2.33c.55.3 1 .88 1 1.5v14.24a1.27 1.27 0 01-1.38 1.26zM12 4c-.16 0-.32.04-.46.12L7.41 6.45c-.18.1-.3.29-.3.5v11.89l4.43-2.48a1 1 0 01.92 0l4.43 2.48V6.95c0-.21-.12-.4-.3-.5L12.46 4.12A1 1 0 0112 4z" style={{display:'none'}} />
            {/* Standard Android icon */}
            <path d="M7 11h2v2H7zm8 0h2v2h-2zm-6.81-5.47l-1-1.73A1 1 0 118.93 2.8l1.04 1.8A7.91 7.91 0 0112 4c.73 0 1.43.1 2.07.28l1-1.73a1 1 0 111.73 1l-1 1.73A8 8 0 0120 12H4a8 8 0 011.19-4.47zM4 14h16v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4z"/>
          </svg>
          Android Device Shell
        </button>
      </div>

      {/* Device frame container */}
      <div
        className={`relative transition-all duration-500 shadow-2xl border-4 ${
          isIos
            ? 'w-[400px] h-[820px] rounded-[52px] border-slate-900 bg-slate-950 p-[12px] ring-12 ring-slate-900/10'
            : 'w-[410px] h-[830px] rounded-[36px] border-zinc-800 bg-zinc-900 p-[10px] ring-12 ring-zinc-800/10'
        }`}
      >
        {/* Hardware details: Speaker/Notch for iOS */}
        {isIos && (
          <>
            {/* Dynamic Island Notch */}
            <div className="absolute top-[22px] left-1/2 -translate-x-1/2 w-[110px] h-[28px] bg-black rounded-3xl z-50 flex items-center justify-between px-3">
              <div className="w-3 h-3 bg-neutral-900 rounded-full border border-neutral-800"></div>
              <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full"></div>
            </div>
            {/* Side Buttons (Simulated) */}
            <div className="absolute -left-[16px] top-[140px] w-[4px] h-[30px] bg-slate-800 rounded-l"></div>
            <div className="absolute -left-[16px] top-[190px] w-[4px] h-[50px] bg-slate-800 rounded-l"></div>
            <div className="absolute -left-[16px] top-[250px] w-[4px] h-[50px] bg-slate-800 rounded-l"></div>
            <div className="absolute -right-[16px] top-[210px] w-[4px] h-[65px] bg-slate-800 rounded-r"></div>
          </>
        )}

        {/* Hardware details: Punch hole for Android */}
        {!isIos && (
          <>
            {/* Camera Hole */}
            <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50 border border-neutral-800 flex items-center justify-center">
              <div className="w-1 h-1 bg-neutral-900 rounded-full"></div>
            </div>
            {/* Side Buttons (Simulated) */}
            <div className="absolute -right-[14px] top-[150px] w-[4px] h-[40px] bg-zinc-700 rounded-r"></div>
            <div className="absolute -right-[14px] top-[210px] w-[4px] h-[70px] bg-zinc-700 rounded-r"></div>
          </>
        )}

        {/* Device screen content with proper styling */}
        <div
          className={`w-full h-full bg-slate-50 dark:bg-slate-900 overflow-hidden relative flex flex-col select-none ${
            isIos
              ? 'rounded-[40px] font-sans'
              : 'rounded-[28px] font-sans'
          }`}
        >
          {/* Status Bar */}
          <div
            className={`flex justify-between items-center px-6 pt-3 pb-2 text-[12px] font-bold z-40 select-none ${
              isIos
                ? 'bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 h-10'
                : 'bg-zinc-100 dark:bg-zinc-950 text-zinc-700 dark:text-zinc-200 h-8'
            }`}
          >
            {isIos ? (
              <>
                <span>9:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19.4c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l1.9-1.9C9.17 19.58 10.53 20 12 20c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 15c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                  </svg>
                  <span className="text-[10px]">5G</span>
                  <div className="w-5 h-2.5 border border-slate-800 dark:border-white rounded-sm p-0.5 flex items-center">
                    <div className="w-full h-full bg-slate-800 dark:bg-white rounded-[1px]"></div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                  </svg>
                  <span className="text-[11px] font-medium">Betaserve LTE</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-medium">85%</span>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
                  </svg>
                  <span className="text-[11px] font-medium">10:45 AM</span>
                </div>
              </>
            )}
          </div>

          {/* Core App View Container */}
          <div className="flex-1 overflow-y-auto relative flex flex-col">
            {children}
          </div>

          {/* Navigation Bar / Gesture Bar */}
          <div
            className={`w-full flex justify-center items-center select-none ${
              isIos
                ? 'bg-slate-100 dark:bg-slate-950 pb-2 pt-1 h-8'
                : 'bg-zinc-100 dark:bg-zinc-950 py-2 h-10 border-t border-zinc-200 dark:border-zinc-800'
            }`}
          >
            {isIos ? (
              /* Apple Home Gesture Line */
              <div className="w-32 h-1 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
            ) : (
              /* Android 3-Button Navigation or Pill */
              <div className="flex justify-around items-center w-full px-12">
                {/* Back triangle */}
                <button className="text-zinc-600 dark:text-zinc-400 p-1">
                  <svg className="w-4 h-4 transform rotate-180" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                {/* Home Circle */}
                <button className="text-zinc-600 dark:text-zinc-400 p-1">
                  <div className="w-3.5 h-3.5 border-2 border-zinc-600 dark:border-zinc-400 rounded-full"></div>
                </button>
                {/* Recents Square */}
                <button className="text-zinc-600 dark:text-zinc-400 p-1">
                  <div className="w-3.5 h-3.5 border-2 border-zinc-600 dark:border-zinc-400 rounded-[2px]"></div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
