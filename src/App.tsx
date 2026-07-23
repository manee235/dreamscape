import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroOverlay } from './components/HeroOverlay';
import { ContentOverlays } from './components/ContentOverlays';
import { CanvasVideoScrubber } from './components/CanvasVideoScrubber';
import { WebPageSections } from './components/WebPageSections';
import { ScheduleVisitModal } from './components/ScheduleVisitModal';
import { DesignsGalleryModal } from './components/DesignsGalleryModal';
import { ContactModal } from './components/ContactModal';
import { LoadingScreen } from './components/LoadingScreen';

export const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<'schedule' | 'gallery' | 'contact' | 'portal' | null>(null);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const handleNavClick = (section: string) => {
    setActiveSection(section);

    // Smooth scroll to the section by id (sections defined in ViktorOddyPage)
    const sectionEl = document.getElementById(section);
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 selection:bg-[#051A24] selection:text-white">
      {/* Global Green SVG Fill Website Loading Screen */}
      <LoadingScreen />

      {/* Navbar — reveals as canvas animation completes */}
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
              {/* Hero Title & Subtitle — reveals at final frames */}
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

      {/* Viktor Oddy Landing Page Sections */}
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
