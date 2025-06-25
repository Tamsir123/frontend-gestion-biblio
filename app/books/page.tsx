'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  available_quantity: number;
  total_quantity: number;
  publication_year: number;
  isbn: string;
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [genres, setGenres] = useState<string[]>([]);

  // Simulation de données pour la démo
  useEffect(() => {
    const mockBooks: Book[] = [
      {
        id: 1,
        title: "Le Petit Prince",
        author: "Antoine de Saint-Exupéry",
        genre: "Littérature jeunesse",
        description: "L'histoire touchante d'un petit prince qui voyage de planète en planète...",
        available_quantity: 3,
        total_quantity: 5,
        publication_year: 1943,
        isbn: "978-2-07-040853-7"
      },
      {
        id: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Science-fiction",
        description: "Un roman dystopique qui décrit une société totalitaire...",
        available_quantity: 2,
        total_quantity: 4,
        publication_year: 1949,
        isbn: "978-0-452-28423-4"
      },
      {
        id: 3,
        title: "L'Étranger",
        author: "Albert Camus",
        genre: "Philosophie",
        description: "L'histoire de Meursault, un homme indifférent qui commet un meurtre...",
        available_quantity: 1,
        total_quantity: 3,
        publication_year: 1942,
        isbn: "978-2-07-036002-1"
      },
      {
        id: 4,
        title: "Les Misérables",
        author: "Victor Hugo",
        genre: "Classique",
        description: "Une fresque sociale de la France du XIXe siècle...",
        available_quantity: 0,
        total_quantity: 2,
        publication_year: 1862,
        isbn: "978-2-07-041910-6"
      },
      {
        id: 5,
        title: "Harry Potter à l'école des sorciers",
        author: "J.K. Rowling",
        genre: "Fantasy",
        description: "Les aventures du jeune sorcier Harry Potter...",
        available_quantity: 4,
        total_quantity: 6,
        publication_year: 1997,
        isbn: "978-2-07-054120-1"
      },
      {
        id: 6,
        title: "Le Seigneur des Anneaux",
        author: "J.R.R. Tolkien",
        genre: "Fantasy",
        description: "L'épopée fantastique de Frodo et de l'anneau unique...",
        available_quantity: 2,
        total_quantity: 3,
        publication_year: 1954,
        isbn: "978-2-07-061490-5"
      }
    ];

    setBooks(mockBooks);
    setFilteredBooks(mockBooks);
    setGenres(Array.from(new Set(mockBooks.map(book => book.genre))));
    setLoading(false);
  }, []);

  // Filtrage et recherche
  useEffect(() => {
    let filtered = books;

    if (searchTerm) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'year':
          return b.publication_year - a.publication_year;
        case 'availability':
          return b.available_quantity - a.available_quantity;
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, sortBy, books]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📚 Catalogue de la Bibliothèque
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection de {books.length} livres. Recherchez, filtrez et trouvez votre prochaine lecture.
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Recherche */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rechercher un livre
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Titre, auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Filtre par genre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Genre
              </label>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="">Tous les genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trier par
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="title">Titre</option>
                <option value="author">Auteur</option>
                <option value="year">Année</option>
                <option value="availability">Disponibilité</option>
              </select>
            </div>
          </div>

          {/* Statistiques */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredBooks.length} livre(s) trouvé(s)
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                Disponible
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                Non disponible
              </span>
            </div>
          </div>
        </div>

        {/* Grille des livres */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
              {/* Image du livre */}
              <div className="h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-16 h-16 text-yellow-600 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                  </svg>
                  <p className="text-xs text-yellow-700 font-medium">{book.genre}</p>
                </div>
              </div>

              {/* Contenu */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {book.title}
                  </h3>
                  <div className={`ml-2 w-3 h-3 rounded-full flex-shrink-0 ${
                    book.available_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  par <span className="font-medium">{book.author}</span>
                </p>

                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {book.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>Publié en {book.publication_year}</span>
                  <span>
                    {book.available_quantity}/{book.total_quantity} disponible(s)
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/books/${book.id}`}
                    className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                  >
                    Voir détails →
                  </Link>
                  
                  {book.available_quantity > 0 ? (
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Emprunter
                    </button>
                  ) : (
                    <span className="bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium">
                      Non disponible
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun résultat */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.137 0-4.146.832-5.636 2.364M12 15V3m0 0a9 9 0 11-18 0 9 9 0 0118 0v12" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun livre trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
