export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <div className="bg-gradient-to-br from-green-400 to-yellow-400 p-2 rounded-lg">
                <svg
                  className="h-6 w-6 text-gray-900"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm1 0v12h12V4H4z"
                    clipRule="evenodd"
                  />
                  <path d="M6 6h8v2H6V6zM6 10h8v2H6v-2zM6 14h5v2H6v-2z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                BiblioCampus
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Votre plateforme universitaire pour la gestion de bibliothèque moderne et efficace.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/books" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Catalogue
                </a>
              </li>
              <li>
                <a href="/my-books" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Mes Emprunts
                </a>
              </li>
              <li>
                <a href="/reservations" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Réservations
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/help" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Aide & Support
                </a>
              </li>
              <li>
                <a href="/rules" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Règlement
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Contact
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  À propos
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📧 biblio@universite.fr</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>📍 Campus Universitaire</p>
              <p>75000 Paris, France</p>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 BiblioCampus. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
                Confidentialité
              </a>
              <a href="/terms" className="text-gray-400 hover:text-green-400 text-sm transition-colors duration-200">
                Conditions d&apos;utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}