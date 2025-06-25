'use client';

import { useState } from 'react';
import { 
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckCircleIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  BookOpenIcon,
  UserGroupIcon,
  CogIcon
} from '@heroicons/react/24/outline';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  subject: string;
  description: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "Comment emprunter un livre ?",
    answer: "Pour emprunter un livre, connectez-vous à votre compte, recherchez le livre souhaité dans le catalogue, puis cliquez sur 'Emprunter'. Le livre sera automatiquement ajouté à vos emprunts en cours.",
    category: "Emprunts"
  },
  {
    id: 2,
    question: "Combien de livres puis-je emprunter simultanément ?",
    answer: "Vous pouvez emprunter jusqu'à 5 livres simultanément. Cette limite peut varier selon votre niveau d'études.",
    category: "Emprunts"
  },
  {
    id: 3,
    question: "Quelle est la durée d'emprunt ?",
    answer: "La durée standard d'emprunt est de 30 jours. Vous pouvez renouveler votre emprunt jusqu'à 2 fois si aucune réservation n'est en attente.",
    category: "Emprunts"
  },
  {
    id: 4,
    question: "Comment renouveler mes emprunts ?",
    answer: "Rendez-vous dans la section 'Mes Emprunts' de votre dashboard. Cliquez sur 'Renouveler' à côté du livre souhaité. Le renouvellement est automatique si le livre n'est pas réservé.",
    category: "Renouvellement"
  },
  {
    id: 5,
    question: "Que faire si j'ai oublié mon mot de passe ?",
    answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre adresse email et suivez les instructions pour réinitialiser votre mot de passe.",
    category: "Compte"
  },
  {
    id: 6,
    question: "Comment contacter la bibliothèque ?",
    answer: "Vous pouvez nous contacter par email à biblio@2ie-edu.org, par téléphone au +226 25 49 28 00, ou utiliser le formulaire de contact ci-dessous.",
    category: "Contact"
  }
];

export default function HelpPage() {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [supportTicket, setSupportTicket] = useState<SupportTicket>({
    subject: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleTicketSubmit = () => {
    // Simulation de l'envoi du ticket
    setTicketSubmitted(true);
    setSupportTicket({
      subject: '',
      description: '',
      category: 'general',
      priority: 'medium'
    });
    setTimeout(() => setTicketSubmitted(false), 5000);
  };

  const tabs = [
    { id: 'faq', label: 'FAQ', icon: QuestionMarkCircleIcon },
    { id: 'guides', label: 'Guides', icon: DocumentTextIcon },
    { id: 'contact', label: 'Contact', icon: ChatBubbleLeftRightIcon },
    { id: 'support', label: 'Support', icon: ExclamationTriangleIcon }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Centre d&apos;aide</h1>
        <p className="text-gray-600 mt-2">Trouvez des réponses à vos questions ou contactez notre équipe</p>
      </div>

      {/* Message de confirmation */}
      {ticketSubmitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircleIcon className="h-5 w-5 text-green-600" />
          <span className="text-green-800">Votre demande de support a été envoyée avec succès !</span>
        </div>
      )}

      {/* Navigation des onglets */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
      <div>
        {/* Onglet FAQ */}
        {activeTab === 'faq' && (
          <div>
            {/* Recherche et filtres */}
            <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher dans les questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Liste des FAQ */}
            <div className="space-y-4">
              {filteredFAQs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg shadow-sm border">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {faq.category}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  
                  {expandedFAQ === faq.id && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <QuestionMarkCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Aucune question trouvée</h3>
                  <p className="mt-1 text-sm text-gray-500">Essayez de modifier vos critères de recherche.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Onglet Guides */}
        {activeTab === 'guides' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Guide de l&apos;utilisateur</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Apprenez à utiliser toutes les fonctionnalités de la plateforme de bibliothèque.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Lire le guide →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <VideoCameraIcon className="h-8 w-8 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Tutoriels vidéo</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Regardez nos tutoriels vidéo pour une prise en main rapide.
              </p>
              <button className="text-green-600 hover:text-green-800 font-medium">
                Voir les vidéos →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <UserGroupIcon className="h-8 w-8 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Communauté</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Rejoignez notre communauté d&apos;utilisateurs pour échanger et partager.
              </p>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Rejoindre →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <CogIcon className="h-8 w-8 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Configurez votre compte et personnalisez vos préférences.
              </p>
              <button className="text-orange-600 hover:text-orange-800 font-medium">
                Configurer →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Dépannage</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Solutions aux problèmes les plus courants.
              </p>
              <button className="text-red-600 hover:text-red-800 font-medium">
                Dépanner →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <DocumentTextIcon className="h-8 w-8 text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Documentation</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Documentation technique complète pour les développeurs.
              </p>
              <button className="text-gray-600 hover:text-gray-800 font-medium">
                Consulter →
              </button>
            </div>
          </div>
        )}

        {/* Onglet Contact */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Informations de contact</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <PhoneIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Téléphone</h3>
                    <p className="text-gray-600">+226 25 49 28 00</p>
                    <p className="text-sm text-gray-500">Lundi - Vendredi : 8h00 - 18h00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <EnvelopeIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">biblio@2ie-edu.org</p>
                    <p className="text-sm text-gray-500">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <ClockIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Horaires d&apos;ouverture</h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Lundi - Vendredi : 7h00 - 22h00</p>
                      <p>Samedi : 8h00 - 18h00</p>
                      <p>Dimanche : 14h00 - 20h00</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">Adresse</h3>
                    <p className="text-gray-600">
                      Institut International d&apos;Ingénierie de l&apos;Eau et de l&apos;Environnement<br />
                      Rue de la Science, 01 BP 594<br />
                      Ouagadougou 01, Burkina Faso
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Votre nom complet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="votre.email@exemple.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre demande..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Onglet Support */}
        {activeTab === 'support' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Créer un ticket de support</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sujet</label>
                  <input
                    type="text"
                    value={supportTicket.subject}
                    onChange={(e) => setSupportTicket({...supportTicket, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Résumé de votre problème"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                    <select
                      value={supportTicket.category}
                      onChange={(e) => setSupportTicket({...supportTicket, category: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">Général</option>
                      <option value="account">Compte</option>
                      <option value="borrowing">Emprunts</option>
                      <option value="technical">Problème technique</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priorité</label>
                    <select
                      value={supportTicket.priority}
                      onChange={(e) => setSupportTicket({...supportTicket, priority: e.target.value as 'low' | 'medium' | 'high'})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Faible</option>
                      <option value="medium">Moyenne</option>
                      <option value="high">Élevée</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description détaillée</label>
                  <textarea
                    rows={6}
                    value={supportTicket.description}
                    onChange={(e) => setSupportTicket({...supportTicket, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre problème en détail. Incluez les étapes pour reproduire le problème si applicable."
                  ></textarea>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Temps de réponse estimé :</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Priorité faible : 2-3 jours ouvrables</li>
                    <li>• Priorité moyenne : 1-2 jours ouvrables</li>
                    <li>• Priorité élevée : Moins de 24 heures</li>
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={handleTicketSubmit}
                  disabled={!supportTicket.subject || !supportTicket.description}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  Créer le ticket
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
