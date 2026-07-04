import { motion } from 'motion/react';
import { Mail, Facebook, Github, Cpu, Globe, Paintbrush, Award } from 'lucide-react';

export default function About() {
  const coreValues = [
    {
      icon: Cpu,
      title: 'Modern Core Tech',
      description: 'Building high-performance client applications using React 19, TypeScript, and modern state paradigms.'
    },
    {
      icon: Paintbrush,
      title: 'Intuitive Visuals',
      description: 'Prioritizing crisp layouts, optimal spacing, high-contrast readable typography, and engaging micro-interactions.'
    },
    {
      icon: Globe,
      title: 'Global Connectivity',
      description: 'Designing highly accessible user spaces with responsive flows for various viewports and device configurations.'
    }
  ];

  const skills = [
    { name: 'React (Functional Hooks)', level: 'Advanced' },
    { name: 'TypeScript', level: 'Intermediate' },
    { name: 'Tailwind CSS (v4)', level: 'Advanced' },
    { name: 'JavaScript ES6+', level: 'Advanced' },
    { name: 'HTML5 & Semantics', level: 'Expert' },
    { name: 'GitHub & Version Control', level: 'Advanced' },
    { name: 'Responsive Mobile Layouts', level: 'Expert' },
    { name: 'Local Persistence State', level: 'Intermediate' }
  ];

  return (
    <section id="about" className="py-20 border-t border-zinc-900 bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Who is Rajababu Mehta?
          </h2>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full" />
          <p className="mt-4 text-base text-zinc-400">
            A developer dedicated to building premium interfaces, creating rich visual portfolios, and engaging in collaborative open-source environments.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Main Info Block */}
          <div className="lg:col-span-7 space-y-8">
            <div className="prose prose-invert max-w-none">
              <h3 className="font-display text-xl font-bold text-white mb-4">A Driven Front-End Builder</h3>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                I am a front-end enthusiast with a passion for designing and developing clean web layouts. I believe in software that solves real user problems and looks exceptional while doing so. My design philosophy is rooted in architectural honesty—keeping layouts simple, visually stunning, and highly intuitive.
              </p>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base mt-4">
                I love exploring outdoor spaces and wildlife landmarks, an appreciation for natural serenity that directly inspires my calm, dark UI aesthetics—combining organic green tones with structured modern components.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {coreValues.map((val) => {
                const Icon = val.icon;
                return (
                  <div key={val.title} className="rounded-xl border border-zinc-900 bg-zinc-900/40 p-5 hover:border-zinc-800 transition-all duration-300">
                    <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="font-display text-sm font-bold text-white mb-2">{val.title}</h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">{val.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Direct Connect Buttons */}
            <div className="p-6 rounded-2xl border border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h4 className="text-sm font-bold text-white">Let's Establish a Connection</h4>
                <p className="text-xs text-zinc-500 mt-1">Direct contact info for partnerships or collaborative works.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="mailto:rajababum426@gmail.com"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-all"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Rajababu</span>
                </a>
                <a 
                  href="https://www.facebook.com/share/1BuKbiAhrC/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-all"
                >
                  <Facebook className="h-3.5 w-3.5" />
                  <span>Facebook Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Side Panel: Skills & Background */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Profile Snapshot Card */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 space-y-4">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                <span>Profile At A Glance</span>
              </h3>
              
              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Legal Name</span>
                  <span className="text-zinc-300 font-medium">Rajababu Mehta</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Official Email</span>
                  <a href="mailto:rajababum426@gmail.com" className="text-emerald-400 font-medium hover:underline">rajababum426@gmail.com</a>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-900">
                  <span className="text-zinc-500">Social Hub</span>
                  <a href="https://www.facebook.com/share/1BuKbiAhrC/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-medium hover:underline">Facebook Link</a>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-zinc-500">Preferred Stack</span>
                  <span className="text-emerald-400 font-mono text-[11px] font-bold">VITE_REACT_TS_TW</span>
                </div>
              </div>
            </div>

            {/* Skill bars */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 space-y-6">
              <h3 className="font-display text-lg font-bold text-white">Technical Core Competence</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950">
                    <p className="text-xs font-semibold text-zinc-300">{skill.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="h-1.5 w-2/3 bg-zinc-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full" 
                          style={{ width: skill.level === 'Expert' ? '95%' : skill.level === 'Advanced' ? '85%' : '65%' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">{skill.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
