"use client";
import React from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  Clock,
} from "lucide-react";

export default function TeacherEpreuvesPage() {
  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Mes Épreuves
          </h1>
          <p className="text-gray-600">
            Gérez vos épreuves et examens
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Créer une épreuve
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une épreuve..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button>
      </div>

      {/* Grille des épreuves */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Épreuve 1 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                En cours
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contrôle Mathématiques
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Évaluation sur les fonctions exponentielles - Terminale S
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>15 Avril 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>2h00 - 14h00 à 16h00</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Edit className="h-4 w-4 mr-1 inline" />
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Épreuve 2 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Terminée
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Devoir Physique
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Mécanique et électricité - Première S
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>8 Avril 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>1h30 - 10h00 à 11h30</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Résultats
              </button>
              <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Épreuve 3 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Programmée
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Examen Chimie
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Chimie organique et minérale - Terminale S
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>22 Avril 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>3h00 - 8h00 à 11h00</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Edit className="h-4 w-4 mr-1 inline" />
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Épreuve 4 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                Terminée
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              TD Probabilités
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Exercices sur les probabilités conditionnelles
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>1 Avril 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>1h00 - 15h00 à 16h00</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Résultats
              </button>
              <button className="flex-1 py-2 px-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Épreuve 5 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                Programmée
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Baccalauréat Blanc
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Épreuve de mathématiques - Bac blanc
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>5 Mai 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>4h00 - 8h00 à 12h00</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Edit className="h-4 w-4 mr-1 inline" />
                Modifier
              </button>
            </div>
          </div>
        </div>

        {/* Épreuve 6 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                En cours
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Contrôle Continu
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Évaluation continue - Première S
            </p>
            <div className="flex items-center text-xs text-gray-500 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>18 Avril 2024</span>
            </div>
            <div className="flex items-center text-xs text-gray-500 mb-4">
              <Clock className="h-4 w-4 mr-1" />
              <span>1h30 - 9h00 à 10h30</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Edit className="h-4 w-4 mr-1 inline" />
                Modifier
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Affichage de <span className="font-medium">1</span> à{" "}
          <span className="font-medium">6</span> sur{" "}
          <span className="font-medium">6</span> résultats
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-green-600 border border-green-600 rounded-md">
            1
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}
