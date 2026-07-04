import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { 
  FolderGit2, Plus, Trash2, X, ExternalLink, Github, Code2, 
  Tag, AlertCircle, Sparkles, FolderKanban 
} from 'lucide-react';

interface ProjectShowcaseProps {
  projects: Project[];
  onAddProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onResetProjects: () => void;
  isAdmin: boolean;
}

export default function ProjectShowcase({ projects, onAddProject, onDeleteProject, onResetProjects, isAdmin }: ProjectShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Form states for creating a new project
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [category, setCategory] = useState<'Web Development' | 'Design' | 'Open Source' | 'AI Integration'>('Web Development');
  const [formError, setFormError] = useState('');

  const categories = ['All', 'Web Development', 'Design', 'Open Source', 'AI Integration'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) {
      setFormError('Please enter a valid title and description.');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const createdProject: Project = {
      id: `custom-project-${Date.now()}`,
      title: title.trim(),
      description: desc.trim(),
      tags: tagsArray.length > 0 ? tagsArray : ['React', 'Web Dev'],
      githubUrl: githubUrl.trim() || undefined,
      liveUrl: liveUrl.trim() || undefined,
      category: category,
      isUserAdded: true
    };

    onAddProject(createdProject);
    
    // Reset states
    setTitle('');
    setDesc('');
    setTagsInput('');
    setGithubUrl('');
    setLiveUrl('');
    setCategory('Web Development');
    setFormError('');
    setIsAddingProject(false);
  };

  return (
    <section id="projects" className="py-20 bg-zinc-950/40 border-t border-zinc-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Featured Software Works
            </h2>
            <div className="mt-2.5 h-1 w-12 bg-emerald-500 rounded-full" />
            <p className="mt-4 text-sm text-zinc-400 max-w-xl">
              Browse professional GitHub repositories and customized code crafts. Filter by category, inspect tech stacks, or provision a new card dynamically.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={onResetProjects}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
            >
              <span>Reset Projects</span>
            </button>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsAddingProject(!isAddingProject)}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Plus className="h-4 w-4" />
              <span>{isAddingProject ? 'Close Editor' : 'Publish Project'}</span>
            </motion.button>
          </div>
        </div>

        {/* Dynamic Project Editor Panel */}
        <AnimatePresence>
          {isAddingProject && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <FolderKanban className="h-5 w-5 text-emerald-400" />
                    <span>Publish A Project Card</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Specify repository metrics, stack components, and target links.</p>
                </div>
                <button 
                  onClick={() => setIsAddingProject(false)} 
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white bg-zinc-950 border border-zinc-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Title</label>
                    <input 
                      type="text"
                      required
                      placeholder="e.g. AI Content Synthesizer"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Project Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Design">Design</option>
                      <option value="Open Source">Open Source</option>
                      <option value="AI Integration">AI Integration</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">GitHub Repository Link</label>
                    <input 
                      type="url"
                      placeholder="https://github.com/RajababuMehta/repository-name"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Demo / Live URL (Optional)</label>
                    <input 
                      type="text"
                      placeholder="e.g. https://my-live-app.com"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Tech Stack Tags (Comma separated)</label>
                    <input 
                      type="text"
                      placeholder="React, TypeScript, Tailwind, Lucide, D3"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Detailed Description</label>
                    <textarea 
                      rows={3}
                      required
                      placeholder="Describe the challenges solved, user features, and system capabilities of the project..."
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                    />
                  </div>
                </div>

                {formError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/15 border border-red-500/20 p-3 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAddingProject(false)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="cursor-pointer rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-xs font-bold text-zinc-950 transition-all shadow-md"
                  >
                    Publish Project Card
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-900">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Code2 className="h-3.5 w-3.5" />
            <span>Project Tags:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-zinc-100 text-zinc-950 font-bold' 
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <FolderGit2 className="h-10 w-10 text-zinc-600 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-zinc-300">No project repository matches this tag</h4>
            <p className="text-xs text-zinc-500 mt-1">Try selecting another filter or publish a new card!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((proj, index) => (
              <motion.div
                layout
                key={proj.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between rounded-2xl border border-zinc-900 bg-zinc-900/15 p-6 hover:bg-zinc-900/30 hover:border-zinc-800 transition-all duration-300 shadow-md"
              >
                <div>
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono font-bold bg-zinc-950 border border-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {proj.category}
                    </span>

                    {/* Delete Icon */}
                    {(proj.isUserAdded || isAdmin) && (
                      <button
                        onClick={() => onDeleteProject(proj.id)}
                        className="cursor-pointer text-zinc-500 hover:text-red-400 p-1 rounded-lg bg-zinc-950/40 hover:bg-red-500/10 border border-zinc-900 hover:border-red-500/20 transition-all"
                        title="Delete project card"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                    <FolderGit2 className="h-4 w-4 text-emerald-400/80" />
                    <span>{proj.title}</span>
                  </h3>
                  
                  <p className="text-xs text-zinc-400 mt-2.5 leading-relaxed min-h-[72px]">
                    {proj.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5 mt-5">
                    {proj.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-zinc-400 bg-zinc-950/80 border border-zinc-900/60 px-2 py-0.5 rounded-md">
                        <Tag className="h-2 w-2 text-zinc-600" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-zinc-900">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Codebase</span>
                    </a>
                  )}

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors ml-auto"
                    >
                      <span>Launch App</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                  
                  {proj.isUserAdded && !proj.liveUrl && (
                    <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm ml-auto">USER</span>
                  )}
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
