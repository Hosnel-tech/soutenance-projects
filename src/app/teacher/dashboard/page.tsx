"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import {
  Users,
  ClipboardList,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";
import { teacherStats, listTDs } from "@/lib/api";

export default function TeacherDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);
  const [tds, setTds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [s, tdRes] = await Promise.all([
          teacherStats().catch(() => null),
          listTDs()
        ]);
        setStats(s);
        setTds(tdRes.data?.slice(0, 5) || []);
      } catch (e: any) { setError(e.message); }
      finally { setLoading(false); }
    })();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace enseignant
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#0F673B]">
          <div className="flex items-center">
            <div className="p-2 bg-[#E6F0F5] rounded-lg">
              <ClipboardList className="h-6 w-6 text-[#0F673B]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mes TD</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.tds ?? '—'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#EE2E33]">
          <div className="flex items-center">
            <div className="p-2 bg-[#E6F0F5] rounded-lg">
              <Users className="h-6 w-6 text-[#EE2E33]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FDBB2C]">
          <div className="flex items-center">
            <div className="p-2 bg-[#E6F0F5] rounded-lg">
              <FileText className="h-6 w-6 text-[#FDBB2C]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Épreuves</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.epreuves ?? '—'}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#171419]">
          <div className="flex items-center">
            <div className="p-2 bg-[#E6F0F5] rounded-lg">
              <TrendingUp className="h-6 w-6 text-[#171419]" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">—</p>
            </div>
          </div>
        </div>
      </div>

      {loading && <div className="text-sm text-gray-500">Chargement...</div>}
      {error && <div className="text-sm text-red-600">{error}</div>}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prochains TD */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-[#004B70]" />
            Prochains TD
          </h2>
          <div className="space-y-4">
            {tds.map(td => (
              <div key={td.id} className="flex items-center p-3 bg-[#E6F0F5] rounded-lg border-l-4 border-[#004B70]">
                <div className="flex-shrink-0"><Clock className="h-5 w-5 text-[#004B70]" /></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-800">{td.titre || td.epreuve?.titre}</p>
                  <p className="text-xs text-gray-500">{td.date_debut ? new Date(td.date_debut).toLocaleString() : '—'}</p>
                </div>
              </div>
            ))}
            {!loading && tds.length === 0 && <div className="text-xs text-gray-500">Aucun TD.</div>}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-lg p-6" id="actions-rapides">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <button onClick={() => router.push('/teacher/mes-td')} className="w-full py-3 px-4 bg-[#004B70] text-white rounded-lg hover:bg-[#003A5A] transition-colors duration-200 flex items-center justify-center" aria-label="Aller à mes TD">
              <ClipboardList className="h-4 w-4 mr-2" />
              Voir / gérer mes TD
            </button>
            <button onClick={() => router.push('/teacher/epreuves?create=1')} className="w-full py-3 px-4 bg-[#0F673B] text-white rounded-lg hover:bg-[#0d5a33] transition-colors duration-200 flex items-center justify-center" aria-label="Ajouter une épreuve">
              <FileText className="h-4 w-4 mr-2" />
              Ajouter une épreuve
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Activité récente
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tds.slice(0, 3).map(td => (
            <div key={td.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-[#004B70] rounded-full mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">TD {td.titre || td.epreuve?.titre}</p>
                <p className="text-xs text-gray-500">ID {td.id}</p>
              </div>
            </div>
          ))}
          {!loading && tds.length === 0 && <div className="text-xs text-gray-500">Aucune activité.</div>}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-600">
          © 2024 EduTD Teacher. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
