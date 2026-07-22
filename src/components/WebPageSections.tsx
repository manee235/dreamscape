import React from 'react';
import { Compass, Layers, ShieldCheck, ArrowUpRight, MapPin, Phone, Award, Sparkles } from 'lucide-react';

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
  const features = [
    {
      icon: Compass,
      title: 'Biophilic Spatial Design',
      description: 'Designing architectural sanctuaries that frame natural topography, tropical sunlight, and airflow.',
    },
    {
      icon: Layers,
      title: 'Cantilever Engineering',
      description: 'Precision structural steel & post-tensioned concrete allowing gravity-defying floating pavilions.',
    },
    {
      icon: ShieldCheck,
      title: 'Sustainable Materiality',
      description: 'Locally harvested teak, low-E triple-glazing, and energy-neutral smart home integration.',
    },
    {
      icon: Award,
      title: 'Turnkey Architectural Delivery',
      description: 'From initial land survey to 3D BIM blueprints, interior styling, and structural execution in Sri Lanka.',
    },
  ];

  const portfolioHighlights = [
    {
      title: 'The Glass Horizon Villa',
      location: 'Kurunegala Heights, Sri Lanka',
      type: 'Hillside Modernist Residence',
      image: '/Assets/scene 1/ezgif-frame-001.jpg',
    },
    {
      title: 'Mirissa Ocean Edge Sanctuary',
      location: 'Southern Province, Sri Lanka',
      type: 'Coastal Infinity Pavilion',
      image: '/Assets/scene 1/ezgif-frame-045.jpg',
    },
    {
      title: 'Kandy Mist Pavilion',
      location: 'Central Highlands, Sri Lanka',
      type: 'Timber & Glass Estate',
      image: '/Assets/scene 1/ezgif-frame-110.jpg',
    },
  ];

  return (
    <div className="relative z-30 bg-gray-950 text-white border-t border-white/10">
      
      {/* Section 1: Features & Principles Grid */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20 text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>Architectural Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Designed with Purpose & Precision
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Dreamscape Designs crafts bespoke architectural masterpieces engineered for longevity, seamless indoor-outdoor living, and uncompromised luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-amber-400/40 hover:bg-white/10 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 text-amber-300 flex items-center justify-center border border-amber-400/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
                  <span>Explore Feature</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 2: Portfolio Gallery Highlights */}
      <section id="designs" className="py-24 bg-black/60 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
            <div>
              <span className="text-xs font-semibold tracking-widest text-amber-300 uppercase">
                Featured Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">
                Architectural Masterpieces
              </h2>
            </div>
            <button
              onClick={onGalleryClick}
              className="px-6 py-3 rounded-full bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-all flex items-center space-x-2 self-start md:self-auto"
            >
              <span>View Full Gallery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioHighlights.map((item, idx) => (
              <div
                key={idx}
                onClick={onGalleryClick}
                className="group cursor-pointer rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-72 overflow-hidden bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-300 tracking-wider">
                      {item.type}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400 pt-3 border-t border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-white/70" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Call-To-Action Banner strictly matched with contact info */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 sm:p-16 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900 border border-white/20 shadow-2xl overflow-hidden text-center sm:text-left flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Turn Your Vision into Reality?
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Visit our studio in Kurunegala, Sri Lanka or schedule a virtual 3D BIM walkthrough with our principal design architects.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-gray-300">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-amber-300" />
                <span>Kurunegala, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-300" />
                <a href="tel:+94779962051" className="hover:text-white">+94 77 996 2051</a>
              </div>
            </div>
          </div>

          <button
            onClick={onScheduleClick}
            className="shrink-0 px-8 py-4 rounded-full bg-white text-gray-950 font-bold text-sm hover:bg-gray-100 hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center space-x-2"
          >
            <span>Schedule A Visit</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
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

          <div className="flex items-center space-x-6">
            <button onClick={onGalleryClick} className="hover:text-white transition-colors">Portfolio</button>
            <button onClick={onContactClick} className="hover:text-white transition-colors">Contact Us</button>
            <button onClick={onScheduleClick} className="hover:text-white transition-colors">Schedule Visit</button>
          </div>
        </div>
      </footer>

    </div>
  );
};
