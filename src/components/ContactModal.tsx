import React, { useState } from 'react';
import { X, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'contact' | 'portal';
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  mode = 'contact',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', accessCode: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl bg-gray-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {mode === 'contact' ? (
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Get in Touch</h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-6">
              Connect with our team at Dreamscape Designs in Kurunegala, Sri Lanka.
            </p>

            {/* Direct Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 text-xs text-gray-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Studio Address</strong>
                  <span>Dreamscape Designs, Kurunegala, Sri Lanka</span>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-semibold">Direct Phone</strong>
                  <a href="tel:+94779962051" className="hover:text-amber-300">+94 77 996 2051</a>
                </div>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1">Message</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your project or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                <p className="text-xs text-gray-300">We will respond within 24 business hours.</p>
                <button
                  onClick={() => { setSubmitted(false); onClose(); }}
                  className="px-6 py-2 rounded-full bg-white/10 text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">Client Portal Access</h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-6">
              Access live 3D BIM models, blueprints, and real-time site execution logs for active clients.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Client Email</label>
                <input
                  type="email"
                  required
                  placeholder="client@dreamscapedesigns.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Passcode / Access Key</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.accessCode}
                  onChange={(e) => setFormData({ ...formData, accessCode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all"
              >
                Login to Portal
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
