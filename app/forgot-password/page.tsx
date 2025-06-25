'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de récupération de mot de passe à implémenter
    console.log('Password reset request for:', email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black flex items-center">
      {/* Section gauche avec l'image */}
      <div className="flex-1 relative flex items-center justify-center py-8">
        <div className="relative">
          <Image
            src="/login.png"
            alt="Illustration de récupération"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Section droite avec le formulaire */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        <div className="w-full max-w-sm">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-yellow-400 mb-3">
                  Mot de passe oublié ?
                </h1>
                <p className="text-gray-300 text-base leading-relaxed">
                  Pas de souci ! Entrez votre adresse e-mail et nous vous enverrons 
                  un lien pour réinitialiser votre mot de passe.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Entrez votre e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-yellow-200 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-base"
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 text-base"
                >
                  Envoyer le lien de réinitialisation
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="mb-6">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <h2 className="text-xl font-bold text-yellow-400 mb-3">
                  E-mail envoyé !
                </h2>
                <p className="text-gray-300 text-base leading-relaxed mb-4">
                  Nous avons envoyé un lien de réinitialisation à <span className="text-yellow-400 font-semibold">{email}</span>. 
                  Vérifiez votre boîte de réception et suivez les instructions.
                </p>
                <p className="text-gray-400 text-xs">
                  Vous n&apos;avez pas reçu l&apos;e-mail ? Vérifiez votre dossier spam ou 
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="text-yellow-400 hover:text-yellow-300 underline ml-1"
                  >
                    essayez à nouveau
                  </button>
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-6">
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-semibold underline text-sm">
              ← Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
