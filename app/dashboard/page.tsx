'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Borrowing {
  id: number;
  book_title: string;
  book_author: string;
  borrowed_at: string;
  due_date: string;
  status: 'active' | 'overdue' | 'returned';
  renewal_count: number;
}

interface Recommendation {
  id: number;
  title: string;
  author: string;
  genre: string;
  reason: string;
}

export default function DashboardPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [stats, setStats] = useState({
    totalBorrowings: 0,
    activeBorrowings: 0,
    overdueBorrowings: 0,
    totalBooksRead: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données
    const mockBorrowings: Borrowing[] = [
      {
        id: 1,
        book_title: "Le Petit Prince",
        book_author: "Antoine de Saint-Exupéry",
        borrowed_at: "2024-01-15",
        due_date: "2024-02-15",
        status: "active",
        renewal_count: 0
      },
      {
        id: 2,
        book_title: "1984",
        book_author: "George Orwell",
        borrowed_at: "2024-01-10",
        due_date: "2024-01-25",
        status: "overdue",
        renewal_count: 1
      },
      {
        id: 3,
        book_title: "L'Étranger",
        book_author: "Albert Camus",
        borrowed_at: "2023-12-20",
        due_date: "2024-01-20",
        status: "returned",
        renewal_count: 0
      }
    ];

    const mockRecommendations: Recommendation[] = [
      {
        id: 1,
        title: "Les Misérables",
        author: "Victor Hugo",
        genre: "Classique",
        reason: "Basé sur vos lectures de littérature française"
      },
      {
        id: 2,
        title: "Brave New World",
        author: "Aldous Huxley",
        genre: "Science-fiction",
        reason: "Vous avez aimé 1984"
      },
      {
        id: 3,
        title: "La Peste",
        author: "Albert Camus",
        genre: "Philosophie",
        reason: "Autre œuvre d'Albert Camus"
      }
    ];

    const mockStats = {
      totalBorrowings: 15,
      activeBorrowings: 2,
      overdueBorrowings: 1,
      totalBooksRead: 23
    };

    setBorrowings(mockBorrowings);
    setRecommendations(mockRecommendations);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'returned':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'En cours';
      case 'overdue':
        return 'En retard';
      case 'returned':
        return 'Retourné';
      default:
        return 'Inconnu';
    }
  };

  const handleReturn = (borrowingId: number) => {
    setBorrowings(borrowings.map(b => 
      b.id === borrowingId ? { ...b, status: 'returned' as const } : b
    ));
  };

  const handleRenew = (borrowingId: number) => {
    setBorrowings(borrowings.map(b => 
      b.id === borrowingId ? { 
        ...b, 
        renewal_count: b.renewal_count + 1,
        due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      } : b
    ));
  };

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            📊 Mon Tableau de Bord
          </h1>
          <p className="text-gray-600">
            Bienvenue ! Voici un aperçu de votre activité de lecture.
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Livres lus</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBooksRead}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emprunts actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeBorrowings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 text-red-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overdueBorrowings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total emprunts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBorrowings}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Mes emprunts actuels */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    📚 Mes Emprunts Actuels
                  </h2>
                  <Link 
                    href="/my-borrowings"
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                  >
                    Voir tout →
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                {borrowings.filter(b => b.status !== 'returned').length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <p className="text-gray-500">Aucun emprunt en cours</p>
                    <Link 
                      href="/books"
                      className="inline-block mt-2 text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      Découvrir des livres
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {borrowings.filter(b => b.status !== 'returned').map((borrowing) => {
                      const daysUntilDue = getDaysUntilDue(borrowing.due_date);
                      return (
                        <div key={borrowing.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="font-semibold text-gray-900">{borrowing.book_title}</h3>
                              <p className="text-sm text-gray-600">par {borrowing.book_author}</p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(borrowing.status)}`}>
                              {getStatusText(borrowing.status)}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <div className="text-gray-600">
                              <p>Emprunté le: {new Date(borrowing.borrowed_at).toLocaleDateString('fr-FR')}</p>
                              <p className={daysUntilDue < 0 ? 'text-red-600' : daysUntilDue < 3 ? 'text-orange-600' : ''}>
                                Retour: {new Date(borrowing.due_date).toLocaleDateString('fr-FR')}
                                {daysUntilDue >= 0 && ` (dans ${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''})`}
                                {daysUntilDue < 0 && ` (en retard de ${Math.abs(daysUntilDue)} jour${Math.abs(daysUntilDue) > 1 ? 's' : ''})`}
                              </p>
                            </div>
                            
                            <div className="flex space-x-2">
                              {borrowing.renewal_count < 2 && borrowing.status === 'active' && (
                                <button
                                  onClick={() => handleRenew(borrowing.id)}
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                >
                                  Renouveler
                                </button>
                              )}
                              <button
                                onClick={() => handleReturn(borrowing.id)}
                                className="text-green-600 hover:text-green-700 text-sm font-medium"
                              >
                                Retourner
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Actions rapides */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🚀 Actions Rapides</h3>
              <div className="space-y-3">
                <Link 
                  href="/books"
                  className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Parcourir les livres
                </Link>
                <Link 
                  href="/my-borrowings"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Mes emprunts
                </Link>
                <Link 
                  href="/profile"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Mon profil
                </Link>
              </div>
            </div>

            {/* Recommandations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 Recommandations</h3>
              <div className="space-y-3">
                {recommendations.slice(0, 3).map((rec) => (
                  <div key={rec.id} className="border border-gray-200 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 text-sm">{rec.title}</h4>
                    <p className="text-xs text-gray-600">par {rec.author}</p>
                    <p className="text-xs text-gray-500 mt-1">{rec.reason}</p>
                    <Link 
                      href={`/books/${rec.id}`}
                      className="text-yellow-600 hover:text-yellow-700 text-xs font-medium mt-2 inline-block"
                    >
                      Voir le livre →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔔 Notifications</h3>
              <div className="space-y-3">
                {stats.overdueBorrowings > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-800">
                      Vous avez {stats.overdueBorrowings} livre(s) en retard.
                    </p>
                  </div>
                )}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    3 nouveaux livres de science-fiction sont disponibles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
