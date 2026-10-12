import React from 'react';

const RunningText: React.FC = () => {
  const phrases = (
    <>
      <span className="text-brand-accent font-semibold tracking-wider mx-8">Supported By: Poetra Law Firm</span>
      <span className="text-slate-400 mx-8">&bull;</span>
      <span className="text-brand-accent font-semibold tracking-wider mx-8">Trusted by 100+ Indonesian MSMEs</span>
      <span className="text-slate-400 mx-8">&bull;</span>
      <span className="text-brand-accent font-semibold tracking-wider mx-8">Your Partner in Legal Growth</span>
      <span className="text-slate-400 mx-8">&bull;</span>
      <span className="text-brand-accent font-semibold tracking-wider mx-8">Layanan Hukum Terintegrasi</span>
      <span className="text-slate-400 mx-8">&bull;</span>
    </>
  );

  return (
    <div className="bg-brand-dark text-brand-light border-y border-slate-700">
      <div className="py-4 overflow-x-hidden relative [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] flex flex-nowrap">
        {/* Animation is now on these two content blocks */}
        <div className="flex-shrink-0 animate-marquee-slow whitespace-nowrap">
          {phrases}
        </div>
        <div className="flex-shrink-0 animate-marquee-slow whitespace-nowrap" aria-hidden="true">
          {phrases}
        </div>
      </div>
    </div>
  );
};

export default RunningText;