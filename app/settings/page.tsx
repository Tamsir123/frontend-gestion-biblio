'use client';

import { useState } from 'react';
import { 
  BellIcon,
  ShieldCheckIcon,
  UserCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon,
  LanguageIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline';

interface NotificationSettings {
  emailReminders: boolean;
  smsReminders: boolean;
  overdueNotifications: boolean;
  newBookAlerts: boolean;
  systemUpdates: boolean;
  marketingEmails: boolean;
}

interface PrivacySettings {
  showBorrowingHistory: boolean;
  showFavoriteGenres: boolean;
  allowRecommendations: boolean;
  showOnlineStatus: boolean;
}

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'fr' | 'en';
  compactMode: boolean;
  showAvatars: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // État des paramètres
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailReminders: true,
    smsReminders: false,
    overdueNotifications: true,
    newBookAlerts: true,
    systemUpdates: true,
    marketingEmails: false
  });

  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showBorrowingHistory: true,
    showFavoriteGenres: true,
    allowRecommendations: true,
    showOnlineStatus: false
  });

  const [appearance, setAppearance] = useState<AppearanceSettings>({
    theme: 'light',
    language: 'fr',
    compactMode: false,
    showAvatars: true
  });

  // État des formulaires
  const [profileForm, setProfileForm] = useState({
    name: 'Jean Dupont',
    email: 'jean.dupont@2ie-edu.org',
    phone: '+226 70 12 34 56',
    studentId: '2IE2024001',
    department: 'Informatique',
    year: '3ème année'
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (section: string) => {
    setSaveMessage(`Paramètres ${section} sauvegardés avec succès !`);
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setSaveMessage('Les mots de passe ne correspondent pas !');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }
    setSaveMessage('Mot de passe mis à jour avec succès !');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: UserCircleIcon },
    { id: 'security', label: 'Sécurité', icon: ShieldCheckIcon },
    { id: 'notifications', label: 'Notifications', icon: BellIcon },
    { id: 'privacy', label: 'Confidentialité', icon: EyeIcon },
    { id: 'appearance', label: 'Apparence', icon: SunIcon }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        <p className="text-gray-600 mt-2">Gérez vos préférences et paramètres de compte</p>
      </div>

      {/* Message de sauvegarde */}
      {saveMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-800">{saveMessage}</span>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation des onglets */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border">
            {/* Onglet Profil */}
            {activeTab === 'profile' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations du profil</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="h-20 w-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="h-12 w-12 text-gray-500" />
                    </div>
                    <div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                        Changer la photo
                      </button>
                      <p className="text-sm text-gray-500 mt-1">JPG, PNG ou GIF, max 2MB</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="relative">
                        <EnvelopeIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                      <div className="relative">
                        <DevicePhoneMobileIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                        <input
                          type="tel"
                          value={profileForm.phone}
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ID Étudiant</label>
                      <input
                        type="text"
                        value={profileForm.studentId}
                        disabled
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Département</label>
                      <select
                        value={profileForm.department}
                        onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Informatique">Informatique</option>
                        <option value="Génie Civil">Génie Civil</option>
                        <option value="Électronique">Électronique</option>
                        <option value="Mécanique">Mécanique</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Année d&apos;étude</label>
                      <select
                        value={profileForm.year}
                        onChange={(e) => setProfileForm({...profileForm, year: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="1ère année">1ère année</option>
                        <option value="2ème année">2ème année</option>
                        <option value="3ème année">3ème année</option>
                        <option value="4ème année">4ème année</option>
                        <option value="5ème année">5ème année</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave('de profil')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Sécurité */}
            {activeTab === 'security' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sécurité du compte</h2>
                
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600" />
                      <p className="text-yellow-800">
                        Dernière connexion : 20 décembre 2024 à 14:30
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Changer le mot de passe</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Mot de passe actuel</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showCurrentPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau mot de passe</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showNewPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirmer le nouveau mot de passe</label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeSlashIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handlePasswordChange}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        >
                          Mettre à jour le mot de passe
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Authentification à deux facteurs</h3>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 mb-4">
                        Activez l&apos;authentification à deux facteurs pour une sécurité renforcée.
                      </p>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                        Activer 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Notifications */}
            {activeTab === 'notifications' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences de notification</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notifications par email</h3>
                    <div className="space-y-4">
                      {Object.entries(notifications).map(([key, value]) => {
                        const labels = {
                          emailReminders: 'Rappels d\'échéance par email',
                          smsReminders: 'Rappels d\'échéance par SMS',
                          overdueNotifications: 'Notifications de retard',
                          newBookAlerts: 'Alertes nouveaux livres',
                          systemUpdates: 'Mises à jour système',
                          marketingEmails: 'Emails marketing'
                        };
                        
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-gray-700">{labels[key as keyof typeof labels]}</span>
                            <button
                              onClick={() => setNotifications({...notifications, [key]: !value})}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave('de notification')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Confidentialité */}
            {activeTab === 'privacy' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres de confidentialité</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Visibilité du profil</h3>
                    <div className="space-y-4">
                      {Object.entries(privacy).map(([key, value]) => {
                        const labels = {
                          showBorrowingHistory: 'Afficher l\'historique d\'emprunts',
                          showFavoriteGenres: 'Afficher les genres préférés',
                          allowRecommendations: 'Autoriser les recommandations',
                          showOnlineStatus: 'Afficher le statut en ligne'
                        };
                        
                        return (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-gray-700">{labels[key as keyof typeof labels]}</span>
                            <button
                              onClick={() => setPrivacy({...privacy, [key]: !value})}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                value ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave('de confidentialité')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Onglet Apparence */}
            {activeTab === 'appearance' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Préférences d&apos;apparence</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Thème</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'light', label: 'Clair', icon: SunIcon },
                        { value: 'dark', label: 'Sombre', icon: MoonIcon },
                        { value: 'system', label: 'Système', icon: ComputerDesktopIcon }
                      ].map((theme) => {
                        const IconComponent = theme.icon;
                        return (
                          <button
                            key={theme.value}
                            onClick={() => setAppearance({...appearance, theme: theme.value as 'light' | 'dark' | 'system'})}
                            className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                              appearance.theme === theme.value
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <IconComponent className="h-6 w-6" />
                            <span className="text-sm font-medium">{theme.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Langue</h3>
                    <div className="flex items-center gap-3">
                      <LanguageIcon className="h-5 w-5 text-gray-400" />
                      <select
                        value={appearance.language}
                        onChange={(e) => setAppearance({...appearance, language: e.target.value as 'fr' | 'en'})}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Options d&apos;affichage</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Mode compact</span>
                        <button
                          onClick={() => setAppearance({...appearance, compactMode: !appearance.compactMode})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            appearance.compactMode ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              appearance.compactMode ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Afficher les avatars</span>
                        <button
                          onClick={() => setAppearance({...appearance, showAvatars: !appearance.showAvatars})}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            appearance.showAvatars ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              appearance.showAvatars ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleSave('d\'apparence')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
