import React, { useState } from 'react';
import { X, Upload, CheckCircle2, User, Star, Send, ChevronRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddReview: (review: {
    quote: string;
    author: string;
    role: string;
    date: string;
    avatar: string;
  }) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onAddReview,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [testimonialName, setTestimonialName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Fallback anonymous profile icon if user did not upload image
    const finalPicture =
      profilePicture ||
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1';

    const now = new Date();
    const formattedDate = `${now.toLocaleString('default', { month: 'short' }).toUpperCase()} ${now.getFullYear()}`;

    // 1. Insert directly into Supabase dreamscape_testimonials table matching exact schema
    try {
      const { error } = await supabase.from('dreamscape_testimonials').insert([
        {
          testimonial_name: testimonialName || 'Valued Client',
          description: description,
          profile_picture: finalPicture,
          rating: rating,
        },
      ]);

      if (error) {
        console.error('Supabase Testimonial Insert Error:', error);
      }
    } catch (err) {
      console.error('Supabase Exception:', err);
    }

    // 2. Update local UI state
    onAddReview({
      author: testimonialName || 'Valued Client',
      role: 'CLIENT',
      quote: description,
      date: formattedDate,
      avatar: finalPicture,
    });

    // 3. Dispatch review text to WhatsApp
    const messageText =
      `*New Client Review - Dreamscape Designs*\n\n` +
      `*Name (testimonial_name):* ${testimonialName}\n` +
      `*Rating (rating):* ${rating}/5 Stars\n\n` +
      `*Review (description):*\n${description}`;

    const whatsappUrl = `https://wa.me/94779962051?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setSubmitted(true);
  };

  const steps = [
    { num: 1, label: 'Name & Rating' },
    { num: 2, label: 'Profile Picture' },
    { num: 3, label: 'Description' },
    { num: 4, label: 'Submit to DB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-poppins">
      <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-900">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-slate-900" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 rounded-full bg-slate-100 hover:bg-slate-200 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 text-center sm:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2 font-semibold">
            Dreamscape Database Form
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Leave a Client Review
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Share your experience with our house planning, 3D elevation, and structural consulting.
          </p>
        </div>

        {/* Stepper Header Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-md mx-auto relative px-2">
            {/* Connector Bar */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
            <div
              className="absolute top-4 left-6 h-0.5 bg-emerald-500 transition-all duration-500 -z-0"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 88}%`,
              }}
            />

            {steps.map((step) => {
              const isActive = currentStep === step.num;
              const isDone = currentStep > step.num;

              return (
                <div
                  key={step.num}
                  onClick={() => {
                    if (step.num < currentStep || testimonialName) setCurrentStep(step.num);
                  }}
                  className="flex flex-col items-center z-10 cursor-pointer group"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.5)] scale-110'
                        : isDone
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 text-slate-400 border border-slate-200'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : step.num}
                  </div>
                  <span
                    className={`text-[11px] font-medium mt-1.5 hidden sm:block ${
                      isActive ? 'text-slate-900 font-bold' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {/* ── STEP 1: testimonial_name & rating ── */}
            {currentStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                  Step 1: Your Name & Rating
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Full Name <span className="text-slate-400 font-mono">(testimonial_name)</span> <span className="text-emerald-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ashinsa Ganegoda"
                    value={testimonialName}
                    onChange={(e) => setTestimonialName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Star Rating <span className="text-slate-400 font-mono">(rating 1 to 5)</span>
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: profile_picture ── */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                  Step 2: Profile Photo <span className="text-slate-400 font-mono">(profile_picture)</span>
                </h3>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-md flex items-center justify-center">
                    {profilePicture ? (
                      <img src={profilePicture} alt="Uploaded Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                  </div>

                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="review-stepper-avatar-picture"
                    />
                    <label
                      htmlFor="review-stepper-avatar-picture"
                      className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-slate-950 text-white font-semibold text-xs hover:bg-slate-800 cursor-pointer transition-all shadow-md"
                    >
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{profilePicture ? 'Change Photo' : 'Upload Profile Photo'}</span>
                    </label>
                  </div>

                  <p className="text-xs text-slate-500 max-w-xs">
                    If left empty, sample profile icon will be displayed.
                  </p>
                </div>
              </div>
            )}

            {/* ── STEP 3: description ── */}
            {currentStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                  Step 3: Review Description <span className="text-slate-400 font-mono">(description)</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Review / Feedback <span className="text-emerald-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write a few sentences about your experience working with Dreamscape Designs..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:bg-white focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* ── STEP 4: Review Summary & Submit to Supabase ── */}
            {currentStep === 4 && (
              <div className="space-y-4 animate-fade-in">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b pb-2">
                  Step 4: Database Submission Summary
                </h3>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        profilePicture ||
                        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=96&h=96&dpr=1'
                      }
                      alt={testimonialName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <span className="block text-xs font-bold text-slate-900">{testimonialName || 'Valued Client'}</span>
                      <div className="flex items-center space-x-0.5 mt-0.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 italic border-t pt-2 leading-relaxed">
                    "{description || 'Outstanding architectural design and house planning service.'}"
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer mt-4 active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting review...' : 'Submit your review'}</span>
                </button>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : <div />}

              {currentStep < 4 && (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!testimonialName && currentStep === 1}
                  className="inline-flex items-center space-x-1.5 px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold cursor-pointer transition-all shadow-md ml-auto"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        ) : (
          /* Confirmation View */
          <div className="text-center py-8 space-y-4">
            <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-slate-900">Thank You For Your Review!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your testimonial has been saved to your Supabase `dreamscape_testimonials` table and dispatched via WhatsApp.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setCurrentStep(1);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
