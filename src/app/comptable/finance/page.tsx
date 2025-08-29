"use client";
import React from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  FileText,
} from "lucide-react";

export default function FinanceDashboard() {
  const stats = [
    {
      title: "Revenus Total",
      value: "€45,231",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
      borderColor: "border-green-500",
    },
    {
      title: "Dépenses",
      value: "€32,450",
      change: "-8.2%",
      trend: "down",
      icon: CreditCard,
      color: "text-red-600",
      bgColor: "bg-red-100",
      borderColor: "border-red-500",
    },
    {
      title: "Bénéfice Net",
      value: "€12,781",
      change: "+15.3%",
      trend: "up",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      borderColor: "border-blue-500",
    },
    {
      title: "Factures en Attente",
      value: "23",
      change: "+5",
      trend: "up",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Dashboard Finance
          </h1>
          <p className="text-gray-600">
            Vue d&apos;ensemble de votre situation financière
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${stat.borderColor}`}
            >
              <div className="flex items-center">
                <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p
                    className={`text-sm mt-1 flex items-center ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {stat.change}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tableau de gestion des heures */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            Gestion des Heures et Paiements
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Suivi des heures travaillées et des paiements
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Nom et Prénoms
                </th>
                <th
                  className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200"
                  colSpan={6}
                >
                  Nombre d&apos;heures
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Total
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Matière
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Taux Horaire
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">
                  Montant
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paiement
                </th>
              </tr>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200"></th>
                <th className="px-1 py-2 text-xs text-gray-600 border-r border-gray-200" colSpan={2}>
                  27/04/2024
                </th>
                <th className="px-1 py-2 text-xs text-gray-600 border-r border-gray-200" colSpan={2}>
                  28/04/2024
                </th>
                <th className="px-1 py-2 text-xs text-gray-600 border-r border-gray-200" colSpan={2}>
                  29/04/2024
                </th>
                <th className="px-2 py-2 text-xs text-gray-600 border-r border-gray-200">
                  Total
                </th>
                <th className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200"></th>
                <th className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200"></th>
                <th className="px-4 py-2 text-xs text-gray-600 border-r border-gray-200"></th>
                <th className="px-4 py-2 text-xs text-gray-600"></th>
              </tr>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300"></th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  3ème
                </th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  Tle
                </th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  3ème
                </th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  Tle
                </th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  3ème
                </th>
                <th className="px-1 py-2 text-xs text-gray-700 border-r border-gray-300">
                  Tle
                </th>
                <th className="px-2 py-2 text-xs text-gray-700 border-r border-gray-300">
                  H
                </th>
                <th className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300"></th>
                <th className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300"></th>
                <th className="px-4 py-2 text-xs text-gray-700 border-r border-gray-300"></th>
                <th className="px-4 py-2 text-xs text-gray-700"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr className="bg-gray-100">
                <td
                  colSpan={12}
                  className="px-4 py-3 text-center text-sm font-semibold text-gray-700 bg-gray-200"
                >
                  SURU LERE
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                  ADEBO Murywa
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-2 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  8
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  Maths
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  6000
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200">
                  48000
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Payé
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                  AHOUANSOU Marcel
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-2 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  8
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  Anglais
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  6000
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200">
                  21000
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    Payé
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">
                  ASSOGBA Ghislain
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  0
                </td>
                <td className="px-1 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  4
                </td>
                <td className="px-2 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  8
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  Philo
                </td>
                <td className="px-4 py-3 text-sm text-gray-900 text-center border-r border-gray-200">
                  6000
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gray-900 text-center border-r border-gray-200">
                  24000
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    Payé
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Showing 1-3 from 100 data</span>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                ‹
              </button>
              <button className="px-3 py-1 rounded bg-green-600 text-white">
                1
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                2
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                3
              </button>
              <button className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-600">
          © 2024 Comptabilité Pro. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
