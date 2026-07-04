import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Photo } from '../types';
import { 
  Upload, Image as ImageIcon, Plus, Trash2, X, Filter, 
  Calendar, MapPin, Eye, AlertCircle, RefreshCw 
} from 'lucide-react';

interface PhotoGalleryProps {
  photos: Photo[];
  onAddPhoto: (photo: Photo) => void;
  onDeletePhoto: (id: string) => void;
  onResetPhotos: () => void;
  isAdmin: boolean;
}

export default function PhotoGallery({ photos, onAddPhoto, onDeletePhoto, onResetPhotos, isAdmin }: PhotoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  
  // Form states for uploading a new photo
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'Portrait' | 'Nature' | 'Travel' | 'Other'>('Portrait');
  const [newFileUrl, setNewFileUrl] = useState<string>('');
  const [newDate, setNewDate] = useState('July 2026');
  const [formError, setFormError] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = ['All', 'Portrait', 'Nature', 'Travel', 'Other'];

  const filteredPhotos = selectedCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setFormError('File must be a valid image format.');
      return;
    }
    
    // Convert to object URL or base64
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setNewFileUrl(event.target.result as string);
        setFormError('');
      }
    };
    reader.onerror = () => {
      setFormError('Failed to process image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAddPhotoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newFileUrl) {
      setFormError('Please upload or drag an image first.');
      return;
    }
    if (!newTitle.trim()) {
      setFormError('Title is required.');
      return;
    }

    const createdPhoto: Photo = {
      id: `custom-photo-${Date.now()}`,
      url: newFileUrl,
      title: newTitle.trim(),
      description: newDesc.trim() || 'A custom memory added directly by Rajababu.',
      date: newDate || 'July 2026',
      category: newCategory,
      isUserAdded: true
    };

    onAddPhoto(createdPhoto);
    
    // Reset Form
    setNewTitle('');
    setNewDesc('');
    setNewCategory('Portrait');
    setNewFileUrl('');
    setFormError('');
    setIsUploading(false);
  };

  return (
    <section id="gallery" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Visual Narrative Gallery
            </h2>
            <div className="mt-2.5 h-1 w-12 bg-emerald-500 rounded-full" />
            <p className="mt-4 text-sm text-zinc-400 max-w-xl">
              A curated space containing both pre-loaded professional captures and interactive additions. Add, organize, and inspect each visual piece.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            {/* Reset Defaults button */}
            <button
              onClick={onResetPhotos}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900/40 hover:bg-zinc-900 px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
              title="Reset to original photos"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Gallery</span>
            </button>

            {/* Toggle Uploader Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsUploading(!isUploading)}
              className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-zinc-950 hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <Plus className="h-4 w-4" />
              <span>{isUploading ? 'Close Uploader' : 'Add New Photo'}</span>
            </motion.button>
          </div>
        </div>

        {/* Dynamic Photo Uploader Form */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <Upload className="h-5 w-5 text-emerald-400" />
                    <span>Upload A Photo</span>
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">Files are converted and preserved safely within local storage.</p>
                </div>
                <button 
                  onClick={() => setIsUploading(false)} 
                  className="p-1.5 rounded-lg text-zinc-500 hover:text-white bg-zinc-950 border border-zinc-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddPhotoSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Drag and Drop Zone */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center">
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={onButtonClick}
                    className={`relative w-full aspect-square md:aspect-auto md:h-72 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer ${
                      dragActive 
                        ? 'border-emerald-400 bg-emerald-500/10' 
                        : newFileUrl 
                          ? 'border-zinc-800 bg-zinc-950/40' 
                          : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/20'
                    }`}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden" 
                    />

                    {newFileUrl ? (
                      <div className="relative h-full w-full flex items-center justify-center group overflow-hidden rounded-lg">
                        <img 
                          src={newFileUrl} 
                          alt="Pre-upload source" 
                          className="h-full max-h-60 object-contain rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                          <p className="text-xs font-semibold text-white bg-zinc-950/80 px-3 py-1.5 rounded-lg border border-zinc-800">Change Photo</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <div className="h-12 w-12 rounded-full bg-zinc-950 flex items-center justify-center border border-zinc-800 text-zinc-400 mb-4 shadow-sm">
                          <ImageIcon className="h-5 w-5 text-emerald-400" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">Drag & drop photo here</p>
                        <p className="text-xs text-zinc-500 mt-1">or <span className="text-emerald-400 font-medium">browse local files</span></p>
                        <p className="text-[10px] text-zinc-600 mt-4">JPG, PNG, WEBP are supported</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Info Input Block */}
                <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Photo Title</label>
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Hiking Adventure"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</label>
                      <select 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      >
                        <option value="Portrait">Portrait</option>
                        <option value="Nature">Nature</option>
                        <option value="Travel">Travel</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date Captured</label>
                      <input 
                        type="text"
                        placeholder="e.g. July 2026"
                        value={newDate}
                        onChange={(e) => setNewDate(e.target.value)}
                        className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">System Status</label>
                      <div className="h-11 flex items-center px-4 bg-zinc-950 border border-zinc-900 rounded-xl">
                        <span className="text-[11px] font-mono text-zinc-500">LOCAL_STORE_READY</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Description / Story Behind Photo</label>
                    <textarea 
                      rows={3}
                      placeholder="Write a brief backstory about what makes this photo special..."
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 px-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                    />
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
                      onClick={() => setIsUploading(false)}
                      className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="cursor-pointer rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-xs font-bold text-zinc-950 transition-all shadow-md"
                    >
                      Publish to Gallery
                    </button>
                  </div>

                </div>

              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-zinc-900">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            <span>Filter Category:</span>
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

        {/* Photo Grid */}
        {filteredPhotos.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/10">
            <ImageIcon className="h-10 w-10 text-zinc-600 mx-auto mb-4" />
            <h4 className="text-base font-semibold text-zinc-300">No photos match your filter</h4>
            <p className="text-xs text-zinc-500 mt-1">Try switching categories or upload a custom photo to this category!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl border border-zinc-900 bg-zinc-900/20 p-2 shadow-lg hover:border-zinc-800 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Photo container */}
                <div className="relative aspect-[3/4] sm:aspect-square md:aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-950">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="h-full w-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category chip on image */}
                  <span className="absolute top-3 left-3 bg-zinc-950/80 border border-white/10 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    {photo.category}
                  </span>

                  {/* Photo Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <button
                      onClick={() => setSelectedPhoto(photo)}
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/90 hover:bg-white text-zinc-950 py-2.5 text-xs font-bold transition-all shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Inspect Photo</span>
                    </button>
                  </div>

                  {/* Delete Button (Visible if UserAdded or Admin mode) */}
                  {(photo.isUserAdded || isAdmin) && (
                    <button
                      onClick={() => onDeletePhoto(photo.id)}
                      className="absolute top-3 right-3 rounded-xl bg-red-500/95 hover:bg-red-400 text-white p-2 transition-all hover:scale-105 shadow-md border border-red-600/20 cursor-pointer"
                      title="Delete photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Meta details below */}
                <div className="px-3 pt-4 pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-white truncate">{photo.title}</h3>
                    {photo.isUserAdded && (
                      <span className="text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-sm">USER</span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2 min-h-[32px]">{photo.description}</p>
                  
                  <div className="flex items-center gap-4 text-[10px] text-zinc-500 mt-3.5 pt-3.5 border-t border-zinc-900">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-zinc-600" />
                      <span>{photo.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-zinc-600" />
                      <span>{photo.category === 'Travel' ? 'Landmark' : 'Outdoor Set'}</span>
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>
        )}

      </div>

      {/* Detail Inspector Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 p-4 sm:p-6 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative max-w-4xl w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-3 sm:p-4 shadow-2xl flex flex-col md:flex-row gap-6 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-zinc-950/80 hover:bg-zinc-950 border border-white/10 p-2 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Photo Display */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto md:h-[480px] rounded-xl bg-zinc-950 overflow-hidden border border-zinc-800">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Metadata Panel */}
              <div className="w-full md:w-1/2 flex flex-col justify-between py-2 sm:py-4 px-1 sm:px-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {selectedPhoto.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">{selectedPhoto.date}</span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-white">{selectedPhoto.title}</h3>
                  <div className="h-0.5 w-8 bg-emerald-500 rounded-full" />
                  
                  <p className="text-sm text-zinc-400 leading-relaxed pt-2">
                    {selectedPhoto.description}
                  </p>

                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-950/60 space-y-3.5 pt-4">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Picture Verification</h4>
                    
                    <div className="grid grid-cols-2 gap-y-3 text-[11px]">
                      <div>
                        <p className="text-zinc-500">File Reference</p>
                        <p className="text-zinc-300 font-mono mt-0.5 truncate">{selectedPhoto.url.substring(0, 30)}...</p>
                      </div>
                      <div>
                        <p className="text-zinc-500">Storage Domain</p>
                        <p className="text-zinc-300 font-mono mt-0.5">{selectedPhoto.isUserAdded ? 'BROWSER_LOCAL' : 'WORKSPACE_ASSETS'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-6 border-t border-zinc-800/60 mt-6">
                  {selectedPhoto.isUserAdded && (
                    <button
                      onClick={() => {
                        onDeletePhoto(selectedPhoto.id);
                        setSelectedPhoto(null);
                      }}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 px-4 py-2.5 text-xs font-bold text-red-400 transition-all w-full sm:w-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete File</span>
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-2.5 text-xs font-bold transition-all ml-auto w-full sm:w-auto"
                  >
                    <span>Close Inspector</span>
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
