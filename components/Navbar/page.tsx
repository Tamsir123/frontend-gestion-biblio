'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav 
      className="shadow-lg border-b border-green-400/20 relative"
      style={{
        backgroundImage: "url('/rectangle-48.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between h-20">
          {/* Logo et nom de l'application */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Image
                  src="/logo.png"
                  alt="BiblioGestion Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-white drop-shadow-lg">
                  BiblioCampus
                </h1>
                <p className="text-xs text-gray-200 drop-shadow">Gestion Universitaire</p>
              </div>
            </div>
          </div>

          {/* Navigation principale (Desktop) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-white hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 drop-shadow"
            >
              Accueil
            </Link>
            <Link
              href="/books"
              className="text-white hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 drop-shadow"
            >
              Catalogue
            </Link>
            <Link
              href="/my-borrowings"
              className="text-white hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 drop-shadow"
            >
              Mes Emprunts
            </Link>
            <Link
              href="/dashboard"
              className="text-white hover:text-green-300 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-white/10 drop-shadow"
            >
              Dashboard
            </Link>
          </div>

        
          {/* Actions utilisateur (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <Link
              href="/notifications"
              className="relative p-2 text-gray-200 hover:text-green-300 transition-colors duration-200 drop-shadow"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center space-x-2 text-white hover:text-green-300 transition-colors duration-200 drop-shadow"
              >
                <div className="h-8 w-8 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">JD</span>
                </div>
                <span className="text-sm font-medium">John Doe</span>
                <svg
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    isProfileOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    👤 Mon Profil
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    📊 Tableau de bord
                  </Link>
                  <Link
                    href="/my-borrowings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    📚 Mes Emprunts
                  </Link>
                  <Link
                    href="/admin"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    🔧 Administration
                  </Link>
                  <Link
                    href="/admin/books"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200 pl-8"
                  >
                    📚 Gestion Livres
                  </Link>
                  <Link
                    href="/admin/users"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200 pl-8"
                  >
                    👥 Gestion Utilisateurs
                  </Link>
                  <Link
                    href="/admin/borrowings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200 pl-8"
                  >
                    📋 Gestion Emprunts
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    ⚙️ Paramètres
                  </Link>
                  <Link
                    href="/help"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-green-400 transition-colors duration-200"
                  >
                    ❓ Aide
                  </Link>
                  <hr className="my-1 border-gray-700" />
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-colors duration-200"
                  >
                    🚪 Déconnexion
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-300 focus:outline-none transition-colors duration-200 drop-shadow"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-sm border-t border-white/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Barre de recherche mobile */}
            <div className="px-3 py-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-white/30 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  placeholder="Rechercher..."
                />
              </div>
            </div>

            {/* Navigation mobile */}
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Accueil
            </Link>
            <Link
              href="/books"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Catalogue
            </Link>
            <Link
              href="/my-books"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Mes Emprunts
            </Link>
            <Link
              href="/reservations"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Réservations
            </Link>
            <Link
              href="/profile"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Mon Profil
            </Link>
            <Link
              href="/dashboard"
              className="block px-3 py-2 text-white hover:text-green-300 hover:bg-white/10 rounded-md transition-colors duration-200"
            >
              Tableau de bord
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}