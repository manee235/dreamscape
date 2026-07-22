import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverlay } from './components/HeroOverlay';
import { ContentOverlays } from './components/ContentOverlays';
import { CanvasVideoScrubber } from './components/CanvasVideoScrubber';
import { WebPageSections } from './components/WebPageSections';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { DesignsGalleryModal } from './components/DesignsGalleryModal';
import { ContactModal } from './components/ContactModal';

export const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'schedule' | 'gallery' | 'contact' | 'portal' | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleNavClick = (section: string) => {
    setActiveSection(section);
    if (section === 'features') {
      const featElem = document.getElementById('features');
      if (featElem) featElem.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'designs') {
      setActiveModal('gallery');
    } else if (section === 'portal') {
      setActiveModal('portal');
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black">
      {/* Header / Navbar appears smoothly as user scrolls towards the last frames */}
      <Navbar
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        onScheduleClick={() => setActiveModal('schedule')}
        onContactClick={() => setActiveModal('contact')}
        onNavClick={handleNavClick}
      />

      {/* Main Fullscreen Video Frame Scrubber (PINNED during frame sequence scrub) */}
      <main className="relative w-full">
        <CanvasVideoScrubber
          onProgressUpdate={(progress) => setScrollProgress(progress)}
        >
          {(progress) => (
            <>
              {/* Hero Title & Subtitle strictly matching screenshot - reveals at final frames */}
              <HeroOverlay scrollProgress={progress} />

              {/* Story Narrative Overlays */}
              <ContentOverlays
                scrollProgress={progress}
                onExploreClick={() => setActiveModal('gallery')}
                onScheduleClick={() => setActiveModal('schedule')}
              />
            </>
          )}
        </CanvasVideoScrubber>
      </main>

      {/* Web Page Content Sections - Accessible after full image frames scrubbing completes */}
      <WebPageSections
        onScheduleClick={() => setActiveModal('schedule')}
        onGalleryClick={() => setActiveModal('gallery')}
        onContactClick={() => setActiveModal('contact')}
      />

      {/* Interactive Modals */}
      <ScheduleVisitModal
        isOpen={activeModal === 'schedule'}
        onClose={() => setActiveModal(null)}
      />

      <DesignsGalleryModal
        isOpen={activeModal === 'gallery'}
        onClose={() => setActiveModal(null)}
        onSelectProject={(title) => {
          console.log('Selected project:', title);
          setActiveModal('schedule');
        }}
      />

      <ContactModal
        isOpen={activeModal === 'contact' || activeModal === 'portal'}
        mode={activeModal === 'portal' ? 'portal' : 'contact'}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default App;
