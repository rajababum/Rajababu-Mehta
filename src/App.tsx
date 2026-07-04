import React, { useState, useEffect } from 'react';
import { Photo, Project, Message } from './types';
import { INITIAL_PHOTOS, INITIAL_PROJECTS } from './data';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PhotoGallery from './components/PhotoGallery';
import ProjectShowcase from './components/ProjectShowcase';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  // States with LocalStorage backup
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load state on mount
  useEffect(() => {
    try {
      const storedPhotos = localStorage.getItem('rajababu_portfolio_photos');
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      } else {
        setPhotos(INITIAL_PHOTOS);
        localStorage.setItem('rajababu_portfolio_photos', JSON.stringify(INITIAL_PHOTOS));
      }

      const storedProjects = localStorage.getItem('rajababu_portfolio_projects');
      if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
      } else {
        setProjects(INITIAL_PROJECTS);
        localStorage.setItem('rajababu_portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
      }

      const storedMessages = localStorage.getItem('rajababu_portfolio_messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error('LocalStorage failed to resolve safely:', error);
      // Fallback
      setPhotos(INITIAL_PHOTOS);
      setProjects(INITIAL_PROJECTS);
      setMessages([]);
    }
  }, []);

  // Sync methods
  const handleAddPhoto = (newPhoto: Photo) => {
    const updated = [newPhoto, ...photos];
    setPhotos(updated);
    localStorage.setItem('rajababu_portfolio_photos', JSON.stringify(updated));
  };

  const handleDeletePhoto = (id: string) => {
    const updated = photos.filter(p => p.id !== id);
    setPhotos(updated);
    localStorage.setItem('rajababu_portfolio_photos', JSON.stringify(updated));
  };

  const handleResetPhotos = () => {
    setPhotos(INITIAL_PHOTOS);
    localStorage.setItem('rajababu_portfolio_photos', JSON.stringify(INITIAL_PHOTOS));
  };

  const handleAddProject = (newProject: Project) => {
    const updated = [newProject, ...projects];
    setProjects(updated);
    localStorage.setItem('rajababu_portfolio_projects', JSON.stringify(updated));
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    localStorage.setItem('rajababu_portfolio_projects', JSON.stringify(updated));
  };

  const handleResetProjects = () => {
    setProjects(INITIAL_PROJECTS);
    localStorage.setItem('rajababu_portfolio_projects', JSON.stringify(INITIAL_PROJECTS));
  };

  const handleSendMessage = (msg: Message) => {
    const updated = [msg, ...messages];
    setMessages(updated);
    localStorage.setItem('rajababu_portfolio_messages', JSON.stringify(updated));
  };

  const handleDeleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('rajababu_portfolio_messages', JSON.stringify(updated));
  };

  const handleClearMessages = () => {
    setMessages([]);
    localStorage.removeItem('rajababu_portfolio_messages');
  };

  return (
    <div id="app-root" className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* Dynamic Sticky Header */}
      <Navbar 
        isAdmin={isAdmin} 
        setIsAdmin={setIsAdmin} 
        messageCount={messages.length} 
      />

      <main className="relative">
        
        {/* Decorative background grid line accents */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

        {/* Hero Presentation (Greeting card & Portrait) */}
        <Hero />

        {/* About Me Details (Bio, quick facts & skills grid) */}
        <About />

        {/* Visual Narrative Gallery (Original photos & Drag & Drop local Uploader) */}
        <PhotoGallery 
          photos={photos} 
          onAddPhoto={handleAddPhoto} 
          onDeletePhoto={handleDeletePhoto} 
          onResetPhotos={handleResetPhotos}
          isAdmin={isAdmin}
        />

        {/* Code Projects grid & creation controls */}
        <ProjectShowcase 
          projects={projects}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          onResetProjects={handleResetProjects}
          isAdmin={isAdmin}
        />

        {/* Interactive contact form & Received Inbound inbox log console */}
        <Contact 
          messages={messages}
          onSendMessage={handleSendMessage}
          onDeleteMessage={handleDeleteMessage}
          onClearMessages={handleClearMessages}
          isAdmin={isAdmin}
        />

      </main>

      {/* Styled Brand Footer */}
      <Footer />

    </div>
  );
}
