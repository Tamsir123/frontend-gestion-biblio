'use client';

import { useState } from 'react';
import { 
  BellIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  EyeIcon,
  TrashIcon,
  CalendarIcon,
  BookOpenIcon,
  UserIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface Notification {
  id: number;
  type: 'reminder' | 'overdue' | 'approval' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionRequired?: boolean;
  relatedEntity?: {
    type: 'book' | 'user' | 'borrowing';
    id: number;
    name: string;
  };
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'overdue',
    title: 'Livre en retard',
    message: 'Le livre "Introduction aux Algorithmes" est en retard de 5 jours. Veuillez le retourner rapidement.',
    timestamp: '2024-12-20T10:30:00Z',
    isRead: false,
    actionRequired: true,
    relatedEntity: {
      type: 'book',
      id: 1,
      name: 'Introduction aux Algorithmes'
    }
  },
  {
    id: 2,
    type: 'reminder',
    title: 'Échéance dans 3 jours',
    message: 'Le livre "Mathématiques Appliquées" doit être rendu le 23 décembre 2024.',
    timestamp: '2024-12-20T09:15:00Z',
    isRead: false,
    actionRequired: false,
    relatedEntity: {
      type: 'book',
      id: 2,
      name: 'Mathématiques Appliquées'
    }
  },
  {
    id: 3,
    type: 'success',
    title: 'Emprunt confirmé',
    message: 'Votre emprunt du livre "Physique Quantique" a été confirmé. Date de retour : 15 janvier 2025.',
    timestamp: '2024-12-19T14:20:00Z',
    isRead: true,
    actionRequired: false,
    relatedEntity: {
      type: 'book',
      id: 3,
      name: 'Physique Quantique'
    }
  },
  {
    id: 4,
    type: 'info',
    title: 'Nouveaux livres disponibles',
    message: '25 nouveaux livres ont été ajoutés au catalogue dans la catégorie "Intelligence Artificielle".',
    timestamp: '2024-12-18T16:45:00Z',
    isRead: true,
    actionRequired: false
  },
  {
    id: 5,
    type: 'warning',
    title: 'Limite d\'emprunts atteinte',
    message: 'Vous avez atteint votre limite de 5 emprunts simultanés. Retournez un livre pour en emprunter d\'autres.',
    timestamp: '2024-12-17T11:30:00Z',
    isRead: true,
    actionRequired: true
  },
  {
    id: 6,
    type: 'approval',
    title: 'Renouvellement approuvé',
    message: 'Votre demande de renouvellement pour "Introduction aux Algorithmes" a été approuvée.',
    timestamp: '2024-12-16T13:15:00Z',
    isRead: true,
    actionRequired: false
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'action-required'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      'reminder': { icon: BellIcon, color: 'text-blue-600' },
      'overdue': { icon: ExclamationTriangleIcon, color: 'text-red-600' },
      'approval': { icon: CheckCircleIcon, color: 'text-green-600' },
      'info': { icon: InformationCircleIcon, color: 'text-blue-600' },
      'success': { icon: CheckCircleIcon, color: 'text-green-600' },
      'warning': { icon: ExclamationTriangleIcon, color: 'text-yellow-600' }
    };
    
    const config = iconMap[type as keyof typeof iconMap] || iconMap.info;
    const IconComponent = config.icon;
    
    return <IconComponent className={`h-6 w-6 ${config.color}`} />;
  };

  const getNotificationBadge = (type: string) => {
    const badgeMap = {
      'reminder': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Rappel' },
      'overdue': { bg: 'bg-red-100', text: 'text-red-800', label: 'Retard' },
      'approval': { bg: 'bg-green-100', text: 'text-green-800', label: 'Approuvé' },
      'info': { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Info' },
      'success': { bg: 'bg-green-100', text: 'text-green-800', label: 'Succès' },
      'warning': { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Attention' }
    };
    
    const config = badgeMap[type as keyof typeof badgeMap] || badgeMap.info;
    
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, isRead: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const clearAllRead = () => {
    setNotifications(notifications.filter(notif => !notif.isRead));
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = 
      filter === 'all' || 
      (filter === 'unread' && !notification.isRead) ||
      (filter === 'action-required' && notification.actionRequired);
    
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    
    return matchesFilter && matchesType;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;
  const actionRequiredCount = notifications.filter(n => n.actionRequired && !n.isRead).length;

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Il y a moins d\'une heure';
    } else if (diffInHours < 24) {
      return `Il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-600 mt-2">
              {unreadCount > 0 && (
                <span className="text-red-600 font-medium">
                  {unreadCount} notification{unreadCount > 1 ? 's' : ''} non lue{unreadCount > 1 ? 's' : ''}
                </span>
              )}
              {unreadCount === 0 && "Toutes vos notifications sont à jour"}
            </p>
          </div>
          <div className="flex gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <EyeIcon className="h-4 w-4" />
                Tout marquer comme lu
              </button>
            )}
            <button
              onClick={clearAllRead}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <TrashIcon className="h-4 w-4" />
              Supprimer les lues
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <BellIcon className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Non lues</p>
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              </div>
              <BellIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Action requise</p>
                <p className="text-2xl font-bold text-red-600">{actionRequiredCount}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En retard</p>
                <p className="text-2xl font-bold text-red-600">
                  {notifications.filter(n => n.type === 'overdue').length}
                </p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Filtrer :</span>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'unread' | 'action-required')}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Toutes</option>
                <option value="unread">Non lues</option>
                <option value="action-required">Action requise</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Type :</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">Tous les types</option>
                <option value="reminder">Rappels</option>
                <option value="overdue">En retard</option>
                <option value="approval">Approbations</option>
                <option value="info">Informations</option>
                <option value="success">Succès</option>
                <option value="warning">Avertissements</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Liste des notifications */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`bg-white rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
              !notification.isRead ? 'border-l-4 border-l-blue-500' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-medium ${
                        !notification.isRead ? 'text-gray-900' : 'text-gray-700'
                      }`}>
                        {notification.title}
                      </h3>
                      {getNotificationBadge(notification.type)}
                      {notification.actionRequired && (
                        <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          Action requise
                        </span>
                      )}
                      {!notification.isRead && (
                        <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    
                    <p className={`mb-3 ${
                      !notification.isRead ? 'text-gray-900' : 'text-gray-600'
                    }`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {formatTimestamp(notification.timestamp)}
                      </div>
                      
                      {notification.relatedEntity && (
                        <div className="flex items-center gap-1">
                          {notification.relatedEntity.type === 'book' && <BookOpenIcon className="h-4 w-4" />}
                          {notification.relatedEntity.type === 'user' && <UserIcon className="h-4 w-4" />}
                          <span>{notification.relatedEntity.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {!notification.isRead && (
                    <button
                      onClick={() => markAsRead(notification.id)}
                      className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Marquer comme lu"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Supprimer"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {notification.actionRequired && !notification.isRead && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Voir détails
                    </button>
                    {notification.type === 'overdue' && (
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors">
                        Retourner le livre
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredNotifications.length === 0 && (
          <div className="text-center py-12">
            <BellIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune notification</h3>
            <p className="mt-1 text-sm text-gray-500">
              {filter === 'unread' 
                ? "Toutes vos notifications sont lues"
                : filter === 'action-required'
                ? "Aucune action n'est requise"
                : "Vous n'avez aucune notification pour le moment"}
            </p>
          </div>
        )}
      </div>

      {/* Lien vers paramètres de notification */}
      <div className="mt-8 text-center">
        <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 mx-auto">
          <CogIcon className="h-4 w-4" />
          Gérer les paramètres de notification
        </button>
      </div>
    </div>
  );
}
