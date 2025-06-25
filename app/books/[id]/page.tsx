'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

interface Review {
  id: number;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export default function BookDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    // Simulation de récupération des données
    const mockBook: Book = {
      id: Number(params.id),
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      genre: "Littérature jeunesse",
      description: "L'histoire touchante d'un petit prince qui voyage de planète en planète à la recherche du sens de la vie et de l'amitié. Ce conte philosophique, qui s'adresse autant aux enfants qu'aux adultes, explore les thèmes de l'amour, de l'amitié, de la solitude et du sens de l'existence à travers les yeux innocents d'un enfant venu d'une petite planète.",
      available_quantity: 3,
      total_quantity: 5,
      publication_year: 1943,
      isbn: "978-2-07-040853-7"
    };

    const mockReviews: Review[] = [
      {
        id: 1,
        user_name: "Marie Dubois",
        rating: 5,
        comment: "Un livre magnifique qui m'a fait réfléchir sur l'essentiel de la vie. À lire absolument !",
        created_at: "2024-01-15"
      },
      {
        id: 2,
        user_name: "Pierre Martin",
        rating: 4,
        comment: "Très beau conte philosophique. Les illustrations sont également très belles.",
        created_at: "2024-01-10"
      },
      {
        id: 3,
        user_name: "Sophie Laurent",
        rating: 5,
        comment: "Un classique intemporel. Chaque relecture apporte de nouvelles réflexions.",
        created_at: "2024-01-05"
      }
    ];

    setBook(mockBook);
    setReviews(mockReviews);
    setLoading(false);
  }, [params.id]);

  const handleBorrow = () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
    // Logique d'emprunt
    alert('Emprunt effectué avec succès !');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'ajout d'avis
    const review: Review = {
      id: Date.now(),
      user_name: "Utilisateur actuel",
      rating: newReview.rating,
      comment: newReview.comment,
      created_at: new Date().toISOString().split('T')[0]
    };
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '' });
    setShowReviewForm(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Livre non trouvé</h2>
          <Link href="/books" className="text-yellow-600 hover:text-yellow-700">
            ← Retour au catalogue
          </Link>
        </div>
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-gray-700">Accueil</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li><Link href="/books" className="text-gray-500 hover:text-gray-700">Catalogue</Link></li>
            <li><span className="text-gray-400">/</span></li>
            <li className="text-gray-900 font-medium">{book.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            
            {/* Informations du livre */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                
                {/* Image du livre */}
                <div className="md:w-48 h-64 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-yellow-600 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                    </svg>
                    <p className="text-sm text-yellow-700 font-medium">{book.genre}</p>
                  </div>
                </div>

                {/* Détails */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{book.title}</h1>
                      <p className="text-xl text-gray-600">par {book.author}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full ${
                      book.available_quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                  </div>

                  {/* Évaluations */}
                  <div className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                      {renderStars(Math.round(averageRating))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {averageRating.toFixed(1)} ({reviews.length} avis)
                    </span>
                  </div>

                  {/* Métadonnées */}
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium text-gray-700">Genre:</span>
                      <span className="ml-2 text-gray-600">{book.genre}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Publication:</span>
                      <span className="ml-2 text-gray-600">{book.publication_year}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">ISBN:</span>
                      <span className="ml-2 text-gray-600">{book.isbn}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Disponibilité:</span>
                      <span className="ml-2 text-gray-600">
                        {book.available_quantity}/{book.total_quantity} exemplaires
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 leading-relaxed">{book.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section Avis */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Avis des lecteurs ({reviews.length})
                </h2>
                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Donner mon avis
                </button>
              </div>

              {/* Formulaire d'avis */}
              {showReviewForm && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note
                      </label>
                      <div className="flex items-center space-x-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                            className={`w-6 h-6 ${
                              i < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Commentaire
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        rows={3}
                        placeholder="Partagez votre opinion sur ce livre..."
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Publier l&apos;avis
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="text-gray-600 hover:text-gray-700"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Liste des avis */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-700">
                            {review.user_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.user_name}</p>
                          <div className="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.created_at}</span>
                    </div>
                    <p className="text-gray-600 ml-13">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              
              {book.available_quantity > 0 ? (
                <button
                  onClick={handleBorrow}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-3"
                >
                  📚 Emprunter ce livre
                </button>
              ) : (
                <div className="w-full bg-gray-200 text-gray-500 font-semibold py-3 px-4 rounded-lg text-center mb-3">
                  Non disponible
                </div>
              )}

              <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors mb-4">
                ❤️ Ajouter aux favoris
              </button>

              {/* Statut de disponibilité */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Disponibilité</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span>{book.total_quantity} exemplaires</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Disponibles:</span>
                    <span className={book.available_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                      {book.available_quantity} exemplaires
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Empruntés:</span>
                    <span>{book.total_quantity - book.available_quantity} exemplaires</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
