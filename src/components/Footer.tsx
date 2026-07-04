import React from 'react';
import { Github, Facebook, Mail, ArrowUp, Code2 } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Brand details */}
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-emerald-400" />
            <span className="font-display font-bold text-white text-base">Rajababu Mehta</span>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-5">
            <a 
              href="https://github.com/RajababuMehta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-colors"
              title="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="https://www.facebook.com/share/1BuKbiAhrC/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-emerald-400 transition-colors"
              title="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a 
              href="mailto:rajababum426@gmail.com" 
              className="text-zinc-500 hover:text-white transition-colors"
              title="Email Direct"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Lower row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} Rajababu Mehta. All rights preserved. Built with Vite, React & Tailwind CSS.
          </p>

          <button
            onClick={handleScrollToTop}
            className="cursor-pointer group inline-flex items-center gap-1.5 rounded-lg border border-zinc-900 hover:border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-all active:scale-95"
            title="Jump to Top"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3 w-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
