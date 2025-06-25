'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  EyeIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon,
  CalendarIcon,
  UserIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';

interface Borrowing {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  studentId: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  isbn: string;
  borrowDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'active' | 'returned' | 'overdue' | 'renewed';
  renewalCount: number;
  maxRenewals: number;
  notes?: string;
  daysOverdue?: number;
}

const mockBorrowings: Borrowing[] = [
  {
    id: 1,
    userId: 1,
    userName: "Jean Dupont",
    userEmail: "jean.dupont@2ie-edu.org",
    studentId: "2IE2024001",
    bookId: 1,
    bookTitle: "Introduction aux Algorithmes",
    bookAuthor: "Thomas H. Cormen",
    isbn: "978-2-7440-7922-1",
    borrowDate: "2024-11-15",
    dueDate: "2024-12-15",
    status: 'active',
    renewalCount: 0,
    maxRenewals: 2
  },
  {
    id: 2,
    userId: 2,
    userName: "Marie Martin",
    userEmail: "marie.martin@2ie-edu.org",
    studentId: "2IE2024002",
    bookId: 2,
    bookTitle: "Mathématiques Appliquées",
    bookAuthor: "Jean Dupont",
    isbn: "978-2-7440-8923-2",
    borrowDate: "2024-10-10",
    dueDate: "2024-11-10",
    status: 'overdue',
    renewalCount: 1,
    maxRenewals: 2,
    daysOverdue: 40,
    notes: "Rappel envoyé le 15/11/2024"
  },
  {
    id: 3,
    userId: 1,
    userName: "Jean Dupont",
    userEmail: "jean.dupont@2ie-edu.org",
    studentId: "2IE2024001",
    bookId: 3,
    bookTitle: "Physique Quantique",
    bookAuthor: "Marie Martin",
    isbn: "978-2-7440-9924-3",
    borrowDate: "2024-11-01",
    dueDate: "2024-12-01",
    returnDate: "2024-11-28",
    status: 'returned',
    renewalCount: 0,
    maxRenewals: 2
  },
  {
    id: 4,
    userId: 3,
    userName: "Ahmed Traore",
    userEmail: "ahmed.traore@2ie-edu.org",
    studentId: "2IE2024003",
    bookId: 1,
    bookTitle: "Introduction aux Algorithmes",
    bookAuthor: "Thomas H. Cormen",
    isbn: "978-2-7440-7922-1",
    borrowDate: "2024-12-01",
    dueDate: "2025-01-01",
    status: 'renewed',
    renewalCount: 1,
    maxRenewals: 2
  }
];

