'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Borrowing {
  id: number;
  book_id: number;
  book_title: string;
  book_author: string;
  book_genre: string;
  borrowed_at: string;
  due_date: string;
  returned_at?: string;
  status: 'active' | 'overdue' | 'returned';
  renewal_count: number;
}

export default function MyBorrowingsPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
  const [filteredBorrowings, setFilteredBorrowings] = useState<Borrowing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('due_date');

  useEffect(() => {
    // Simulation de données
    const mockBorrowings: Borrowing[] = [
      {
        id: 1,
        book_id: 1,
        book_title: "Le Petit Prince",
        book_author: "Antoine de Saint-Exupéry",
        book_genre: "Littérature jeunesse",
        borrowed_at: "2024-01-15",
        due_date: "2024-02-15",
        status: "active",
        renewal_count: 0
      },
      {
        id: 2,
        book_id: 2,
        book_title: "1984",
        book_author: "George Orwell",
        book_genre: "Science-fiction",
        borrowed_at: "2024-01-10",
        due_date: "2024-01-25",
        status: "overdue",
        renewal_count: 1
      },
      {
        id: 3,
        book_id: 3,
        book_title: "L'Étranger",
        book_author: "Albert Camus",
        book_genre: "Philosophie",
        borrowed_at: "2023-12-20",
        due_date: "2024-01-20",
        returned_at: "2024-01-18",
        status: "returned",
        renewal_count: 0
      },
      {
        id: 4,
        book_id: 4,
        book_title: "Les Misérables",
        book_author: "Victor Hugo",
        book_genre: "Classique",
        borrowed_at: "2023-12-01",
        due_date: "2024-01-01",
        returned_at: "2023-12-28",
        status: "returned",
        renewal_count: 2
      },
      {
        id: 5,
        book_id: 5,
        book_title: "Harry Potter à l'école des sorciers",
        book_author: "J.K. Rowling",
        book_genre: "Fantasy",
        borrowed_at: "2024-01-20",
        due_date: "2024-02-20",
        status: "active",
        renewal_count: 0
      }
    ];

    setBorrowings(mockBorrowings);
    setFilteredBorrowings(mockBorrowings);
    setLoading(false);
  }, []);

  // Filtrage et tri
  useEffect(() => {
    let filtered = borrowings;

    // Filtrage par statut
    if (filterStatus !== 'all') {
      filtered = filtered.filter(b => b.status === filterStatus);
    }

    // Tri
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'due_date':
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        case 'borrowed_at':
          return new Date(b.borrowed_at).getTime() - new Date(a.borrowed_at).getTime();
        case 'title':
          return a.book_title.localeCompare(b.book_title);
        case 'author':
          return a.book_author.localeCompare(b.book_author);
        default:
          return 0;
      }
    });

    setFilteredBorrowings(filtered);
  }, [borrowings, filterStatus, sortBy]);

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
      b.id === borrowingId ? { 
        ...b, 
        status: 'returned' as const,
        returned_at: new Date().toISOString().split('T')[0]
      } : b
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

  const stats = {
    total: borrowings.length,
    active: borrowings.filter(b => b.status === 'active').length,
    overdue: borrowings.filter(b => b.status === 'overdue').length,
    returned: borrowings.filter(b => b.status === 'returned').length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📚 Mes Emprunts
              </h1>
              <p className="text-gray-600">
                Gérez vos emprunts de livres et suivez vos dates de retour.
              </p>
            </div>
            <Link 
              href="/books"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Emprunter un livre
            </Link>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total emprunts</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">{stats.active}</div>
            <div className="text-sm text-gray-600">En cours</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-1">{stats.overdue}</div>
            <div className="text-sm text-gray-600">En retard</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-gray-600 mb-1">{stats.returned}</div>
            <div className="text-sm text-gray-600">Retournés</div>
          </div>
        </div>

        {/* Filtres et tri */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Filtrer par statut:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">En cours</option>
                <option value="overdue">En retard</option>
                <option value="returned">Retournés</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-gray-700">Trier par:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              >
                <option value="due_date">Date d&apos;échéance</option>
                <option value="borrowed_at">Date d&apos;emprunt</option>
                <option value="title">Titre</option>
                <option value="author">Auteur</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            {filteredBorrowings.length} emprunt(s) affiché(s)
          </div>
        </div>

        {/* Liste des emprunts */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredBorrowings.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun emprunt trouvé</h3>
              <p className="text-gray-500 mb-4">Vous n&apos;avez pas encore emprunté de livres.</p>
              <Link 
                href="/books"
                className="inline-flex items-center bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Découvrir des livres
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Livre
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Renouvellements
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBorrowings.map((borrowing) => {
                    const daysUntilDue = getDaysUntilDue(borrowing.due_date);
                    return (
                      <tr key={borrowing.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              <div className="h-12 w-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                <Link 
                                  href={`/books/${borrowing.book_id}`}
                                  className="hover:text-yellow-600"
                                >
                                  {borrowing.book_title}
                                </Link>
                              </div>
                              <div className="text-sm text-gray-500">
                                par {borrowing.book_author}
                              </div>
                              <div className="text-xs text-gray-400">
                                {borrowing.book_genre}
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>
                            <div>Emprunté: {new Date(borrowing.borrowed_at).toLocaleDateString('fr-FR')}</div>
                            <div className={
                              borrowing.status === 'returned' 
                                ? 'text-gray-500'
                                : daysUntilDue < 0 
                                  ? 'text-red-600' 
                                  : daysUntilDue < 3 
                                    ? 'text-orange-600' 
                                    : 'text-gray-500'
                            }>
                              Retour: {new Date(borrowing.due_date).toLocaleDateString('fr-FR')}
                              {borrowing.status !== 'returned' && (
                                <>
                                  {daysUntilDue >= 0 && ` (dans ${daysUntilDue} jour${daysUntilDue > 1 ? 's' : ''})`}
                                  {daysUntilDue < 0 && ` (${Math.abs(daysUntilDue)} jour${Math.abs(daysUntilDue) > 1 ? 's' : ''} de retard)`}
                                </>
                              )}
                            </div>
                            {borrowing.returned_at && (
                              <div className="text-green-600">
                                Retourné: {new Date(borrowing.returned_at).toLocaleDateString('fr-FR')}
                              </div>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(borrowing.status)}`}>
                            {getStatusText(borrowing.status)}
                          </span>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {borrowing.renewal_count}/2
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {borrowing.status !== 'returned' && (
                            <div className="flex items-center justify-end space-x-2">
                              {borrowing.renewal_count < 2 && borrowing.status === 'active' && (
                                <button
                                  onClick={() => handleRenew(borrowing.id)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Renouveler
                                </button>
                              )}
                              <button
                                onClick={() => handleReturn(borrowing.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Retourner
                              </button>
                            </div>
                          )}
                          {borrowing.status === 'returned' && (
                            <span className="text-gray-400">Terminé</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
