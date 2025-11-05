"use client";
import React, { useEffect, useState } from "react";
import { User, ClipboardList, FileText, CheckCircle, Loader2, Clock } from "lucide-react";
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
            <StatCard icon={User} label="Utilisateurs" value={stats.users_total} color="#004B70" />
            <StatCard icon={ClipboardList} label="TD total" value={stats.tds_total} color="#0F673B" />
            <StatCard icon={FileText} label="Épreuves" value={stats.epreuves_total} color="#EE2E33" />
            <StatCard icon={CheckCircle} label="TD payés" value={stats.tds_paye} color="#FDBB2C" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Section Répartition TD */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:col-span-2 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <ClipboardList className="h-5 w-5 mr-2 text-[#004B70]" />
                Répartition TD
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <MiniStat 
                  label="En cours" 
                  value={stats.tds_en_cours} 
                  color="#004B70" 
                />
                <MiniStat 
                  label="Terminés" 
                  value={stats.tds_termine} 
                  color="#0F673B" 
                />
                <MiniStat 
                  label="Payés" 
                  value={stats.tds_paye} 
                  color="#FDBB2C" 
                />
                <MiniStat 
                  label="Enseignants" 
                  value={stats.enseignants_valides} 
                  color="#004B70" 
                />
              </div>
            </div>

            {/* Section Activité récente */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-[#004B70]" />
                Activité récente
              </h2>
              <ul className="space-y-4 max-h-[340px] overflow-y-auto pr-2">
                {stats.recent.length > 0 ? (
                  stats.recent.map((item, i) => (
                    <li key={i} className="flex items-start group">
                      <div className="flex-shrink-0 mt-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#004B70] block group-hover:bg-[#003A5A] transition-colors"></span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-800 group-hover:text-gray-900 transition-colors">
                          {item.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.created_at_diff}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-gray-500 italic">Aucune activité récente</li>
                )}
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
  // Couleurs personnalisées avec des styles en ligne
  const getColorStyles = (color: string) => {
    const styles = {
      '#004B70': {
        bg: 'bg-[#E6F0F5]',
        text: 'text-[#004B70]',
        border: 'border-l-4 border-[#004B70]',
        iconBg: 'bg-[#D1E5F0]',
        iconColor: '#004B70'
      },
      '#0F673B': {
        bg: 'bg-[#E6F5EC]',
        text: 'text-[#0F673B]',
        border: 'border-l-4 border-[#0F673B]',
        iconBg: 'bg-[#D1F0E0]',
        iconColor: '#0F673B'
      },
      '#EE2E33': {
        bg: 'bg-[#FEEBEC]',
        text: 'text-[#EE2E33]',
        border: 'border-l-4 border-[#EE2E33]',
        iconBg: 'bg-[#FCD6D8]',
        iconColor: '#EE2E33'
      },
      '#FDBB2C': {
        bg: 'bg-[#FFF8E6]',
        text: 'text-[#E6A500]',
        border: 'border-l-4 border-[#FDBB2C]',
        iconBg: 'bg-[#FEF0C0]',
        iconColor: '#E6A500'
      }
    };
    
    return styles[color as keyof typeof styles] || {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-l-4 border-gray-400',
      iconBg: 'bg-gray-200',
      iconColor: '#6B7280'
    };
  };

  const colorStyles = getColorStyles(color);

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 flex items-center ${colorStyles.border} hover:shadow-lg transition-shadow duration-200`}>
      <div className={`p-2.5 rounded-lg ${colorStyles.iconBg}`}>
        <Icon className="h-5 w-5" style={{ color: colorStyles.iconColor }} />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600">{label}</p>
        <p className={`text-2xl font-bold mt-1 ${colorStyles.text}`}>{value}</p>
      </div>
    </div>
  );
}

function MiniStat({ label, value, color }: { label: string; value: number; color: string; }) {
  // Styles pour les MiniStats avec les couleurs personnalisées
  const getColorStyles = (color: string) => {
    const styles = {
      '#004B70': {
        bg: 'bg-[#E6F0F5]',
        text: 'text-[#004B70]',
        border: 'border-[#B8D4E5]'
      },
      '#0F673B': {
        bg: 'bg-[#E6F5EC]',
        text: 'text-[#0F673B]',
        border: 'border-[#B8E5CF]'
      },
      '#FDBB2C': {
        bg: 'bg-[#FFF8E6]',
        text: 'text-[#E6A500]',
        border: 'border-[#FEE9B0]'
      }
    };
    
    return styles[color as keyof typeof styles] || {
      bg: 'bg-gray-50',
      text: 'text-gray-700',
      border: 'border-gray-200'
    };
  };

  const colorStyles = getColorStyles(color);

  return (
    <div className={`rounded-xl p-4 border ${colorStyles.bg} ${colorStyles.border} hover:shadow-sm transition-all`}>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
      <p className={`mt-1 text-xl font-semibold ${colorStyles.text}`}>{value}</p>
    </div>
  );
}
