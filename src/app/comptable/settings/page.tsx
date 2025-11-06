"use client";
import React, { useState } from "react";
import {
  User,
  Building,
  Lock,
  Bell,
  Monitor,
  Save,
  Eye,
  EyeOff,
  Camera,
  Phone,
  MapPin,
  Mail,
  Euro,
  Calculator,
} from "lucide-react";

export default function ComptableSettings() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
  });

  const handleNotificationChange = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">
            Gérez vos informations personnelles et préférences
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu de navigation des paramètres */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Navigation
            </h2>
            <nav className="space-y-2">
              <a
                href="#profile"
                className="flex items-center px-3 py-2 text-sm font-medium text-[#0F673B] bg-[#0F673B]/10 rounded-lg"
              >
                <User className="h-4 w-4 mr-3" />
                Profil
              </a>
              <a
                href="#company"
                className="bg-[#0F673B] hover:bg-[#0a4a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Building className="h-4 w-4 mr-3" />
                Entreprise
              </a>
              <a
                href="#security"
                className="bg-[#0F673B] hover:bg-[#0a4a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Lock className="h-4 w-4 mr-3" />
                Sécurité
              </a>
              <a
                href="#notifications"
                className="bg-[#0F673B] hover:bg-[#0a4a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Bell className="h-4 w-4 mr-3" />
                Notifications
              </a>
              <a
                href="#display"
                className="bg-[#0F673B] hover:bg-[#0a4a2a] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <Monitor className="h-4 w-4 mr-3" />
                Affichage
              </a>
            </nav>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section Profil */}
          <div id="profile" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <User className="h-5 w-5 mr-2 text-[#0F673B]" />
              Informations personnelles
            </h2>

            {/* Photo de profil */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-[#0F673B]/10 rounded-full flex items-center justify-center mr-4">
                <User className="h-10 w-10 text-[#0F673B]" />
              </div>
              <div>
                <button className="inline-flex items-center px-4 py-2 bg-[#0F673B] text-white text-sm font-medium rounded-lg hover:bg-[#0a4a2a] transition-colors duration-200">
                  <Camera className="h-4 w-4 mr-2" />
                  Changer la photo
                </button>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG ou GIF. Max 2MB.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  defaultValue="Jean"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  defaultValue="Dupont"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="email"
                    defaultValue="jean.dupont@comptabilite.fr"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="tel"
                    defaultValue="+33 1 23 45 67 89"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Entreprise
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="Comptabilité Pro SARL"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Spécialité
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent">
                  <option>Comptabilité générale</option>
                  <option>Fiscalité</option>
                  <option>Audit</option>
                  <option>Gestion de paie</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d'expérience
                </label>
                <input
                  type="number"
                  defaultValue="12"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section Entreprise */}
          <div id="company" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Building className="h-5 w-5 mr-2 text-[#0F673B]" />
              Informations entreprise
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de l'entreprise
                </label>
                <input
                  type="text"
                  defaultValue="Comptabilité Pro SARL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SIRET
                </label>
                <input
                  type="text"
                  defaultValue="12345678901234"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  TVA Intracommunautaire
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    defaultValue="FR12345678901"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <textarea
                  rows={3}
                  defaultValue="123 Rue de la Comptabilité&#10;75001 Paris&#10;France"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Section Sécurité */}
          <div id="security" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-[#0F673B]" />
              Sécurité
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="password"
                    className="w-full flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#0F673B] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-[#0F673B]/10 border border-[#0F673B]/20 rounded-lg p-4">
                <h4 className="text-sm font-medium text-[#0F673B] mb-2">
                  Exigences du mot de passe
                </h4>
                <ul className="text-xs text-[#0F673B] space-y-1">
                  <li>• Au moins 8 caractères</li>
                  <li>• Au moins une lettre majuscule</li>
                  <li>• Au moins un chiffre</li>
                  <li>• Au moins un caractère spécial</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Section Notifications */}
          <div id="notifications" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-[#0F673B]" />
              Notifications
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Notifications par email
                  </h4>
                  <p className="text-xs text-gray-500">
                    Recevoir des notifications par email
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange("email")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0F673B]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F673B]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Notifications push
                  </h4>
                  <p className="text-xs text-gray-500">
                    Recevoir des notifications sur votre appareil
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange("push")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0F673B]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F673B]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    Notifications SMS
                  </h4>
                  <p className="text-xs text-gray-500">
                    Recevoir des notifications par SMS
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={() => handleNotificationChange("sms")}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0F673B]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F673B]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Section Affichage */}
          <div id="display" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-[#0F673B]" />
              Préférences d&apos;affichage
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Devise par défaut
                </label>
                <div className="relative">
                  <Euro className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F673B] focus:border-transparent">
                    <option>Euro (€)</option>
                    <option>Dollar US ($)</option>
                    <option>Livre Sterling (£)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Format de nombre
                </label>
                <div className="relative">
                  <Calculator className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F673B] focus:border-transparent">
                    <option>1 234,56 (France)</option>
                    <option>1,234.56 (US)</option>
                    <option>1.234,56 (Allemagne)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langue
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F673B] focus:border-transparent">
                  <option>Français</option>
                  <option>English</option>
                  <option>Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuseau horaire
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0F673B] focus:border-transparent">
                  <option>Europe/Paris (UTC+1)</option>
                  <option>Europe/London (UTC+0)</option>
                  <option>America/New_York (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
              Annuler
            </button>
            <button className="inline-flex items-center px-6 py-2 bg-[#0F673B] text-white text-sm font-medium rounded-lg hover:bg-[#0a4a2a] transition-colors duration-200">
              <Save className="h-4 w-4 mr-2" />
              Enregistrer
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-600">
          © 2024 Comptabilité Pro. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
