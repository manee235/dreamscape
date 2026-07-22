import React from 'react';
import { ArrowUpRight, Play, Maximize2, Bed, Bath, Layers, PhoneCall, Sparkles } from 'lucide-react';

interface WebPageSectionsProps {
  onScheduleClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
}

export const WebPageSections: React.FC<WebPageSectionsProps> = ({
  onScheduleClick,
  onGalleryClick,
  onContactClick,
}) => {
  const residenceCards = [
    {
      id: 1,
      title: 'Aether Heights',
      price: '$345,000',
      location: 'Kurunegala Heights, Sri Lanka',
      area: '300 m²',
      floors: '1 Floor',
      beds: '4 Beds',
      baths: '2 Baths',
      image: '/Assets/scene 1/ezgif-frame-001.jpg',
    },
    {
      id: 2,
      title: 'Azure Sanctuary',
      price: '$225,000',
      location: 'Southern Coast, Sri Lanka',
      area: '280 m²',
      floors: '1 Floor',
      beds: '4 Beds',
      baths: '3 Baths',
      image: '/Assets/scene 1/ezgif-frame-045.jpg',
    },
    {
      id: 3,
      title: 'Summit Pavilion',
      price: '$510,000',
      location: 'Central Highlands, Sri Lanka',
      area: '400 m²',
      floors: '2 Floors',
      beds: '5 Beds',
      baths: '4 Baths',
      image: '/Assets/scene 1/ezgif-frame-110.jpg',
    },
  ];

  const stats = [
    { value: '120+', label: 'Bespoke Sanctuaries' },
    { value: '15+', label: 'Design Awards' },
    { value: '100%', label: 'Turnkey Delivery' },
    { value: '10+', label: 'Years Excellence' },
  ];

  return (
    <div className="relative z-30 bg-gray-50 text-gray-900 border-t border-gray-200 font-sans">

      {/* ========================================================================= */}
      {/* STATS STRIP: Clean Minimalist Metrics */}
      {/* ========================================================================= */}
      <section className="bg-slate-950 text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
                {stat.value}
              </span>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mt-1.5">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 1: Guiding you toward the residence of your dreams */}
      {/* ========================================================================= */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              Guiding you toward the residence of your dreams
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
              Our vision bridges balance, design, and attention so that every client resides in a space reflecting their values.
            </p>
          </div>
        </div>

        {/* 3 Column Residence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {residenceCards.map((res) => (
            <div
              key={res.id}
              onClick={onGalleryClick}
              className="group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-100">
                <img
                  src={res.image}
                  alt={res.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Card Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-950 group-hover:text-amber-600 transition-colors">
                    {res.title}
                  </h3>
                  <span className="text-lg font-black text-gray-950 font-mono">
                    {res.price}
                  </span>
                </div>

                <p className="text-xs text-gray-500 font-medium">
                  {res.location}
                </p>

                {/* Specs Icon Strip */}
                <div className="flex items-center justify-between text-xs text-gray-600 pt-3 border-t border-gray-100 font-medium">
                  <div className="flex items-center space-x-1">
                    <Maximize2 className="w-3.5 h-3.5 text-gray-500" />
                    <span>{res.area}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Layers className="w-3.5 h-3.5 text-gray-500" />
                    <span>{res.floors}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bed className="w-3.5 h-3.5 text-gray-500" />
                    <span>{res.beds}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Bath className="w-3.5 h-3.5 text-gray-500" />
                    <span>{res.baths}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: Exclusive Collection Split Layout */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

          {/* Left Text Column */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-tight">
              Exclusive collection
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Consultants curate custom lists of vetted homes. Featuring media, VR walk-ins, and private physical tours.
            </p>
            <button
              onClick={onScheduleClick}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full border border-gray-300 text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-950 hover:text-white transition-all shadow-sm"
            >
              <span>Free consult</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Large Hero Villa Card Image */}
          <div className="md:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group h-80 sm:h-96">
              <img
                src="/Assets/scene 1/ezgif-frame-080.jpg"
                alt="Exclusive Modern Villa"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: World-Class Consultants & Bento Grid */}
      {/* ========================================================================= */}
      <section id="designs" className="py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto border-t border-gray-200 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Headline, Buttons & Brand Logos */}
          <div className="lg:col-span-6 space-y-8">

            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider border border-indigo-100">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Premier Architecture Studio</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-gray-950 tracking-tight leading-[1.1]">
                World-class consultants that empower luxury homeowners
              </h2>
            </div>

            {/* How do we work button */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-900 text-gray-900 text-xs font-bold cursor-pointer hover:bg-gray-900 hover:text-white transition-all">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>How do we work</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-2">
              <button
                onClick={onContactClick}
                className="px-7 py-3.5 rounded-full bg-sky-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-sky-600 transition-all shadow-lg flex items-center space-x-2"
              >
                <span>Contact us</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScheduleClick}
                className="px-7 py-3.5 rounded-full border border-gray-300 text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center space-x-2"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Request a call</span>
              </button>
            </div>

            {/* Subtext Paragraph & Partner Logos */}
            <div className="pt-6 space-y-6 border-t border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                Dreamscape Designs collaborates with professional-led organizations to foster the creation of innovative luxury residences worldwide.
              </p>

              <div className="flex flex-wrap items-center gap-8 text-sm font-black text-gray-400 uppercase tracking-widest">
                <span className="hover:text-gray-900 transition-colors">HEADWAY</span>
                <span className="hover:text-gray-900 transition-colors">BRIGHTLINE</span>
                <span className="hover:text-gray-900 transition-colors">HAZEL</span>
                <span className="hover:text-gray-900 transition-colors">G&STC</span>
              </div>
            </div>

          </div>

          {/* Right Column: Bento Box Cards Grid */}
          <div className="lg:col-span-6 space-y-6">

            {/* Top Large Bento Card */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white shadow-2xl relative overflow-hidden group space-y-6 border border-slate-800">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl sm:text-3xl font-black max-w-sm leading-snug">
                  If you're ready to build your dream residence, let's get in touch.
                </h3>
                <button
                  onClick={onScheduleClick}
                  className="p-3 rounded-full bg-white text-slate-950 hover:scale-110 transition-transform shadow-lg shrink-0 ml-4"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md">
                Our goal is to promote the creation of innovative, energy-neutral luxury sanctuaries engineered for climate balance and modern living.
              </p>
            </div>

            {/* Bottom 2 Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

              {/* Cyan Bento Card */}
              <div className="p-6 rounded-3xl bg-sky-100 text-sky-950 shadow-md space-y-4 border border-sky-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white text-sky-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Locations
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-sky-900" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-sky-950 mb-1">
                    United Architects
                  </h4>
                  <p className="text-xs text-sky-800 leading-relaxed">
                    Unites luxury homeowners globally through our studio network.
                  </p>
                </div>
              </div>

              {/* Lime/Gold Bento Card */}
              <div className="p-6 rounded-3xl bg-amber-100 text-amber-950 shadow-md space-y-4 border border-amber-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-white text-amber-950 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Architects
                  </span>
                  <span className="text-3xl font-black text-amber-950 font-mono">34</span>
                </div>
                <div>
                  <p className="text-xs text-amber-900 font-medium leading-relaxed">
                    Our advisors include visionary architects, pioneering engineers, and iconic designers.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 text-xs text-gray-600 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <img
              src="/Assets/logo.png"
              alt="Dreamscape Designs Logo"
              className="h-10 w-auto object-contain"
            />
            <span className="text-[10px] text-gray-500">
              © {new Date().getFullYear()} Dreamscape Designs Ltd. All rights reserved.
            </span>
          </div>

          <div className="flex items-center space-x-6 font-semibold text-gray-700">
            <button onClick={onGalleryClick} className="hover:text-black transition-colors">Portfolio</button>
            <button onClick={onContactClick} className="hover:text-black transition-colors">Contact Us</button>
            <button onClick={onScheduleClick} className="hover:text-black transition-colors">Schedule Visit</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
