export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue sur{" "}
            <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              BiblioCampus
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Votre plateforme universitaire pour rechercher, réserver et emprunter des livres en toute simplicité
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg">
              Explorer le Catalogue
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-600 hover:text-white transition-all duration-200">
              Se Connecter
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-gradient-to-br from-green-400 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Recherche Avancée</h3>
              <p className="text-gray-600">Filtrez par titre, auteur, genre et disponibilité</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-gradient-to-br from-green-400 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gestion des Emprunts</h3>
              <p className="text-gray-600">Suivez vos emprunts et dates de retour</p>
            </div>
            <div className="text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-200">
              <div className="bg-gradient-to-br from-green-400 to-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a1 1 0 102 0V3h4v1a1 1 0 102 0V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm2.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Réservations</h3>
              <p className="text-gray-600">Réservez vos livres à l&apos;avance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Quelques Chiffres</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">15,000+</div>
              <div className="text-gray-300">Livres Disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">5,000+</div>
              <div className="text-gray-300">Étudiants Inscrits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Accès en Ligne</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
