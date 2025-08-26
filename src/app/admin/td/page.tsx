"use client";
import React, { useState } from "react";
import AddTd from "@/components/add_td";

import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Clock,
  FileText,
  Edit,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

export default function TDPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("tous");
  const [showModal, setShowModal] = useState(false);

  // Données fictives pour les TD
  const tdList = [
    {
      id: 1,
      titre: "TD Mathématiques - Algèbre linéaire",
      matiere: "Mathématiques",
      classe: "Terminale",
      etablissement: "Berger",
      enseignant: "Jean Dupont",
      dateCreation: "2024-01-15",
      duree: "2h",
      etudiants: 25,
      statut: "en cours",
      description: "Exercices sur les matrices et déterminants",
    },
    {
      id: 2,
      titre: "TD Physique - Mécanique",
      matiere: "Physique",
      classe: "1ère",
      etablissement: "Palmier",
      enseignant: "Marie Martin",
      dateCreation: "2024-01-10",
      duree: "1h30",
      etudiants: 30,
      statut: "terminé",
      description: "Problèmes de cinématique et dynamique",
    },
    {
      id: 3,
      titre: "TD Chimie - Réactions acido-basiques",
      matiere: "Chimie",
      classe: "Terminale",
      etablissement: "Pyramide",
      enseignant: "Pierre Durand",
      dateCreation: "2024-01-08",
      duree: "2h",
      etudiants: 28,
      statut: "payé",
      description: "Équilibres chimiques et pH",
    },
    {
      id: 4,
      titre: "TD Biologie - Génétique",
      matiere: "Biologie",
      classe: "1ère",
      etablissement: "Berger",
      enseignant: "Sophie Bernard",
      dateCreation: "2024-01-05",
      duree: "1h45",
      etudiants: 22,
      statut: "en attente",
      description: "Hérédité et croisements génétiques",
    },
  ];

  const filteredTD = tdList.filter((td) => {
    const matchesSearch =
      td.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      td.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
      td.enseignant.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "tous" || td.statut === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  interface TDFormData {
    titre: string;
    matiere: string;
    classe: string;
    etablissement: string;
    date: string;
    duree: string;
    description: string;
    enseignant: string;
  }

  const handleSubmit = async (data: TDFormData) => {
    console.log("Données du TD:", data);
    // Ici vous pouvez ajouter la logique pour sauvegarder le TD
    // Par exemple, appel API, mise à jour de l'état, etc.
  };

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "en attente":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            En attente
          </span>
        );
      case "en cours":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
            En cours
          </span>
        );
      case "terminé":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Terminé
          </span>
        );
      case "payé":
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
            Payé
          </span>
        );
      default:
        return (
          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
            {statut}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Travaux Dirigés
          </h1>
          <p className="text-gray-600">
            Gérez les TD, exercices et supports de cours
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Créer un TD
        </button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Total TD</p>
              <p className="text-lg font-semibold text-gray-900">
                {tdList.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">TD En cours</p>
              <p className="text-lg font-semibold text-gray-900">
                {tdList.filter((td) => td.statut === "en cours").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Temps Moyen</p>
              <p className="text-lg font-semibold text-gray-900">1h45</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">TD Terminés</p>
              <p className="text-lg font-semibold text-gray-900">
                {tdList.filter((td) => td.statut === "terminé").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un TD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="tous">Tous les statuts</option>
          <option value="en attente">En attente</option>
          <option value="en cours">En cours</option>
          <option value="terminé">Terminé</option>
          <option value="payé">Payé</option>
        </select>
        <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200">
          <Filter className="h-4 w-4 mr-2" />
          Plus de filtres
        </button>
      </div>

      {/* Tableau des TD */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Liste des Travaux Dirigés
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  TD
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Matière
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enseignant
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Classe
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Établissement
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTD.map((td) => (
                <tr key={td.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {td.titre}
                        </div>
                        <div className="text-sm text-gray-500">
                          {td.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {td.matiere}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {td.enseignant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {td.classe}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {td.etablissement}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-400" />
                      {td.duree}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(td.statut)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-orange-600 hover:text-orange-900 p-1 rounded hover:bg-orange-50">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Affichage de <span className="font-medium">1</span> à{" "}
          <span className="font-medium">{filteredTD.length}</span> sur{" "}
          <span className="font-medium">{tdList.length}</span> résultats
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Précédent
          </button>
          <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-600 rounded-md hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>

      {/* Composant AddTD */}
      <AddTd
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
