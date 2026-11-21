'use client';

import React from 'react';
import HeroSection from './HeroSection';
import MeetSection from './MeetSection';
import PathsSection from './PathsSection';
import JourneySection from './JourneySection';
import TrustSection from './TrustSection';
import FamiliesSection from './FamiliesSection';
import QuestionsSection from './QuestionsSection';
import CtaSection from './CtaSection';
import TeddyFollower from './TeddyFollower';
import PawCursor from './PawCursor';

export default function HomeClient() {
  return (
    <div className="tp-page" data-page="home">
      <PawCursor />
      <TeddyFollower />

      <HeroSection />
      <MeetSection />
      <PathsSection />
      <JourneySection />
      <TrustSection />
      <FamiliesSection />
      <QuestionsSection />
      <CtaSection />
    </div>
  );
}