export default function AdminBorrowingsPage() {
  const [borrowings, setBorrowings] = useState<Borrowing[]>(mockBorrowings);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedBorrowingId, setSelectedBorrowingId] = useState<number | null>(null);

  const filteredBorrowings = borrowings.filter(borrowing => {
    const matchesSearch = borrowing.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrowing.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrowing.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrowing.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         borrowing.isbn.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || borrowing.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (borrowing: Borrowing) => {
    const statusConfig = {
      'active': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'En cours', icon: ClockIcon },
      'returned': { bg: 'bg-green-100', text: 'text-green-800', label: 'Rendu', icon: CheckCircleIcon },
      'overdue': { bg: 'bg-red-100', text: 'text-red-800', label: `En retard (${borrowing.daysOverdue}j)`, icon: ExclamationTriangleIcon },
      'renewed': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Renouvelé', icon: ArrowPathIcon }
    };
    
    const config = statusConfig[borrowing.status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const handleForceReturn = (id: number) => {
    setSelectedBorrowingId(id);
    setShowReturnModal(true);
  };

  const confirmReturn = () => {
    if (selectedBorrowingId) {
      setBorrowings(borrowings.map(borrowing => 
        borrowing.id === selectedBorrowingId 
          ? { ...borrowing, status: 'returned', returnDate: new Date().toISOString().split('T')[0] }
          : borrowing
      ));
      setShowReturnModal(false);
      setSelectedBorrowingId(null);
    }
  };

  const handleRenewal = (id: number) => {
    setBorrowings(borrowings.map(borrowing => {
      if (borrowing.id === id && borrowing.renewalCount < borrowing.maxRenewals) {
        const newDueDate = new Date(borrowing.dueDate);
        newDueDate.setDate(newDueDate.getDate() + 30);
        return {
          ...borrowing,
          status: 'renewed',
          renewalCount: borrowing.renewalCount + 1,
          dueDate: newDueDate.toISOString().split('T')[0]
        };
      }
      return borrowing;
    }));
  };

  const stats = {
    totalBorrowings: borrowings.length,
    activeBorrowings: borrowings.filter(b => b.status === 'active' || b.status === 'renewed').length,
    overdueBorrowings: borrowings.filter(b => b.status === 'overdue').length,
    returnedBorrowings: borrowings.filter(b => b.status === 'returned').length
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Emprunts</h1>
            <p className="text-gray-600 mt-2">Suivez et gérez tous les emprunts de livres</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total des emprunts</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBorrowings}</p>
              </div>
              <BookOpenIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-blue-600">{stats.activeBorrowings}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-red-600">{stats.overdueBorrowings}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rendus</p>
                <p className="text-2xl font-bold text-green-600">{stats.returnedBorrowings}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par utilisateur, livre ou ISBN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">En cours</option>
              <option value="overdue">En retard</option>
              <option value="renewed">Renouvelé</option>
              <option value="returned">Rendu</option>
            </select>
            <div className="flex items-center justify-end">
              <span className="text-sm text-gray-600">{filteredBorrowings.length} résultat(s)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table des emprunts */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emprunteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Livre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d&apos;emprunt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d&apos;échéance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Renouvellements
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBorrowings.map((borrowing) => {
                const daysUntilDue = getDaysUntilDue(borrowing.dueDate);
                const isNearDue = daysUntilDue <= 3 && daysUntilDue > 0 && borrowing.status !== 'returned';
                
                return (
                  <tr key={borrowing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <UserIcon className="h-4 w-4 text-gray-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{borrowing.userName}</div>
                          <div className="text-sm text-gray-500">{borrowing.studentId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{borrowing.bookTitle}</div>
                      <div className="text-sm text-gray-500">{borrowing.bookAuthor}</div>
                      <div className="text-xs text-gray-400">{borrowing.isbn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                        {new Date(borrowing.borrowDate).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm ${
                        borrowing.status === 'overdue' ? 'text-red-600' : 
                        isNearDue ? 'text-yellow-600' : 
                        'text-gray-900'
                      }`}>
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(borrowing.dueDate).toLocaleDateString('fr-FR')}
                        {isNearDue && borrowing.status !== 'returned' && (
                          <span className="ml-1 text-xs">({daysUntilDue}j)</span>
                        )}
                      </div>
                      {borrowing.returnDate && (
                        <div className="text-xs text-green-600 mt-1">
                          Rendu le {new Date(borrowing.returnDate).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(borrowing)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {borrowing.renewalCount} / {borrowing.maxRenewals}
                      </div>
                      {borrowing.renewalCount > 0 && (
                        <div className="text-xs text-yellow-600">Renouvelé</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded" title="Voir détails">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {(borrowing.status === 'active' || borrowing.status === 'renewed') && (
                          <>
                            <button 
                              onClick={() => handleForceReturn(borrowing.id)}
                              className="text-green-600 hover:text-green-900 p-1 rounded"
                              title="Forcer le retour"
                            >
                              <CheckCircleIcon className="h-4 w-4" />
                            </button>
                            {borrowing.renewalCount < borrowing.maxRenewals && (
                              <button 
                                onClick={() => handleRenewal(borrowing.id)}
                                className="text-yellow-600 hover:text-yellow-900 p-1 rounded"
                                title="Renouveler"
                              >
                                <ArrowPathIcon className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        )}
                        {borrowing.status === 'overdue' && (
                          <button 
                            className="text-red-600 hover:text-red-900 p-1 rounded"
                            title="Envoyer rappel"
                          >
                            <ExclamationTriangleIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredBorrowings.length === 0 && (
          <div className="text-center py-12">
            <BookOpenIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun emprunt trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmation de retour forcé */}
      {showReturnModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Forcer le retour</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir marquer ce livre comme rendu ? Cette action mettra à jour le statut de l&apos;emprunt.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowReturnModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <XMarkIcon className="h-4 w-4" />
                Annuler
              </button>
              <button
                onClick={confirmReturn}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <CheckCircleIcon className="h-4 w-4" />
                Confirmer le retour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
