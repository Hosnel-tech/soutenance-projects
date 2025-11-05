"use client";
import React, { useEffect, useState } from "react";
import { Users, Plus, Search, CheckCircle2, Loader2, Trash2 } from "lucide-react";
import AddTeacher from "@/components/add_teacher";
import { listEnseignants, validerEnseignant, deleteEnseignant, createEnseignant } from "@/lib/api";

export default function EnseignantsPage() {
  const [showModal, setShowModal] = useState(false);

  interface TeacherFormData {
    nom: string;
    prenom: string;
    ifru: string;
    numeroCompte: string;
    banque: string;
    etablissement: string;
    email: string;
    telephone: string;
    adresse: string;
    matiere: string;
    classe: string;
    password: string;
  }

  const [teachers, setTeachers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const data = await listEnseignants();
      setTeachers(data);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (data: TeacherFormData) => {
    try {
      await createEnseignant({
        name: data.prenom + ' ' + data.nom,
        email: data.email,
        password: data.password || 'ChangeMe!123',
        bank_name: data.banque,
        bank_account: data.numeroCompte,
        phone: data.telephone,
        establishment: data.etablissement,
        subject: data.matiere,
        classe: data.classe,
        ifru: data.ifru,
      });
      setShowModal(false);
      load();
    } catch (e: any) { alert(e.message); }
  };

  const onValidate = async (id: number) => { try { await validerEnseignant(id); load(); } catch (e: any) { alert(e.message); } };
  const onDelete = async (id: number) => { if (!confirm('Supprimer ?')) return; try { await deleteEnseignant(id); load(); } catch (e: any) { alert(e.message); } };

  const filtered = teachers.filter(t => (t.name || '').toLowerCase().includes(search.toLowerCase()) || (t.email || '').toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Enseignants
          </h1>
          <p className="text-gray-600">
            Gérez les enseignants de votre établissement
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-[#004B70] text-white text-sm font-medium rounded-lg hover:bg-[#003A5A] transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un enseignant
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un enseignant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004B70] focus:border-transparent"
          />
        </div>
        {/* <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button> */}
      </div>

      {/* Tableau des enseignants */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Liste des enseignants
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Établissement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Téléphone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IFRU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  N° Bancaire
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Banque
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Classe</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading && <tr><td colSpan={9} className="px-6 py-6 text-center text-gray-500 text-sm"><Loader2 className="h-4 w-4 inline animate-spin mr-2" />Chargement...</td></tr>}
              {!loading && filtered.map(t => (
                <tr key={t.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${t.is_validated ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <Users className={`h-5 w-5 ${t.is_validated ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{t.name}</div>
                        <div className="text-xs text-gray-500">{t.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.subject || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.establishment || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.phone || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.ifru || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{t.bank_account || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.bank_name || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.classe || '—'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{t.is_validated ? <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Validé</span> : <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">En attente</span>}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
                    {!t.is_validated && <button onClick={() => onValidate(t.id)} className="text-green-600 hover:text-green-900 flex items-center gap-1"><CheckCircle2 className="h-4 w-4" />Valider</button>}
                    <button onClick={() => onDelete(t.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1"><Trash2 className="h-4 w-4" />Supprimer</button>
                  </td>
                </tr>
              ))}
              {!loading && filtered.length === 0 && <tr><td colSpan={9} className="px-6 py-6 text-center text-gray-500 text-sm">Aucun résultat</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          {teachers.length} enseignants ({filtered.length} affichés)
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Précédent
          </button>
          <button
            className="px-2.5 py-1.5 text-xs font-medium text-white bg-[#004B70] hover:bg-[#003A5A] rounded-md transition-colors duration-200"
          >
            1
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>

      {/* Composant AddTeacher */}
      <AddTeacher
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
