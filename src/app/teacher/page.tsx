"use client";
import React, { useEffect, useState } from "react";
import { listTDs, terminerTd } from "@/lib/api";

export default function TeacherPage() {
    const [loading, setLoading] = useState(true);
    const [tds, setTds] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            try {
                const data = await listTDs();
                setTds(data?.data || data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        })();
    }, []);
    if (loading) return <div className="p-6">Chargement…</div>;
    if (error) return <div className="p-6 text-red-600">Erreur: {error}</div>;
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Mes TD</h1>
            <ul className="space-y-2">
                {tds.map((t: any) => (
                    <li key={t.id} className="border p-3 rounded flex items-center justify-between">
                        <div>
                            <div className="font-medium">{t.titre}</div>
                            <div className="text-sm text-gray-600">Statut: {t.statut}</div>
                        </div>
                        {t.statut === 'en_cours' && (
                            <button
                                className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                                onClick={async () => {
                                    try {
                                        await terminerTd(t.id);
                                        setTds((prev) => prev.map(p => p.id === t.id ? { ...p, statut: 'termine' } : p));
                                    } catch (e: any) {
                                        alert(e.message || 'Erreur');
                                    }
                                }}
                            >Terminer</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
