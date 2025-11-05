"use client";
import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  Bell,
  Monitor,
  Save,
  Eye,
  EyeOff,
  Camera,
  Phone,
  MapPin,
} from "lucide-react";

import { me, updateTeacherProfile } from "@/lib/api";

export default function TeacherSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  interface FormState {
    name: string;
    email: string;
    phone: string;
    establishment: string;
    subject: string;
    experience_years: string | number;
    password: string;
  }

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    establishment: "",
    subject: "",
    experience_years: "",
    password: "",
  });

  const [notifications, setNotifications] = useState({ email: true, push: false, sms: true });
  const [displayPrefs, setDisplayPrefs] = useState({ theme: 'Clair', lang: 'Français', tz: 'Europe/Paris (UTC+1)' });

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const u = await me();
      setProfile(u);
      setForm(f => ({ ...f, name: u.name || '', email: u.email || '', phone: u.phone || '', establishment: u.establishment || '', subject: u.subject || '', experience_years: u.experience_years || '' }));
      if (u.settings?.notifications) setNotifications({
        email: !!u.settings.notifications.email,
        push: !!u.settings.notifications.push,
        sms: !!u.settings.notifications.sms,
      });
      if (u.settings?.display) setDisplayPrefs({
        theme: u.settings.display.theme || 'Clair',
        lang: u.settings.display.lang || 'Français',
        tz: u.settings.display.tz || 'Europe/Paris (UTC+1)',
      });
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target; setForm((f: any) => ({ ...f, [name]: value }));
  };

  const handleNotificationChange = (type: string) => {
    setNotifications((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  const save = async () => {
    setSaving(true); setError(null); setSuccess(false);
    try {
      const payload: any = {
        name: form.name,
        email: form.email,
        phone: form.phone,
        establishment: form.establishment,
        subject: form.subject,
        experience_years: form.experience_years ? Number(form.experience_years) : null,
        settings: {
          notifications,
          display: displayPrefs,
        }
      };
      if (form.password) payload.password = form.password;
      const updated = await updateTeacherProfile(payload);
      setProfile(updated);
      setForm((f: any) => ({ ...f, password: "" }));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
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

      {loading && <div className="text-sm text-gray-500">Chargement...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}
      {success && <div className="text-sm text-[#004B70]">Profil mis à jour</div>}
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
                className="flex items-center px-3 py-2 text-sm font-medium text-[#004B70] bg-blue-50 rounded-lg"
              >
                <User className="h-4 w-4 mr-3" />
                Profil
              </a>
              <a
                href="#security"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Lock className="h-4 w-4 mr-3" />
                Sécurité
              </a>
              <a
                href="#notifications"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Bell className="h-4 w-4 mr-3" />
                Notifications
              </a>
              <a
                href="#display"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg"
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
              <User className="h-5 w-5 mr-2 text-[#004B70]" />
              Informations personnelles
            </h2>

            {/* Photo de profil */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mr-4">
                <User className="h-10 w-10 text-[#004B70]" />
              </div>
              <div>
                <button className="inline-flex items-center px-4 py-2 bg-[#004B70] text-white text-sm font-medium rounded-lg hover:bg-[#003d5d] transition-colors duration-200">
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
                <input name="name" value={form.name} onChange={onChange} disabled={loading} aria-label="Nom" title="Nom" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom
                </label>
                <input name="surname" value={""} disabled aria-label="Nom de famille (placeholder)" title="Nom de famille" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input name="email" value={form.email} onChange={onChange} disabled={loading} type="email" aria-label="Email" title="Email" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input name="phone" value={form.phone} onChange={onChange} disabled={loading} type="tel" aria-label="Téléphone" title="Téléphone" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Établissement
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input name="establishment" value={form.establishment} onChange={onChange} disabled={loading} type="text" aria-label="Établissement" title="Établissement" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Matière principale
                </label>
                <select name="subject" value={form.subject} onChange={onChange} disabled={loading} title="Matière" aria-label="Matière" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100">
                  <option value="">(Choisir)</option>
                  <option value="Mathématiques">Mathématiques</option>
                  <option value="Physique">Physique</option>
                  <option value="Chimie">Chimie</option>
                  <option value="Sciences">Sciences</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Années d&apos;expérience
                </label>
                <input name="experience_years" value={form.experience_years} onChange={onChange} disabled={loading} type="number" aria-label="Années d'expérience" title="Années d'expérience" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
              </div>
            </div>
          </div>

          {/* Section Sécurité */}
          <div id="security" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-[#004B70]" />
              Sécurité
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe actuel
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input name="current_password" disabled type={showPassword ? "text" : "password"} aria-label="Mot de passe actuel" title="Mot de passe actuel" placeholder="Mot de passe actuel" className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg bg-gray-100" />
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
                  <input name="password" value={form.password} onChange={onChange} disabled={loading} type="password" aria-label="Nouveau mot de passe" title="Nouveau mot de passe" placeholder="Nouveau mot de passe" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent disabled:bg-gray-100" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmer le nouveau mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input disabled type="password" aria-label="Confirmation mot de passe (inactif)" title="Confirmation mot de passe (inactif)" placeholder="Confirmation" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-800 mb-2">
                  Exigences du mot de passe
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
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
              <Bell className="h-5 w-5 mr-2 text-[#004B70]" />
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004B70]"></div>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004B70]"></div>
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
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004B70]"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Section Affichage */}
          <div id="display" className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Monitor className="h-5 w-5 mr-2 text-[#004B70]" />
              Préférences d&apos;affichage
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thème
                </label>
                <select value={displayPrefs.theme} onChange={e => setDisplayPrefs(p => ({ ...p, theme: e.target.value }))} title="Thème" aria-label="Thème" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent">
                  <option value="Clair">Clair</option>
                  <option value="Sombre">Sombre</option>
                  <option value="Automatique">Automatique</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Langue
                </label>
                <select value={displayPrefs.lang} onChange={e => setDisplayPrefs(p => ({ ...p, lang: e.target.value }))} title="Langue" aria-label="Langue" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent">
                  <option value="Français">Français</option>
                  <option value="English">English</option>
                  <option value="Español">Español</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fuseau horaire
                </label>
                <select value={displayPrefs.tz} onChange={e => setDisplayPrefs(p => ({ ...p, tz: e.target.value }))} title="Fuseau horaire" aria-label="Fuseau horaire" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent">
                  <option value="Europe/Paris (UTC+1)">Europe/Paris (UTC+1)</option>
                  <option value="Europe/London (UTC+0)">Europe/London (UTC+0)</option>
                  <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-4">
            <button disabled={saving || loading} onClick={() => load()} className="px-6 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50">Réinitialiser</button>
            <button disabled={saving || loading} onClick={save} className="inline-flex items-center px-6 py-2 bg-[#004B70] text-white text-sm font-medium rounded-lg hover:bg-[#003d5d] transition-colors duration-200 disabled:opacity-50">
              {saving ? <span className="flex items-center"><Save className="h-4 w-4 mr-2 animate-pulse" />Enregistrement...</span> : <><Save className="h-4 w-4 mr-2" />Enregistrer</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
