'use client';

import React from 'react';
import PupBuddy from '@/components/puppy/PupBuddy';

export default function TeddySelfPortrait() {
  return (
    <div className="tp-sketchbook__self" data-armed="true" data-reveal="true" data-revealed="true">
      <PupBuddy pose="sit" facing="left" label="Teddy, the TeddyPups puppy" />
      <span className="font-scrawl tp-sketchbook__caption">self-portrait</span>
    </div>
  );
}
