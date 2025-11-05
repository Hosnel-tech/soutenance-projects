"use client";
import React, { useEffect, useState } from "react";
import { FileText, Plus, Search, Filter, Calendar, Clock, Loader2, Trash2, Edit2, Save, X } from "lucide-react";
import { listEpreuves, createEpreuve, updateEpreuve, deleteEpreuve } from "@/lib/api";

export default function TeacherEpreuvesPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ titre: "", description: "" });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ titre: "", description: "" });

  const load = async () => {
    setLoading(true); setError(null);
    try { const res = await listEpreuves(); setData(res); } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [page]);

  const filtered = data?.data?.filter((e: any) => !search || e.titre.toLowerCase().includes(search.toLowerCase())) || [];

  const submitCreate = async () => {
    if (!form.titre.trim()) return;
    try { await createEpreuve(form); setForm({ titre: "", description: "" }); setCreating(false); load(); } catch (e: any) { alert(e.message); }
  };
  const startEdit = (e: any) => { setEditingId(e.id); setEditForm({ titre: e.titre, description: e.description || "" }); };
  const saveEdit = async () => { if (editingId == null) return; try { await updateEpreuve(editingId, editForm); setEditingId(null); load(); } catch (e: any) { alert(e.message); } };
  const remove = async (id: number) => { if (!confirm('Supprimer ?')) return; try { await deleteEpreuve(id); load(); } catch (e: any) { alert(e.message); } };

  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes Épreuves</h1>
          <p className="text-gray-600">Gérez vos épreuves et examens</p>
        </div>
        {!creating && (
          <button onClick={() => setCreating(true)} className="inline-flex items-center px-4 py-2 bg-[#004B70] text-white text-sm font-medium rounded-lg hover:bg-[#003A5A] transition-colors duration-200">
            <Plus className="h-4 w-4 mr-2" />
            Créer une épreuve
          </button>
        )}
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Rechercher une épreuve..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button>
      </div>

      {creating && (
        <div className="bg-white rounded-xl shadow p-4 border border-green-200">
          <h3 className="font-medium mb-3">Nouvelle épreuve</h3>
          <div className="grid gap-3">
            <input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} placeholder="Titre" className="px-3 py-2 border rounded" />
            <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Description" className="px-3 py-2 border rounded" />
            <div className="flex gap-2 justify-end">
              <button onClick={() => { setCreating(false); setForm({ titre: "", description: "" }); }} className="px-3 py-2 text-sm bg-gray-200 rounded flex items-center"><X className="h-4 w-4 mr-1" />Annuler</button>
              <button onClick={submitCreate} className="px-3 py-2 text-sm bg-green-600 text-white rounded flex items-center"><Save className="h-4 w-4 mr-1" />Enregistrer</button>
            </div>
          </div>
        </div>
      )}

      {/* Grille des épreuves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div className="col-span-full flex items-center text-sm text-gray-500"><Loader2 className="h-4 w-4 mr-2 animate-spin" />Chargement...</div>}
        {error && <div className="col-span-full text-sm text-red-600">{error}</div>}
        {!loading && !error && filtered.map((e: any) => (
          <div key={e.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex gap-2">
                  {editingId === e.id ? (
                    <>
                      <button onClick={saveEdit} className="p-2 rounded bg-green-100 hover:bg-green-200" title="Enregistrer"><Save className="h-4 w-4" /></button>
                      <button onClick={() => setEditingId(null)} className="p-2 rounded bg-gray-100 hover:bg-gray-200" title="Annuler"><X className="h-4 w-4" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(e)} className="p-2 rounded bg-gray-100 hover:bg-gray-200" title="Modifier"><Edit2 className="h-4 w-4" /></button>
                      <button onClick={() => remove(e.id)} className="p-2 rounded bg-red-100 hover:bg-red-200" title="Supprimer"><Trash2 className="h-4 w-4" /></button>
                    </>
                  )}
                </div>
              </div>
              {editingId === e.id ? (
                <>
                  <input aria-label="Titre" title="Titre" value={editForm.titre} onChange={ev => setEditForm(f => ({ ...f, titre: ev.target.value }))} className="w-full mb-2 px-3 py-2 border rounded" />
                  <textarea aria-label="Description" title="Description" value={editForm.description} onChange={ev => setEditForm(f => ({ ...f, description: ev.target.value }))} className="w-full mb-4 px-3 py-2 border rounded" />
                </>
              ) : (
                <>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{e.titre}</h3>
                  <p className="text-sm text-gray-600 mb-4">{e.description || '—'}</p>
                </>
              )}
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{new Date(e.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
        {!loading && !error && filtered.length === 0 && (
          <div className="col-span-full text-sm text-gray-500">Aucune épreuve.</div>
        )}
      </div>

      {/* Pagination */}
      {!loading && data && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">Total <span className="font-medium">{data.total}</span></div>
          <div className="flex space-x-2">
            <button disabled={!data.prev_page_url} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md disabled:opacity-40">Précédent</button>
            <span className="px-3 py-2 text-sm font-medium bg-green-600 text-white rounded-md">{data.current_page}</span>
            <button disabled={!data.next_page_url} onClick={() => setPage(p => p + 1)} className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md disabled:opacity-40">Suivant</button>
          </div>
        </div>
      )}
    </div>
  );
}
