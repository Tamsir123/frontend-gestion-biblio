'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de connexion à implémenter
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Section gauche avec l'image */}
      <div className="flex-1 relative flex items-center justify-center">
        <div className="relative">
          <Image
            src="/login.png"
            alt="Illustration de connexion"
            width={600}
            height={600}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Section droite avec le formulaire */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-yellow-400 mb-4">
              Bienvenue sur Espace Livre
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              Découvrez une manière simple de lire et partager vos livres tout en bénéficiant 
              d&apos;avantages exclusifs. Profitez d&apos;une expérience agréable, gagnez du temps et 
              découvrez des offres spéciales.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-yellow-400 text-center mb-6">
              Connectez-vous à votre compte !
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Entrez votre e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-yellow-200 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-yellow-200 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-lg"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    {showPassword ? (
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                    ) : (
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                    )}
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                  </svg>
                </button>
              </div>

              <div className="text-right">
                <Link href="/forgot-password" className="text-yellow-400 hover:text-yellow-300 text-sm">
                  Mot de passe oublié ?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-4 rounded-lg transition-colors duration-200 text-lg"
              >
                Se connecter
              </button>
            </form>
          </div>

          <div className="text-center mb-6">
            <p className="text-gray-300">
              Vous n&apos;avez pas de compte ?{' '}
              <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-semibold underline">
                Créer un compte
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button className="flex items-center space-x-3 bg-white hover:bg-gray-100 text-gray-800 font-medium py-3 px-6 rounded-lg transition-colors duration-200">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Se connecter avec Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
