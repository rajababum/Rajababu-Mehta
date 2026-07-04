import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Facebook, Mail, Menu, X, Code2 } from 'lucide-react';

interface NavbarProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  messageCount: number;
}

export default function Navbar({ isAdmin, setIsAdmin, messageCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header id="nav-header" className="sticky top-0 z-50 w-full border-b border-zinc-900/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand / Logo */}
        <motion.a 
          href="#"
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 text-white font-display text-lg font-bold tracking-tight"
        >
          <Code2 className="h-5 w-5 text-emerald-400" />
          <span>Rajababu Mehta</span>
        </motion.a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-4">
          <motion.a
            href="https://github.com/RajababuMehta"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            title="GitHub Profile"
          >
            <Github className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/share/1BuKbiAhrC/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            title="Facebook Profile"
          >
            <Facebook className="h-4 w-4" />
          </motion.a>
          <motion.a
            href="mailto:rajababum426@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-zinc-900 p-2 text-zinc-400 hover:text-white transition-colors border border-zinc-800"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </motion.a>

          {/* Admin Toggle */}
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`cursor-pointer px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 uppercase ${
              isAdmin 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 shadow-[0_0_12px_-3px_rgba(16,185,129,0.2)]' 
                : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
            }`}
          >
            {isAdmin ? 'Admin On' : 'Admin'}
            {messageCount > 0 && (
              <span className="ml-1.5 inline-flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`cursor-pointer px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase transition-all ${
              isAdmin 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
            }`}
          >
            {isAdmin ? 'Admin On' : 'Admin'}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-400 hover:text-white border border-zinc-900 rounded-lg bg-zinc-900/40"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zinc-900 bg-zinc-950/95 backdrop-blur-lg px-4 py-4"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-base font-medium text-zinc-300 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="flex items-center gap-4 pt-4 border-t border-zinc-900">
                <a
                  href="https://github.com/RajababuMehta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Github className="h-4 w-4" /> Github
                </a>
                <a
                  href="https://www.facebook.com/share/1BuKbiAhrC/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Facebook className="h-4 w-4" /> Facebook
                </a>
                <a
                  href="mailto:rajababum426@gmail.com"
                  className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
