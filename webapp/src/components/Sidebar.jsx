import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  Globe, 
  Terminal,
  ChevronRight,
  X
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
        : 'text-slate-500 hover:bg-primary-50 hover:text-primary-600'
    }`}
  >
    <div className={`p-1.5 rounded-lg transition-colors ${active ? 'bg-primary-500' : 'bg-slate-100 group-hover:bg-primary-100'}`}>
      <Icon size={18} />
    </div>
    <span className="font-semibold text-sm tracking-tight">{label}</span>
    {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
  </button>
);

const Sidebar = ({ activeItem, onNavigate, isOpen, onClose }) => {
  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'Research', icon: Terminal },
    { label: 'Search', icon: Search },
    { label: 'Scrape', icon: Globe },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar Content */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 transition-all duration-500 ease-[cubic-bezier(0.4, 0, 0.2, 1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 flex flex-col h-screen overflow-hidden`}
      >
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-200 group transition-transform hover:scale-105 active:scale-95">
              <Globe className="text-white animate-pulse-slow" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-slate-800 tracking-tighter leading-none">AI CRAWLER</span>
              <span className="text-[10px] font-bold text-primary-500 tracking-[0.2em] mt-1 uppercase">Advanced Agent</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-6 py-4 space-y-2.5 overflow-y-auto custom-scrollbar">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Main Menu</div>
          {navItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              active={activeItem === item.label}
              onClick={() => {
                onNavigate(item.label);
                if (window.innerWidth < 1024) onClose();
              }}
            />
          ))}
        </nav>

        <div className="p-6 bg-slate-50/50 m-6 rounded-3xl border border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-700">System Status</span>
              <span className="text-[10px] text-emerald-600 font-medium">All systems online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
