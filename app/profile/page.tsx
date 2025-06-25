'use client';

import { useState, useEffect } from 'react';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: 'student' | 'admin';
  created_at: string;
  total_borrowings: number;
  current_borrowings: number;
  favorite_genres: string[];
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation de récupération du profil utilisateur
    const mockUser: UserProfile = {
      id: 1,
      name: "Marie Dubois",
      email: "marie.dubois@university.edu",
      role: "student",
      created_at: "2023-09-15",
      total_borrowings: 23,
      current_borrowings: 2,
      favorite_genres: ["Science-fiction", "Philosophie", "Littérature française"]
    };

    setUser(mockUser);
    setFormData({
      name: mockUser.name,
      email: mockUser.email,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour du profil
    if (user) {
      setUser({
        ...user,
        name: formData.name,
        email: formData.email
      });
      setIsEditing(false);
      // Reset password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Utilisateur non trouvé</h2>
          <p className="text-gray-600">Veuillez vous reconnecter.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            👤 Mon Profil
          </h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et paramètres de compte.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Informations principales */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Informations Personnelles
                  </h2>
                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-yellow-600 hover:text-yellow-700 font-medium"
                    >
                      ✏️ Modifier
                    </button>
                  ) : null}
                </div>
              </div>
              
              <div className="p-6">
                {!isEditing ? (
                  // Mode affichage
                  <div className="space-y-6">
                    <div className="flex items-center">
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-yellow-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium mt-2 ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nom complet
                        </label>
                        <p className="text-gray-900">{user.name}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Adresse e-mail
                        </label>
                        <p className="text-gray-900">{user.email}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Rôle
                        </label>
                        <p className="text-gray-900">
                          {user.role === 'admin' ? 'Administrateur' : 'Étudiant'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Membre depuis
                        </label>
                        <p className="text-gray-900">
                          {new Date(user.created_at).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Mode édition
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse e-mail
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    
                    <hr className="my-6" />
                    
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Changer le mot de passe (optionnel)
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe actuel
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le nouveau mot de passe
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Sauvegarder
                      </button>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-medium transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Statistiques de lecture */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Mes Statistiques</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total emprunts:</span>
                  <span className="font-semibold text-gray-900">{user.total_borrowings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">En cours:</span>
                  <span className="font-semibold text-gray-900">{user.current_borrowings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taux de retour:</span>
                  <span className="font-semibold text-green-600">98%</span>
                </div>
              </div>
            </div>

            {/* Genres préférés */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">❤️ Genres Préférés</h3>
              <div className="space-y-2">
                {user.favorite_genres.map((genre, index) => (
                  <span
                    key={index}
                    className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left text-red-600 hover:text-red-700 font-medium">
                  🗑️ Supprimer mon compte
                </button>
                <button className="w-full text-left text-gray-600 hover:text-gray-700 font-medium">
                  📤 Exporter mes données
                </button>
                <button className="w-full text-left text-gray-600 hover:text-gray-700 font-medium">
                  🔒 Confidentialité
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
