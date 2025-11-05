"use client";
import React, { useEffect, useState } from "react";
import { User, ClipboardList, FileText, CheckCircle, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

interface Stats {
  users_total: number;
  enseignants_valides: number;
  enseignants_en_attente: number;
  tds_total: number;
  tds_en_cours: number;
  tds_termine: number;
  tds_paye: number;
  epreuves_total: number;
  recent: { type: string; message: string; created_at_diff: string }[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true); setError(null);
    try {
      const data = await api('/admin/stats');
      setStats(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Vue d'ensemble des activités</p>
        </div>
        <button onClick={load} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg">Rafraîchir</button>
      </div>

      {error && <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

      {loading && (
        <div className="flex items-center text-gray-500 text-sm"><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Chargement des statistiques...</div>
      )}

      {stats && !loading && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={User} label="Utilisateurs" value={stats.users_total} color="blue" />
            <StatCard icon={ClipboardList} label="TD total" value={stats.tds_total} color="green" />
            <StatCard icon={FileText} label="Épreuves" value={stats.epreuves_total} color="purple" />
            <StatCard icon={CheckCircle} label="TD payés" value={stats.tds_paye} color="orange" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm border p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Répartition TD</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <MiniStat label="En cours" value={stats.tds_en_cours} color="blue" />
                <MiniStat label="Terminés" value={stats.tds_termine} color="green" />
                <MiniStat label="Payés" value={stats.tds_paye} color="orange" />
                <MiniStat label="Enseignants" value={stats.enseignants_valides} color="indigo" />
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Activité récente</h2>
              <ul className="space-y-3 max-h-72 overflow-y-auto pr-2 text-sm">
                {stats.recent.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-gray-400" />
                    <div>
                      <p className="text-gray-800">{item.message}</p>
                      <p className="text-xs text-gray-500">{item.created_at_diff}</p>
                    </div>
                  </li>
                ))}
                {stats.recent.length === 0 && (<li className="text-gray-500 text-xs">Aucune activité.</li>)}
              </ul>
            </div>
          </div>
        </>
      )}

      <div className="text-center text-xs text-gray-400 mt-12">© {new Date().getFullYear()} EduTD Manager</div>
    </div>
  );
}

interface StatCardProps { icon: any; label: string; value: number; color: string; }
function StatCard({ icon: Icon, label, value, color }: StatCardProps) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600 border-blue-500',
    green: 'bg-green-100 text-green-600 border-green-500',
    purple: 'bg-purple-100 text-purple-600 border-purple-500',
    orange: 'bg-orange-100 text-orange-600 border-orange-500',
    indigo: 'bg-indigo-100 text-indigo-600 border-indigo-500'
  };
  return (
    <div className={`bg-white rounded-xl shadow-sm border p-6 flex items-center`}>
      <div className={`p-2 rounded-lg ${colorMap[color].split(' ').slice(0, 2).join(' ')}`}> <Icon className={`h-6 w-6 ${colorMap[color].split(' ')[1]}`} /> </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string; }) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    orange: 'bg-orange-50 text-orange-700',
    indigo: 'bg-indigo-50 text-indigo-700'
  };
  return (
    <div className={`rounded-lg border px-3 py-3 ${colorClasses[color]}`}>
      <p className="text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-xl font-semibold">{value}</p>
    </div>
  );
}
