import { useState } from "react";

interface TerminalHeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export function TerminalHeader({
  isDarkMode,
  toggleTheme,
}: TerminalHeaderProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  const handleClose = () => {
    setShowCloseConfirm(true);
    setTimeout(() => {
      setShowCloseConfirm(false);
    }, 2000);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    setTimeout(() => {
      setIsMinimized(false);
    }, 1000);
  };

  const handleMaximize = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-sm border-b border-[#007acc]/20 dark:border-[#39FF14]/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer group relative"
              title="Close"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-0.5 bg-red-900 transform rotate-45"></div>
                <div className="w-1.5 h-0.5 bg-red-900 transform -rotate-45 absolute"></div>
              </div>
            </button>
            <button
              onClick={handleMinimize}
              className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors cursor-pointer group relative"
              title="Minimize"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-0.5 bg-yellow-900"></div>
              </div>
            </button>
            <button
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer group relative"
              title="Maximize"
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-1.5 h-1.5 border border-green-900 rounded-sm"></div>
              </div>
            </button>
            <span className="ml-4 text-sm text-[#007acc] dark:text-[#39FF14]">
              Hajinhee@portfolio:~$
            </span>
          </div>

          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-[#007acc]/10 dark:bg-[#39FF14]/10 hover:bg-[#007acc]/20 dark:hover:bg-[#39FF14]/20 active:animate-scale-in transition-all whitespace-nowrap cursor-pointer"
          >
            <i
              className={`${
                isDarkMode ? "ri-sun-line" : "ri-moon-line"
              } w-4 h-4 flex items-center justify-center`}
            ></i>
            <span className="text-sm">{isDarkMode ? "Light" : "Dark"}</span>
          </button>
        </div>
      </header>

      {/* Close confirmation tooltip */}
      {showCloseConfirm && (
        <div className="fixed top-16 left-6 z-50 bg-red-500 text-white px-3 py-2 rounded text-sm animate-in slide-in-from-left-4 duration-200">
          포트폴리오를 종료할 수 없습니다😊
        </div>
      )}

      {/* Minimize animation overlay */}
      {isMinimized && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="w-full h-full bg-white dark:bg-[#1e1e1e] animate-minimize"></div>
        </div>
      )}
    </>
  );
}
