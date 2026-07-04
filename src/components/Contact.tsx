import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Message } from '../types';
import { 
  Send, Mail, User, MessageSquare, ShieldCheck, Trash2, 
  CheckCircle2, Clock, Inbox, AlertCircle, Facebook, Github 
} from 'lucide-react';

interface ContactProps {
  messages: Message[];
  onSendMessage: (msg: Message) => void;
  onDeleteMessage: (id: string) => void;
  onClearMessages: () => void;
  isAdmin: boolean;
}

export default function Contact({ messages, onSendMessage, onDeleteMessage, onClearMessages, isAdmin }: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !body.trim()) {
      setError('Please complete all form fields.');
      return;
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: body.trim(),
      date: new Date().toLocaleString()
    };

    onSendMessage(newMessage);
    
    // Clear inputs
    setName('');
    setEmail('');
    setBody('');
    setShowSuccess(true);
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <section id="contact" className="py-20 bg-zinc-950 border-t border-zinc-900 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Let's Collaborate
          </h2>
          <div className="mt-4 h-1 w-12 bg-emerald-500 mx-auto rounded-full" />
          <p className="mt-4 text-base text-zinc-400">
            Submit an inquiry, offer a project proposal, or send a friendly greetings check. Your message will be logged immediately.
          </p>
        </div>

        {/* Form Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Quick contact / instructions info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/30 p-6 md:p-8 space-y-6">
              <h3 className="font-display text-lg font-bold text-white">Direct Channels</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                If you prefer to bypass forms, feel free to write directly using any of these social channels. I usually respond within 24 hours.
              </p>

              <div className="space-y-4 pt-2">
                {/* Email Direct link */}
                <a 
                  href="mailto:rajababum426@gmail.com" 
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Direct Email Address</p>
                    <p className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">rajababum426@gmail.com</p>
                  </div>
                </a>

                {/* Facebook profile link */}
                <a 
                  href="https://www.facebook.com/share/1BuKbiAhrC/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                    <Facebook className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">Facebook Social Connect</p>
                    <p className="text-sm text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">Rajababu Mehta</p>
                  </div>
                </a>

                {/* GitHub link */}
                <a 
                  href="https://github.com/RajababuMehta" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-4 p-4 rounded-xl border border-zinc-900 bg-zinc-950 hover:border-zinc-800 transition-all group"
                >
                  <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">GitHub Profile</p>
                    <p className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors">RajababuMehta</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Helper Badge */}
            <div className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/40 text-xs text-zinc-500 flex gap-2.5 items-start">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Feel free to toggle <strong>Admin mode</strong> in the header navigation menu. It grants visibility into the visitor inbox to review your submissions in real time!</span>
            </div>
          </div>

          {/* Form and Admin Console */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Primary Contact Form */}
            <div className="rounded-2xl border border-zinc-900 bg-zinc-900/15 p-6 md:p-8 relative overflow-hidden">
              <h3 className="font-display text-xl font-bold text-white mb-6">Send Message</h3>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                      <input 
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-4 w-4 text-zinc-600" />
                      <input 
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Message Content</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-zinc-600" />
                    <textarea 
                      rows={4}
                      required
                      placeholder="Type your project description or inquiry detail..."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="w-full bg-zinc-950 text-white rounded-xl border border-zinc-800 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500/50 resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-xs text-red-400">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] font-mono text-zinc-600 uppercase">SSL_ENCRYPTED_SEND</span>
                  <button 
                    type="submit"
                    className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 px-6 py-3.5 text-xs font-bold text-zinc-950 transition-all shadow-md shadow-emerald-500/10 hover:scale-101"
                  >
                    <span>Transmit Message</span>
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>

              {/* Submission success feedback */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-zinc-950/95 flex flex-col items-center justify-center text-center p-6"
                  >
                    <motion.div
                      initial={{ scale: 0.9, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      className="h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 shadow-inner"
                    >
                      <CheckCircle2 className="h-6 w-6" />
                    </motion.div>
                    <h4 className="font-display text-xl font-bold text-white">Transmission Successful</h4>
                    <p className="text-xs text-zinc-400 mt-2 max-w-sm">
                      Your message has been received! Turn on <strong>Admin Mode</strong> in the header to view it in the local database.
                    </p>
                    <button 
                      onClick={() => setShowSuccess(false)}
                      className="mt-6 text-xs text-zinc-500 hover:text-white border border-zinc-800 px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 transition-all"
                    >
                      Close Confirmation
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Admin received messages log */}
            <AnimatePresence>
              {isAdmin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800/60">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      <div>
                        <h4 className="font-display text-sm font-bold text-white">Inbound Visitor Inbox</h4>
                        <p className="text-[10px] text-zinc-500 mt-0.5">Admin-only localStorage console logs</p>
                      </div>
                    </div>

                    {messages.length > 0 && (
                      <button
                        onClick={onClearMessages}
                        className="cursor-pointer text-[10px] font-semibold text-zinc-500 hover:text-red-400 flex items-center gap-1 bg-zinc-950 border border-zinc-800 px-2.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-3 w-3" />
                        <span>Clear All</span>
                      </button>
                    )}
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-950/40 rounded-xl border border-dashed border-zinc-800">
                      <Inbox className="h-8 w-8 text-zinc-700 mx-auto mb-3" />
                      <p className="text-xs font-semibold text-zinc-400">No message transmissions found</p>
                      <p className="text-[10px] text-zinc-600 mt-1">Submit the contact form above to test the database.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                      {messages.map((msg) => (
                        <div key={msg.id} className="p-4 rounded-xl border border-zinc-800 bg-zinc-950 text-xs relative group">
                          
                          {/* Metadata */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-zinc-900">
                            <div>
                              <p className="font-bold text-white flex items-center gap-1.5 text-xs">
                                <User className="h-3 w-3 text-emerald-400" />
                                <span>{msg.name}</span>
                              </p>
                              <p className="text-zinc-500 font-mono mt-0.5">{msg.email}</p>
                            </div>
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1 bg-zinc-900 border border-zinc-900/40 px-2 py-0.5 rounded-md font-mono">
                              <Clock className="h-2.5 w-2.5" />
                              <span>{msg.date}</span>
                            </span>
                          </div>

                          {/* Message Body */}
                          <p className="text-zinc-300 mt-3.5 leading-relaxed bg-zinc-900/20 p-3 rounded-lg border border-zinc-900">
                            {msg.message}
                          </p>

                          {/* Delete Item button */}
                          <button
                            onClick={() => onDeleteMessage(msg.id)}
                            className="cursor-pointer absolute top-3 right-3 text-zinc-600 hover:text-red-400 p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 hover:bg-red-500/10 border border-zinc-800/40"
                            title="Remove message"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>

                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
