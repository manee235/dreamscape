import React, { useState } from 'react';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface ScheduleVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'In-Person (Kurunegala Studio)',
    date: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-gray-900 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Private Consultation</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
              Schedule A Private Visit
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mb-6">
              Experience Dreamscape Designs in person at our studio in Kurunegala, Sri Lanka or via virtual 3D consultation.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+94 77 996 2051"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-300 font-medium mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1.5">Consultation Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="In-Person (Kurunegala Studio)" className="bg-gray-900">
                    In-Person Studio Tour (Kurunegala, Sri Lanka)
                  </option>
                  <option value="Virtual 3D Consultation" className="bg-gray-900">
                    Virtual Interactive 3D Session
                  </option>
                  <option value="On-Site Architectural Review" className="bg-gray-900">
                    On-Site Land & Elevation Assessment
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1.5">Project Notes & Vision</label>
                <textarea
                  rows={3}
                  placeholder="Share details about your desired location, site size, or design preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-gray-950 font-bold text-sm hover:bg-gray-100 transition-all shadow-lg shadow-white/10"
              >
                Confirm Appointment Request
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Visit Scheduled Successfully!</h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our senior architectural coordinator in Kurunegala will reach out via <strong className="text-white">{formData.phone}</strong> to confirm your slot.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider uppercase border border-white/20 transition-all"
            >
              Return to Website
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
