'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  EyeIcon,
  PencilIcon,
  TrashIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface User {
  id: number;
  name: string;
  email: string;
  studentId: string;
  role: 'student' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  registrationDate: string;
  lastLogin: string;
  borrowedBooks: number;
  overdueBooks: number;
  totalBorrowings: number;
  department: string;
}

const mockUsers: User[] = [
  {
    id: 1,
    name: "Jean Dupont",
    email: "jean.dupont@2ie-edu.org",
    studentId: "2IE2024001",
    role: 'student',
    status: 'active',
    registrationDate: "2024-09-15",
    lastLogin: "2024-12-20",
    borrowedBooks: 3,
    overdueBooks: 0,
    totalBorrowings: 12,
    department: "Informatique"
  },
  {
    id: 2,
    name: "Marie Martin",
    email: "marie.martin@2ie-edu.org",
    studentId: "2IE2024002",
    role: 'student',
    status: 'suspended',
    registrationDate: "2024-09-20",
    lastLogin: "2024-12-18",
    borrowedBooks: 1,
    overdueBooks: 2,
    totalBorrowings: 8,
    department: "Génie Civil"
  },
  {
    id: 3,
    name: "Ahmed Traore",
    email: "ahmed.traore@2ie-edu.org",
    studentId: "2IE2024003",
    role: 'student',
    status: 'pending',
    registrationDate: "2024-12-19",
    lastLogin: "2024-12-19",
    borrowedBooks: 0,
    overdueBooks: 0,
    totalBorrowings: 0,
    department: "Électronique"
  },
  {
    id: 4,
    name: "Fatima Ouattara",
    email: "fatima.ouattara@2ie-edu.org",
    studentId: "ADMIN001",
    role: 'admin',
    status: 'active',
    registrationDate: "2024-01-10",
    lastLogin: "2024-12-20",
    borrowedBooks: 2,
    overdueBooks: 0,
    totalBorrowings: 25,
    department: "Administration"
  }
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const departments = Array.from(new Set(users.map(user => user.department)));

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment;
    
    return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'active': { bg: 'bg-green-100', text: 'text-green-800', label: 'Actif', icon: CheckCircleIcon },
      'suspended': { bg: 'bg-red-100', text: 'text-red-800', label: 'Suspendu', icon: XCircleIcon },
      'pending': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente', icon: ClockIcon }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    return role === 'admin' ? (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
        <UserCircleIcon className="h-3 w-3" />
        Administrateur
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
        <UserCircleIcon className="h-3 w-3" />
        Étudiant
      </span>
    );
  };

  const handleDeleteUser = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      setUsers(users.filter(user => user.id !== selectedUserId));
      setShowDeleteModal(false);
      setSelectedUserId(null);
    }
  };

  const handleStatusChange = (userId: number, newStatus: 'active' | 'suspended') => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    suspendedUsers: users.filter(u => u.status === 'suspended').length,
    pendingUsers: users.filter(u => u.status === 'pending').length,
    totalStudents: users.filter(u => u.role === 'student').length,
    totalAdmins: users.filter(u => u.role === 'admin').length
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
            <p className="text-gray-600 mt-2">Gérez les comptes étudiants et administrateurs</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <PlusIcon className="h-5 w-5" />
            Ajouter un utilisateur
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">Total</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">Actifs</p>
            <p className="text-2xl font-bold text-green-600">{stats.activeUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">Suspendus</p>
            <p className="text-2xl font-bold text-red-600">{stats.suspendedUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">En attente</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingUsers}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">Étudiants</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalStudents}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <p className="text-sm font-medium text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600">{stats.totalAdmins}</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les rôles</option>
              <option value="student">Étudiants</option>
              <option value="admin">Administrateurs</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="suspended">Suspendu</option>
              <option value="pending">En attente</option>
            </select>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">Tous les départements</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table des utilisateurs */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Étudiant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Département
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Emprunts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dernière connexion
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.studentId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div>Actuels: {user.borrowedBooks}</div>
                      <div className="text-xs text-red-600">En retard: {user.overdueBooks}</div>
                      <div className="text-xs text-gray-500">Total: {user.totalBorrowings}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button 
                          onClick={() => handleStatusChange(user.id, 'suspended')}
                          className="text-orange-600 hover:text-orange-900 p-1 rounded"
                          title="Suspendre"
                        >
                          <XCircleIcon className="h-4 w-4" />
                        </button>
                      ) : user.status === 'suspended' ? (
                        <button 
                          onClick={() => handleStatusChange(user.id, 'active')}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Réactiver"
                        >
                          <CheckCircleIcon className="h-4 w-4" />
                        </button>
                      ) : null}
                      <button 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun utilisateur trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirmer la suppression</h3>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible et supprimera également son historique d&apos;emprunts.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
