"use client";
import React, { useEffect, useState } from "react";
import { Save, User, Bell, Shield, Database, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { me, updateAdminProfile } from "@/lib/api";

export default function ParametresPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const u = await me();
      setProfile(u);
      setForm({ name: u.name || "", email: u.email || "", password: "" });
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSave = async () => {
    if (loading || saving) return;
    setSaving(true); setError(null); setSuccess(false);
    try {
      const payload: any = {};
      if (form.name !== profile.name) payload.name = form.name;
      if (form.email !== profile.email) payload.email = form.email;
      if (form.password.trim()) payload.password = form.password;
      if (Object.keys(payload).length === 0) { setSuccess(true); return; }
      const updated = await updateAdminProfile(payload);
      setProfile(updated);
      setForm(f => ({ ...f, password: "" }));
      setSuccess(true);
    } catch (e: any) { setError(e.message); }
    finally { setSaving(false); setTimeout(() => setSuccess(false), 3000); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          <p className="text-gray-600">Configurez votre espace d'administration</p>
        </div>
        <button onClick={onSave} disabled={saving || loading} className="inline-flex items-center px-4 py-2 bg-blue-600 disabled:opacity-60 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {saving ? 'Enregistrement...' : 'Sauvegarder'}
        </button>
      </div>

      {loading && <div className="flex items-center text-sm text-gray-500"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Chargement du profil...</div>}
      {error && <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded"><AlertCircle className="h-4 w-4" />{error}</div>}
      {success && !error && <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded"><CheckCircle2 className="h-4 w-4" />Modifications enregistrées</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <User className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Profil utilisateur</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
              <input type="text" name="name" aria-label="Nom d'utilisateur" title="Nom d'utilisateur" value={form.name} onChange={onChange} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" name="email" aria-label="Email" title="Email" value={form.email} onChange={onChange} disabled={loading} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
              <input type="password" name="password" aria-label="Nouveau mot de passe" title="Nouveau mot de passe" value={form.password} onChange={onChange} disabled={loading} placeholder="••••••••" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Bell className="h-5 w-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4 text-sm text-gray-500">
            <p>Section prochainement dynamique (préférences de notification).</p>
            <div className="flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-700">Nouveaux utilisateurs</span>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input type="checkbox" disabled aria-label="Notification nouveaux utilisateurs désactivée" title="Notification nouveaux utilisateurs" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5"></div>
              </label>
            </div>
            <div className="flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-700">Mises à jour système</span>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input type="checkbox" disabled aria-label="Notification mises à jour système désactivée" title="Notification mises à jour système" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5"></div>
              </label>
            </div>
            <div className="flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-700">Rapports quotidiens</span>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input type="checkbox" disabled aria-label="Rapports quotidiens désactivés" title="Rapports quotidiens" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Shield className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Sécurité</h3>
          </div>
          <div className="space-y-4 text-sm text-gray-500">
            <p>Contrôles de sécurité à venir (2FA, durée session...)</p>
            <div className="flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-700">Authentification à deux facteurs</span>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input type="checkbox" disabled aria-label="2FA désactivée" title="2FA" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5"></div>
              </label>
            </div>
            <div className="flex items-center justify-between opacity-60">
              <span className="text-sm text-gray-700">Sessions multiples</span>
              <label className="relative inline-flex items-center cursor-not-allowed">
                <input type="checkbox" disabled aria-label="Sessions multiples désactivées" title="Sessions multiples" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5"></div>
              </label>
            </div>
            <div className="opacity-60">
              <label className="block text-sm font-medium text-gray-700 mb-1">Durée de session (heures)</label>
              <input type="number" disabled value={8} aria-label="Durée de session" title="Durée de session" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
            </div>
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <Database className="h-5 w-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Base de données</h3>
          </div>
          <div className="space-y-4 text-sm text-gray-500">
            <p>Plan: endpoints de sauvegarde et politique de rétention.</p>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sauvegarde automatique</label>
              <select disabled aria-label="Fréquence de sauvegarde" title="Fréquence de sauvegarde" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100">
                <option>Quotidienne</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rétention (jours)</label>
              <input type="number" disabled value={30} aria-label="Rétention sauvegardes" title="Rétention sauvegardes" className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100" />
            </div>
            <button disabled className="w-full py-2 px-4 bg-yellow-300 text-white text-sm font-medium rounded-lg cursor-not-allowed">Sauvegarde désactivée</button>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-red-800 mb-4">Zone de danger</h3>
        <div className="space-y-4 text-sm text-gray-500">
          <p>Actions critiques à implémenter (suppression compte, reset DB) avec confirmations.</p>
          <div className="flex items-center justify-between opacity-60">
            <div>
              <p className="text-sm font-medium text-red-800">Supprimer le compte</p>
              <p className="text-sm text-red-600">Action irréversible</p>
            </div>
            <button disabled className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">Supprimer</button>
          </div>
          <div className="flex items-center justify-between opacity-60">
            <div>
              <p className="text-sm font-medium text-red-800">Réinitialiser la base de données</p>
              <p className="text-sm text-red-600">Toutes les données seront perdues</p>
            </div>
            <button disabled className="px-4 py-2 bg-red-400 text-white text-sm font-medium rounded-lg cursor-not-allowed">Réinitialiser</button>
          </div>
        </div>
      </div>
    </div>
  );
}
