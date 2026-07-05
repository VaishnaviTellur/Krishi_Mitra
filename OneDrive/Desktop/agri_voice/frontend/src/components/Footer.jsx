import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-12 bg-white/60 border-t border-border py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>© {new Date().getFullYear()} Krishi Mitra — Built for modern farms.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary">Terms</a>
          <a href="#" className="hover:text-primary">Privacy</a>
          <a href="#" className="hover:text-primary">Support</a>
        </div>
      </div>
    </footer>
  );
}
