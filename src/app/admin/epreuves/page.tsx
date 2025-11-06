"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Loader2, Edit, Trash2, X, Save } from "lucide-react";
import { listEpreuves, createEpreuve, updateEpreuve, deleteEpreuve } from "@/lib/api";

interface Epreuve {
  id: number;
  titre: string;
  description?: string;
}

export default function AdminEpreuvesPage() {
  const [items, setItems] = useState<Epreuve[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Epreuve | null>(null);
  const [form, setForm] = useState({ titre: "", description: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: any = await listEpreuves();
      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];
      setItems(list);
    } catch (e: any) {
      setError(e.message || "Erreur inattendue");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ titre: "", description: "" }); setEditing(null); };
  const startCreate = () => { resetForm(); setShowForm(true); };
  const startEdit = (ep: Epreuve) => { setEditing(ep); setForm({ titre: ep.titre, description: ep.description || "" }); setShowForm(true); };
  const submit = async () => {
    if (!form.titre.trim()) { alert("Titre requis"); return; }
    setSaving(true);
    try {
      if (editing) await updateEpreuve(editing.id, form);
      else await createEpreuve(form);
      setShowForm(false);
      resetForm();
      load();
    } catch (e: any) {
      alert(e.message || "Erreur lors de l'enregistrement");
    } finally { setSaving(false); }
  };
  const remove = async (id: number) => {
    if (!confirm("Supprimer cette épreuve ?")) return;
    try { await deleteEpreuve(id); load(); } catch (e: any) { alert(e.message); }
  };
  const filtered = (items || []).filter(i => (i.titre || "").toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Épreuves</h1>
          <p className="text-gray-600">Créer, modifier et supprimer les épreuves disponibles</p>
        </div>
        <button onClick={startCreate} className="inline-flex items-center px-4 py-2 bg-[#0F673B] text-white text-sm font-medium rounded-lg hover:bg-[#0a4a2a] transition-colors duration-200">
          <Plus className="h-4 w-4 mr-2" /> Nouvelle épreuve
        </button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher une épreuve..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      {error && <div className="text-sm text-red-600">{error}</div>}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-40">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading && <tr><td colSpan={3} className="px-6 py-6 text-center text-gray-500 text-sm"><Loader2 className="h-4 w-4 inline animate-spin mr-2" />Chargement...</td></tr>}
            {!loading && filtered.map(ep => (
              <tr key={ep.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ep.titre}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={ep.description}>{ep.description || '—'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                  <button onClick={() => startEdit(ep)} className="px-2 py-1 text-xs inline-flex items-center gap-1 rounded bg-amber-100 text-amber-700 hover:bg-amber-200"><Edit className="h-4 w-4" />Edit</button>
                  <button onClick={() => remove(ep.id)} className="px-2 py-1 text-xs inline-flex items-center gap-1 rounded bg-red-100 text-red-700 hover:bg-red-200"><Trash2 className="h-4 w-4" />Del</button>
                </td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && <tr><td colSpan={3} className="px-6 py-6 text-center text-gray-500 text-sm">Aucune épreuve</td></tr>}
          </tbody>
        </table>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h2 className="text-lg font-semibold">{editing ? 'Modifier' : 'Nouvelle'} épreuve</h2>
              <button onClick={() => { setShowForm(false); resetForm(); }} aria-label="Fermer le formulaire" title="Fermer" className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} placeholder="Titre de l'épreuve" aria-label="Titre de l'épreuve" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Description de l'épreuve" aria-label="Description de l'épreuve" className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-3 border-t bg-gray-50">
              <button disabled={saving} onClick={() => { setShowForm(false); resetForm(); }} className="px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50">Annuler</button>
              <button disabled={saving} onClick={submit} className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50">{saving && <Loader2 className="h-4 w-4 animate-spin" />}<Save className="h-4 w-4" /> Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
