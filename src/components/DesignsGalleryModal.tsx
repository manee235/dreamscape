import React, { useState } from 'react';
import { X, ExternalLink, Sparkles, Filter } from 'lucide-react';

interface DesignsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (title: string) => void;
}

export const DesignsGalleryModal: React.FC<DesignsGalleryModalProps> = ({
  isOpen,
  onClose,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Hillside Villas', 'Coastal Sanctuaries', 'Urban Pavilions', 'Interior Craft'];

  const projects = [
    {
      id: 1,
      title: 'The Glass Horizon Villa',
      location: 'Kurunegala Heights, Sri Lanka',
      category: 'Hillside Villas',
      area: '8,400 sq.ft',
      image: '/Assets/scene 1/ezgif-frame-001.jpg',
      tag: 'Featured Masterpiece',
    },
    {
      id: 2,
      title: 'Mirissa Ocean Edge Sanctuary',
      location: 'Southern Province, Sri Lanka',
      category: 'Coastal Sanctuaries',
      area: '6,200 sq.ft',
      image: '/Assets/scene 1/ezgif-frame-045.jpg',
      tag: 'Award Winner',
    },
    {
      id: 3,
      title: 'Colombo Sky Courtyard',
      location: 'Colombo 07, Sri Lanka',
      category: 'Urban Pavilions',
      area: '5,100 sq.ft',
      image: '/Assets/scene 1/ezgif-frame-080.jpg',
      tag: 'Modernist',
    },
    {
      id: 4,
      title: 'Kandy Mist Pavilion',
      location: 'Central Highlands, Sri Lanka',
      category: 'Hillside Villas',
      area: '9,800 sq.ft',
      image: '/Assets/scene 1/ezgif-frame-110.jpg',
      tag: 'Timber & Glass',
    },
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gray-950 border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Architectural Portfolio</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Dreamscape Designs Gallery
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex items-center space-x-2 py-4 overflow-x-auto no-scrollbar border-b border-white/10">
          <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 ${
                activeCategory === cat
                  ? 'bg-white text-gray-950 font-bold'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-6 pr-1">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 flex flex-col"
            >
              {/* Image Preview Container */}
              <div className="relative h-56 overflow-hidden bg-gray-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-300/30 uppercase tracking-widest">
                  {project.tag}
                </span>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{project.location}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-300 pt-3 border-t border-white/10">
                  <span className="font-mono">{project.area}</span>
                  <button
                    onClick={() => {
                      if (onSelectProject) onSelectProject(project.title);
                      onClose();
                    }}
                    className="flex items-center space-x-1 text-white hover:text-amber-300 font-semibold transition-colors"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
