"use client";
import React from "react";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
} from "lucide-react";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Documents
          </h1>
          <p className="text-gray-600">
            Gérez les documents et ressources pédagogiques
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un document
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un document..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </button>
      </div>

      {/* Grille des documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Document 1 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                PDF
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Programme Mathématiques Terminale
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Programme officiel de mathématiques pour la classe de terminale
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 15/03/2024</span>
              <span>2.5 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Document 2 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                DOCX
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Fiches de révision Français
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Fiches de révision pour le baccalauréat de français
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 12/03/2024</span>
              <span>1.8 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Document 3 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                XLSX
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Grille d'évaluation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Grille d'évaluation standardisée pour les examens
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 10/03/2024</span>
              <span>0.9 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Document 4 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                PPTX
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Présentation Histoire
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Présentation PowerPoint sur la Révolution française
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 08/03/2024</span>
              <span>5.2 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Document 5 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-red-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                ZIP
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Ressources Sciences
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Archive contenant des ressources pour les sciences
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 05/03/2024</span>
              <span>15.7 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
              </button>
            </div>
          </div>
        </div>

        {/* Document 6 */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-200">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                PDF
              </span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Guide pédagogique
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Guide complet pour les enseignants
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>Ajouté le 01/03/2024</span>
              <span>8.3 MB</span>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 py-2 px-3 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200 transition-colors duration-200">
                <Eye className="h-4 w-4 mr-1 inline" />
                Voir
              </button>
              <button className="flex-1 py-2 px-3 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200 transition-colors duration-200">
                <Download className="h-4 w-4 mr-1 inline" />
                Télécharger
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
          <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md">
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
