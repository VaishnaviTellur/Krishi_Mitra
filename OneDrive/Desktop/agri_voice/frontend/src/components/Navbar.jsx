import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/60 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-white font-bold">JD</div>
              <span className="font-semibold text-lg text-text">Krishi Mitra</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-4">
            <Link to="/dashboard" className="text-sm text-text hover:text-primary">Dashboard</Link>
            <Link to="/ask-ai" className="text-sm text-text hover:text-primary">AI Assistant</Link>
            <Link to="/ask-history" className="text-sm text-text hover:text-primary">AI History</Link>
            <Link to="/weather" className="text-sm text-text hover:text-primary">Weather</Link>
            <Link to="/crop-health" className="text-sm text-text hover:text-primary">Crop Health</Link>
            <Link to="/market" className="text-sm text-text hover:text-primary">Market Prices</Link>
            <Link to="/schemes" className="text-sm text-text hover:text-primary">Government Schemes</Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <button aria-label="notifications" className="p-2 rounded-lg hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <Link to="/profile" className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=placeholder" alt="User avatar" className="w-full h-full object-cover" />
                </div>
                <span className="hidden sm:block text-sm text-text">Rajesh</span>
              </Link>
            </div>

            <button className="md:hidden p-2 rounded-lg" onClick={() => setOpen(!open)} aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-2 bg-white border border-border rounded-lg shadow p-4">
            <div className="flex flex-col gap-3">
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-text">Dashboard</Link>
              <Link to="/ask-ai" onClick={() => setOpen(false)} className="text-text">AI Assistant</Link>
              <Link to="/ask-history" onClick={() => setOpen(false)} className="text-text">AI History</Link>
              <Link to="/weather" onClick={() => setOpen(false)} className="text-text">Weather</Link>
              <Link to="/crop-health" onClick={() => setOpen(false)} className="text-text">Crop Health</Link>
              <Link to="/market" onClick={() => setOpen(false)} className="text-text">Market Prices</Link>
              <Link to="/schemes" onClick={() => setOpen(false)} className="text-text">Government Schemes</Link>
              <Link to="/profile" onClick={() => setOpen(false)} className="text-text">Profile</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
