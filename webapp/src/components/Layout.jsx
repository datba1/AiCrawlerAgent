import React, { useState } from 'react';
import { Search, Menu, X, Bell } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = ({ children, activeItem, onNavigate }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      <Sidebar 
        activeItem={activeItem} 
        onNavigate={onNavigate} 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-3 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                className="p-2 mr-4 text-slate-600 hover:bg-slate-100 rounded-lg lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <span className="text-lg font-bold text-slate-800">AI Crawler</span>
            </div>

            <div className="flex-1 max-w-sm ml-4 hidden lg:block">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary-500 transition-colors" size={16} />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="w-full bg-slate-100 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all duration-200"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 md:space-x-4">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
              <button className="flex items-center space-x-3 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                  JS
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-800">John Smith</p>
                  <p className="text-xs text-slate-500">Administrator</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
