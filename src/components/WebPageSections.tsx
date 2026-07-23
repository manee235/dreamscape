import React from 'react';
import { ViktorOddyPage } from './vo/ViktorOddyPage';

interface WebPageSectionsProps {
  onScheduleClick: () => void;
  onGalleryClick: () => void;
  onContactClick: () => void;
}

export const WebPageSections: React.FC<WebPageSectionsProps> = () => {
  return <ViktorOddyPage />;
};
