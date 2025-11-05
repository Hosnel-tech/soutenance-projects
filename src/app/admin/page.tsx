import { redirect } from 'next/navigation';

export default function AdminIndex() {
    // Redirige vers le tableau de bord admin
    redirect('/admin/dashboard');
}
