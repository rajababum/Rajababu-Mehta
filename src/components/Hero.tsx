import React from 'react';
import { motion } from 'motion/react';
import { Facebook, Mail, ArrowRight, Compass, Heart } from 'lucide-react';

export default function Hero() {
  const handleScrollToGallery = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const gallerySection = document.querySelector('#gallery');
    if (gallerySection) {
      gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="relative overflow-hidden bg-zinc-950 py-16 md:py-28">
      {/* Abstract Background Accents */}
      <div className="absolute top-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Hero Content */}
          <div className="flex flex-col space-y-6 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 backdrop-blur-sm w-fit"
            >
              <Compass className="h-3.5 w-3.5 animate-spin-slow" />
              <span>Available for Collaborative Initiatives</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
              >
                Crafting Digital <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
                  Experiences & Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-xl text-base text-zinc-400 sm:text-lg leading-relaxed"
              >
                Hi, I'm <strong className="text-white font-medium">Rajababu Mehta</strong>. I design and build high-performance web applications with clean, production-ready code. Focused on seamless client-side interfaces and modular front-end architecture.
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-2"
            >
              <button
                onClick={handleScrollToGallery}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-zinc-950 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-98"
              >
                <span>View Portfolio & Gallery</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={handleScrollToContact}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-6 py-3.5 text-sm font-semibold text-zinc-200 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 transition-all backdrop-blur-sm active:scale-98"
              >
                <span>Get In Touch</span>
                <Mail className="h-4 w-4" />
              </button>
            </motion.div>

            {/* Quick Badges / Core Pillars */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-zinc-900"
            >
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Heart className="h-3.5 w-3.5 text-emerald-500/80" />
                <span>Modern Clean UI/UX</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Heart className="h-3.5 w-3.5 text-teal-500/80" />
                <span>Responsive Design</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <Heart className="h-3.5 w-3.5 text-emerald-500/80" />
                <span>TypeScript Dev</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Portrait */}
          <div className="lg:col-span-5 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-72 h-[380px] sm:w-80 sm:h-[440px] md:w-88 md:h-[480px] lg:w-full lg:h-[500px]"
            >
              {/* Glowing Background Rings */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 opacity-20 blur-xl animate-pulse" />
              
              {/* Picture Frame */}
              <div className="absolute inset-0 rounded-2xl border border-zinc-800 bg-zinc-900 p-2 shadow-2xl">
                <div className="relative h-full w-full overflow-hidden rounded-xl bg-zinc-950">
                  <img
                    src="/input_file_1.png"
                    alt="Rajababu Mehta Portrait"
                    className="h-full w-full object-cover object-top hover:scale-102 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle Floating Info Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-white/10 bg-zinc-950/80 p-4.5 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-emerald-400 font-semibold tracking-wider uppercase">Lead Architect</p>
                        <h4 className="font-display text-lg font-bold text-white mt-0.5">Rajababu Mehta</h4>
                        <p className="text-xs text-zinc-400 mt-1">Sylvan Workspace Studio</p>
                      </div>
                      <a 
                        href="https://www.facebook.com/share/1BuKbiAhrC/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-emerald-500 hover:bg-emerald-400 p-2 text-zinc-950 transition-colors"
                        title="Connect on Facebook"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Tech Accents */}
              <div className="absolute top-4 -right-4 bg-zinc-950 border border-zinc-800 rounded-lg p-3 shadow-lg hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-zinc-400">RAJABABU_MEHTA_V1.0</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
