export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function api(path: string, options: RequestInit = {}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
    };
    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const ct = res.headers.get('content-type') || '';
    // Si on a été redirigé vers une page HTML (login Laravel), considérer comme non authentifié
    if (ct.includes('text/html')) {
        const html = await res.text();
        if (html.includes('<!DOCTYPE')) {
            if (typeof window !== 'undefined') {
                // Token invalide -> supprimer
                if (token) localStorage.removeItem('token');
            }
            throw new Error('Non authentifié');
        }
        return html;
    }
    if (!res.ok) {
        let payload: any = null;
        try { payload = ct.includes('application/json') ? await res.json() : await res.text(); } catch { }
        let message = payload?.message || (typeof payload === 'string' ? payload : null) || `HTTP ${res.status}`;
        if (payload?.code === 'TEACHER_NOT_VALIDATED') {
            message = 'Compte enseignant non validé';
        }
        const err: any = new Error(message);
        if (payload?.code) err.code = payload.code;
        throw err;
    }
    return ct.includes('application/json') ? res.json() : res.text();
}

export async function login(email: string, password: string) {
    const data = await api('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    if (typeof window !== 'undefined') localStorage.setItem('token', data.token);
    return data;
}

export async function me() {
    return api('/auth/me');
}
export async function updateTeacherProfile(data: any) { return api('/auth/me', { method: 'PUT', body: JSON.stringify(data) }); }

export async function listTDs() {
    return api('/tds');
}

export async function terminerTd(id: number) {
    return api(`/tds/${id}/terminer`, { method: 'POST' });
}

export async function listTDsAdmin(params: { statut?: string, page?: number } = {}) {
    const query = new URLSearchParams();
    if (params.statut && params.statut !== 'tous') query.append('statut', params.statut);
    if (params.page) query.append('page', String(params.page));
    const qs = query.toString();
    return api(`/tds${qs ? `?${qs}` : ''}`);
}

export async function createTd(data: { epreuve_id: number; enseignant_id: number; titre: string; description?: string; montant: number; date_debut?: string; date_fin?: string }) {
    return api('/tds', { method: 'POST', body: JSON.stringify(data) });
}

export async function payerTd(id: number) {
    return api(`/tds/${id}/payer`, { method: 'POST' });
}

export async function listEnseignants() {
    return api('/admin/enseignants');
}

export async function logout() {
    try {
        await api('/auth/logout', { method: 'POST' });
    } catch (e) {
        // ignorer erreurs (ex: token déjà révoqué)
    }
    if (typeof window !== 'undefined') localStorage.removeItem('token');
}

// Admin enseignants
export async function validerEnseignant(id: number) {
    return api(`/admin/enseignants/${id}/valider`, { method: 'POST' });
}
export async function deleteEnseignant(id: number) {
    return api(`/admin/enseignants/${id}`, { method: 'DELETE' });
}
export async function createEnseignant(data: { name: string; email: string; password: string; bank_name?: string; bank_account?: string; phone?: string; establishment?: string; subject?: string; classe?: string; ifru?: string; }) {
    return api('/auth/register', { method: 'POST', body: JSON.stringify({ ...data, password_confirmation: data.password }) });
}

// Epreuves
export async function listEpreuves() { return api('/epreuves'); }
export async function createEpreuve(data: { titre: string; description?: string }) { return api('/epreuves', { method: 'POST', body: JSON.stringify(data) }); }
export async function updateEpreuve(id: number, data: any) { return api(`/epreuves/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
export async function deleteEpreuve(id: number) { return api(`/epreuves/${id}`, { method: 'DELETE' }); }

// Updates (à implémenter backend si nécessaire)
export async function updateTd(id: number, data: any) { return api(`/tds/${id}`, { method: 'PUT', body: JSON.stringify(data) }); }
// (ancienne updateEpreuve repositionnée plus haut)

// Admin profil
export async function updateAdminProfile(data: { name?: string; email?: string; password?: string }) {
    return api('/admin/profile', { method: 'PUT', body: JSON.stringify(data) });
}

// Teacher stats (endpoint à créer si non existant)
export async function teacherStats() { return api('/teacher/stats'); }
