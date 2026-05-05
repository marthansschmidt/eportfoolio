import React from 'react';
import BorderGlow from './BorderGlow';

const ProfileCardComponent = ({
  avatarUrl = "image_6cfeb0.jpg", 
  name = 'Märt Hansschmidt',
  title = 'Junior Developer',
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      {/* 1. h-[55vh] - kaart võtab 55% ekraani kõrgusest (jättes 45% bännerile ja vahedele).
          2. max-h-[520px] - piirame kõrgust suurtel ekraanidel, et see ei veniks liiga suureks.
          3. max-w-[380px] - muudame kaardi veidi kitsamaks, et see mõjuks portreena paremini.
      */}
      <div className="relative w-full max-w-[380px] lg:max-w-[620px] xl:max-w-[660px] h-[58vh] lg:h-[62vh] max-h-[520px] lg:max-h-[640px] min-h-[380px]">
        <BorderGlow
          borderRadius={40}
          glowRadius={50}
          glowColor="260 80 70"
          backgroundColor="transparent" 
          colors={['#8b5cf6', '#a855f7', '#6366f1']}
          className="w-full h-full"
        >
          <div 
            className="relative w-full h-full overflow-hidden shadow-2xl"
            style={{ borderRadius: '35px' }}
          >
            {/* FOTO */}
            <img 
              src={avatarUrl} 
              alt={name} 
              fetchpriority="high"
              decoding="async"
              width="660"
              height="640"
              className="absolute inset-0 w-full h-full object-cover z-0" 
            />

            {/* GRADIENTID - Tõmbasin tumedust veidi maha, et pilt oleks selgem */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/70" />

            {/* SISU */}
            <div className="relative z-20 flex flex-col items-center justify-end h-full pt-5 pb-8 px-6 text-center pointer-events-none">
              
              {/* TEKST - text-2xl/3xl on turvalisem, et mahuks ühe rea peale ära */}
              <div className="flex flex-col items-center gap-6">
                <div>
                <h3 className="text-2xl md:text-3xl font-black text-white drop-shadow-xl leading-tight">
                  {name}
                </h3>
                <p className="text-white/80 uppercase text-[9px] tracking-[0.3em] mt-2 font-bold">
                  {title}
                </p>
                </div>

              {/* GITHUB LOGO */}
                <div className="pointer-events-auto">
                <a 
                  href="https://github.com/marthansschmidt" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="block transition-all hover:scale-110 active:scale-95"
                >
                  <img 
                    src={`${import.meta.env.BASE_URL}github.png`} 
                    alt="GitHub" 
                    width="48"
                    height="48"
                    className="w-10 h-10 md:w-12 md:h-12 invert brightness-200 opacity-80" 
                  />
                </a>
                </div>
              </div>
            </div>
          </div>
        </BorderGlow>
      </div>
    </div>
  );
};

export default ProfileCardComponent;
