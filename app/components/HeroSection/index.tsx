'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Image de background hero */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay sombre pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

   

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">

        {/* Titre principal */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center text-white mb-8 leading-tight max-w-4xl -mt-26">
          The Book Lover&apos;s Dreamland Awaits!
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl text-gray-200 text-center mb-12 max-w-3xl leading-relaxed">
          Welcome to the ultimate book lover&apos;s paradise! Join our community and contribute to the ever-evolving library discoveries, where every book has a chance to inspire someone new.
        </p>
       
      </div>

      {/* Vague en bas */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0V64Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}