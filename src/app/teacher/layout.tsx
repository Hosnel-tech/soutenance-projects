"use client";
import React, { useState, useEffect } from "react";
import { logout, me } from "@/lib/api";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  FileText,
  ClipboardList,
  GraduationCap,
} from "lucide-react";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Vérifier token présent
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) { router.replace('/login'); return; }
    (async () => {
      try {
        const u = await me();
        if (u.role !== 'enseignant') {
          // rediriger selon rôle
          if (u.role === 'admin') router.replace('/admin');
          else router.replace('/');
          return;
        }
        setAuthChecked(true);
      } catch (e: any) {
        setAuthError(e.message || 'Non authentifié');
        localStorage.removeItem('token');
        router.replace('/login');
      }
    })();
  }, [router]);

  const navigation = [
    {
      name: "Tableau de bord",
      href: "/teacher/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/teacher/dashboard",
    },
    {
      name: "Épreuves",
      href: "/teacher/epreuves",
      icon: FileText,
      current: pathname === "/teacher/epreuves",
    },
    {
      name: "Mes TD",
      href: "/teacher/mes-td",
      icon: ClipboardList,
      current: pathname === "/teacher/mes-td",
    },
    {
      name: "Paramètres",
      href: "/teacher/settings",
      icon: Settings,
      current: pathname === "/teacher/settings",
    },
  ];

  const handleNavigation = (href: string) => {
    router.push(href);
    setSidebarOpen(false); // Ferme le sidebar sur mobile
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (!authChecked && !authError) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-gray-500">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar pour mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"
          }`}
      >
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75"
          onClick={() => setSidebarOpen(false)}
        />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Espace Enseignant
            </h2>
            <button aria-label="Fermer le menu"
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${item.current
                  ? "bg-green-100 text-green-700 border-r-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${item.current
                    ? "text-green-500"
                    : "text-gray-400 group-hover:text-gray-500"
                    }`}
                />
                {item.name}
              </button>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar pour desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          {/* Logo et titre */}
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-gray-900">
                EduTD Teacher
              </h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${item.current
                  ? "bg-green-100 text-green-700 border-r-2 border-green-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${item.current
                    ? "text-green-500"
                    : "text-gray-400 group-hover:text-gray-500"
                    }`}
                />
                {item.name}
              </button>
            ))}
          </nav>

          {/* Section déconnexion */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={handleLogout}
              className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors duration-200"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              Déconnexion
            </button>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="lg:pl-64">
        {/* Header mobile */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
          <button aria-label="Ouvrir le menu"
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Espace Enseignant
          </div>
          <Link
            href="/"
            className="flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <Home className="h-5 w-5" />
            Accueil
          </Link>
        </div>

        {/* Contenu des pages */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
