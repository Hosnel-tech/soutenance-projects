"use client";
import React from "react";
import {
  Users,
  ClipboardList,
  TrendingUp,
  Calendar,
  Clock,
  FileText,
} from "lucide-react";

export default function TeacherDashboard() {
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
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ClipboardList className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mes TD</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Étudiants</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Épreuves</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Moyenne</p>
              <p className="text-2xl font-bold text-gray-900">14.2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prochains TD */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Prochains TD
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">
                  TD Mathématiques - Terminale S
                </p>
                <p className="text-xs text-gray-500">
                  Aujourd&apos;hui à 14h00
                </p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">
                  TD Physique - Première S
                </p>
                <p className="text-xs text-gray-500">Demain à 10h00</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="flex-shrink-0">
                <Clock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-800">
                  TD Chimie - Terminale S
                </p>
                <p className="text-xs text-gray-500">Vendredi à 15h30</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center">
              <ClipboardList className="h-4 w-4 mr-2" />
              Créer un nouveau TD
            </button>
            <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Ajouter une épreuve
            </button>
            <button className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Voir mes étudiants
            </button>
            <button className="w-full py-3 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Statistiques
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
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                TD Mathématiques créé
              </p>
              <p className="text-xs text-gray-500">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Notes saisies - Physique
              </p>
              <p className="text-xs text-gray-500">Il y a 4 heures</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Épreuve programmée
              </p>
              <p className="text-xs text-gray-500">Hier</p>
            </div>
          </div>
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
