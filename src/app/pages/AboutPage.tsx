import React from 'react';
import { Award, Eye, Heart, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { translations } from '../data/translations';

const lifestyleImage = 'https://images.unsplash.com/photo-1770662368952-b624117e3775?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBtYW4lMjB3ZWFyaW5nJTIwd2F0Y2h8ZW58MXx8fHwxNzczMzgzMDEzfDA&ixlib=rb-4.1.0&q=80&w=1080';
const storeImage = 'https://images.unsplash.com/photo-1764512680324-048f158cab2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGJvdXRpcXVlJTIwc3RvcmUlMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzMzODMwMTN8MA&ixlib=rb-4.1.0&q=80&w=1080';
const watchCollectionImage = 'https://images.unsplash.com/photo-1763189851330-23f36450bbde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwd2F0Y2glMjBjb2xsZWN0aW9uJTIwbHV4dXJ5JTIwZGlzcGxheXxlbnwxfHx8fDE3NzMzODMwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080';

export function AboutPage() {
  const { language } = useApp();
  const t = translations[language];

  const values = [
    { Icon: Shield, title: t.authenticity, desc: t.authenticityDesc },
    { Icon: Eye, title: t.expertise, desc: t.expertiseDesc },
    { Icon: Award, title: t.excellence, desc: t.excellenceDesc },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={lifestyleImage} alt="Luxury lifestyle" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Our Heritage
            </span>
          </div>
          <h1
            className="text-white mb-4"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }}
          >
            {t.aboutTitle}
          </h1>
          <p
            className="text-gray-300 max-w-lg"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
          >
            {t.aboutSubtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-[#c9a84c]" />
              <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
                The Story
              </span>
            </div>
            <h2
              className="text-gray-900 dark:text-white mb-6"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', lineHeight: 1.2 }}
            >
              A Legacy of Horological Excellence
            </h2>
            <p
              className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
            >
              {t.aboutDesc1}
            </p>
            <p
              className="text-gray-600 dark:text-gray-400 leading-relaxed"
              style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '0.9rem' }}
            >
              {t.aboutDesc2}
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { value: '28', label: 'Years' },
                { value: '50+', label: 'Brands' },
                { value: '10K+', label: 'Clients' },
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-[#c9a84c] pl-4">
                  <div
                    className="text-gray-900 dark:text-white"
                    style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '2rem' }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-gray-500 text-xs tracking-wider uppercase"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={storeImage} alt="Our boutique" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#c9a84c] flex items-center justify-center hidden md:flex">
              <div className="text-center text-black">
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: '1.8rem' }}>1998</div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500, fontSize: '0.65rem', letterSpacing: '0.1em' }}>ESTABLISHED</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#080808] dark:bg-[#050505] py-20 border-y border-[#c9a84c]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <div className="w-2 h-2 bg-[#c9a84c] rotate-45" />
            <div className="h-px w-8 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-white mb-6"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}
          >
            {t.ourMission}
          </h2>
          <p
            className="text-gray-400 leading-loose"
            style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300, fontSize: '1rem' }}
          >
            "{t.missionText}"
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-8 bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase" style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 500 }}>
              Principles
            </span>
            <div className="h-px w-8 bg-[#c9a84c]" />
          </div>
          <h2
            className="text-gray-900 dark:text-white"
            style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}
          >
            {t.ourValues}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { Icon: Award, title: t.authenticity, desc: t.authenticityDesc, delay: 0 },
            { Icon: Eye, title: t.expertise, desc: t.expertiseDesc, delay: 1 },
            { Icon: Heart, title: t.excellence, desc: t.excellenceDesc, delay: 2 },
          ].map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              className="group text-center p-10 border border-gray-100 dark:border-gray-800/60 hover:border-[#c9a84c]/40 transition-all duration-500 bg-white dark:bg-[#111111] hover:shadow-xl hover:shadow-[#c9a84c]/5"
            >
              <div className="w-14 h-14 border border-[#c9a84c]/30 group-hover:border-[#c9a84c] flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                <Icon size={20} className="text-[#c9a84c]" />
              </div>
              <h3
                className="text-gray-900 dark:text-white mb-4"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 600, fontSize: '1.3rem' }}
              >
                {title}
              </h3>
              <p
                className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm"
                style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 300 }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="overflow-hidden">
        <div className="flex h-60 sm:h-80">
          {[lifestyleImage, storeImage, watchCollectionImage, lifestyleImage].map((img, i) => (
            <div key={i} className="flex-1 overflow-hidden relative">
              <img src={img} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/20 hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}