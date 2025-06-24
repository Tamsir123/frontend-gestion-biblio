'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden flex items-center justify-center">
      {/* Background avec texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
      </div>

    {/* Hero Image */}
    <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Gestion de Bibliothèque
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Découvrez notre système moderne de gestion bibliothécaire
            </p>
        </div>
        
        <div className="relative">
            <Image
                src="/hero.png"
                alt="Hero Section"
                width={800}
                height={600}
                className="mx-auto rounded-lg shadow-2xl"
                priority
            />
            {/* Overlay gradient sur l'image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
        </div>
    </div>
      {/* Indicateur de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center">
          <span className="text-yellow-300/70 text-sm mb-2 font-medium">Découvrir plus</span>
          <div className="animate-bounce bg-yellow-500/20 backdrop-blur-sm rounded-full p-3 border border-yellow-500/30">
            <svg className="w-6 h-6 text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}