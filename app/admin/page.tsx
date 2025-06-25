'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface AdminStats {
  totalBooks: number;
  totalUsers: number;
  totalBorrowings: number;
  overdueBooks: number;
  availableBooks: number;
  borrowedBooks: number;
}

interface RecentActivity {
  id: number;
  type: 'borrow' | 'return' | 'new_user' | 'new_book';
  description: string;
  timestamp: string;
  user?: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats>({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrowings: 0,
    overdueBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0
  });
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de données admin
    const mockStats: AdminStats = {
      totalBooks: 1250,
      totalUsers: 342,
      totalBorrowings: 89,
      overdueBooks: 12,
      availableBooks: 1161,
      borrowedBooks: 89
    };

    const mockActivities: RecentActivity[] = [
      {
        id: 1,
        type: 'borrow',
        description: 'Emprunt du livre "Le Petit Prince"',
        timestamp: '2024-01-25T10:30:00Z',
        user: 'Marie Dubois'
      },
      {
        id: 2,
        type: 'return',
        description: 'Retour du livre "1984"',
        timestamp: '2024-01-25T09:15:00Z',
        user: 'Pierre Martin'
      },
      {
        id: 3,
        type: 'new_user',
        description: 'Nouvel utilisateur inscrit',
        timestamp: '2024-01-25T08:45:00Z',
        user: 'Sophie Laurent'
      },
      {
        id: 4,
        type: 'new_book',
        description: 'Nouveau livre ajouté: "Dune"',
        timestamp: '2024-01-24T16:20:00Z'
      },
      {
        id: 5,
        type: 'borrow',
        description: 'Emprunt du livre "Harry Potter"',
        timestamp: '2024-01-24T14:10:00Z',
        user: 'Jean Dupont'
      }
    ];

    setStats(mockStats);
    setRecentActivities(mockActivities);
    setLoading(false);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'borrow':
        return '📚';
      case 'return':
        return '↩️';
      case 'new_user':
        return '👤';
      case 'new_book':
        return '➕';
      default:
        return '📝';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      return 'Il y a moins d\'une heure';
    } else if (diffHours < 24) {
      return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    } else {
      return date.toLocaleDateString('fr-FR');
    }
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
            🔧 Dashboard Administrateur
          </h1>
          <p className="text-gray-600">
            Vue d&apos;ensemble de la gestion de la bibliothèque
          </p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Livres</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBooks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 6v6m-7-3h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Emprunts Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBorrowings}</p>
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
                <p className="text-sm font-medium text-gray-600">En Retard</p>
                <p className="text-2xl font-bold text-gray-900">{stats.overdueBooks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-emerald-100 text-emerald-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">{stats.availableBooks}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Empruntés</p>
                <p className="text-2xl font-bold text-gray-900">{stats.borrowedBooks}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Actions rapides */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">🚀 Actions Rapides</h2>
              <div className="space-y-3">
                <Link 
                  href="/admin/books/new"
                  className="block w-full bg-yellow-500 hover:bg-yellow-600 text-white text-center py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  ➕ Ajouter un livre
                </Link>
                <Link 
                  href="/admin/books"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  📚 Gérer les livres
                </Link>
                <Link 
                  href="/admin/borrowings"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  📋 Gérer les emprunts
                </Link>
                <Link 
                  href="/admin/users"
                  className="block w-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-center py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  👥 Gérer les utilisateurs
                </Link>
              </div>
            </div>

            {/* Alertes importantes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚠️ Alertes</h3>
              <div className="space-y-3">
                {stats.overdueBooks > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-red-800">
                          {stats.overdueBooks} livre(s) en retard
                        </p>
                        <Link href="/admin/borrowings?filter=overdue" className="text-xs text-red-600 hover:text-red-800">
                          Voir les détails →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Sauvegarde automatique activée
                      </p>
                      <p className="text-xs text-blue-600">
                        Dernière sauvegarde: il y a 2h
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activité récente */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    📊 Activité Récente
                  </h2>
                  <Link 
                    href="/admin/activity"
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                  >
                    Voir tout →
                  </Link>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flow-root">
                  <ul className="-mb-8">
                    {recentActivities.map((activity, activityIdx) => (
                      <li key={activity.id}>
                        <div className="relative pb-8">
                          {activityIdx !== recentActivities.length - 1 ? (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                          ) : null}
                          <div className="relative flex space-x-3">
                            <div>
                              <span className="text-2xl">
                                {getActivityIcon(activity.type)}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">
                                  {activity.description}
                                  {activity.user && (
                                    <span className="font-medium text-gray-900"> par {activity.user}</span>
                                  )}
                                </p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                {formatTimestamp(activity.timestamp)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Graphique de disponibilité */}
            <div className="bg-white rounded-lg shadow-md mt-6 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📈 État de la Collection</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Livres Disponibles</span>
                    <span>{stats.availableBooks} / {stats.totalBooks}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(stats.availableBooks / stats.totalBooks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Livres Empruntés</span>
                    <span>{stats.borrowedBooks} / {stats.totalBooks}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(stats.borrowedBooks / stats.totalBooks) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Taux d&apos;utilisation</span>
                    <span>{Math.round((stats.borrowedBooks / stats.totalBooks) * 100)}%</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(stats.borrowedBooks / stats.totalBooks) * 100}%` }}
                    ></div>
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
