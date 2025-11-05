"use client";
import React, { useEffect, useState } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  Users,
  Calendar,
  Clock,
  BookOpen,
} from "lucide-react";
import { listTDs, terminerTd } from "@/lib/api";

export default function MesTDPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [refreshFlag, setRefreshFlag] = useState(0);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const res = await listTDs();
      setData(res);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, [page, refreshFlag]);

  const filteredItems = data?.data?.filter((td: any) =>
    !search || td.titre?.toLowerCase().includes(search.toLowerCase()) || td.epreuve?.titre?.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const stats = {
    total: data?.total || 0,
    enCours: filteredItems.filter((t: any) => t.statut === 'en_cours').length,
    paye: filteredItems.filter((t: any) => t.statut === 'paye').length,
    termines: filteredItems.filter((t: any) => t.statut === 'termine').length,
  };

  const handleTerminer = async (id: number) => {
    try { await terminerTd(id); setRefreshFlag(x => x + 1); } catch (e: any) { alert(e.message); }
  };

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "en_cours":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            En cours
          </span>
        );
      case "termine":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Terminé
          </span>
        );
      case "paye":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
            Payé
          </span>
        );
      default:
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {statut}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes TD</h1>
          <p className="text-gray-600">Gérez vos travaux dirigés et séances</p>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.total}</div>
          <div className="text-sm text-gray-600">Total TD</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.enCours}</div>
          <div className="text-sm text-gray-600">En cours</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.paye}</div>
          <div className="text-sm text-gray-600">Payé</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">{stats.termines}</div>
          <div className="text-sm text-gray-600">Terminés</div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Rechercher un TD..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button>
      </div>

      {/* Tableau des TD */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Mes Travaux Dirigés
          </h3>
        </div>
        <div className="overflow-x-auto">
          {loading && <div className="p-4 text-sm text-gray-500">Chargement...</div>}
          {error && <div className="p-4 text-sm text-red-600">{error}</div>}
          {!loading && !error && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Matière
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Classe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date/Heure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durée
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Étudiants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((td: any) => (
                  <tr key={td.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <ClipboardList className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{td.titre || td.epreuve?.titre}</div>
                          <div className="text-xs text-gray-500">TD #{td.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">—</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                        {td.date_debut ? new Date(td.date_debut).toLocaleString() : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 text-gray-400" />
                        {td.date_debut && td.date_fin ? Math.round((new Date(td.date_fin).getTime() - new Date(td.date_debut).getTime()) / 60000) + ' min' : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        —
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(td.statut)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {td.statut === 'en_cours' && (
                        <button onClick={() => handleTerminer(td.id)} className="inline-flex items-center px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors">Terminer</button>
                      )}
                      {td.statut !== 'en_cours' && <span className="text-gray-400 text-xs capitalize">{td.statut}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>


      {/* Pagination */}
      {!loading && data && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Total <span className="font-medium">{data.total}</span>
          </div>
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
