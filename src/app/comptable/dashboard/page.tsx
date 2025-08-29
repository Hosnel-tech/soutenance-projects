"use client";

import React from "react";
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  FileText,
  PieChart,
  Users,
  Clock,
} from "lucide-react";

export default function Dashboard() {
  const recentTransactions = [
    {
      id: 1,
      description: "Vente produit A",
      amount: "+€1,250",
      date: "Il y a 2 heures",
      type: "income",
    },
    {
      id: 2,
      description: "Achat matériel bureau",
      amount: "-€450",
      date: "Il y a 4 heures",
      type: "expense",
    },
    {
      id: 3,
      description: "Prestation service",
      amount: "+€2,100",
      date: "Hier",
      type: "income",
    },
    {
      id: 4,
      description: "Facture électricité",
      amount: "-€180",
      date: "Il y a 2 jours",
      type: "expense",
    },
    {
      id: 5,
      description: "Vente produit B",
      amount: "+€890",
      date: "Il y a 3 jours",
      type: "income",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace comptable
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Revenus Total</p>
              <p className="text-2xl font-bold text-gray-900">€45,231</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <CreditCard className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dépenses</p>
              <p className="text-2xl font-bold text-gray-900">€32,450</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bénéfice Net</p>
              <p className="text-2xl font-bold text-gray-900">€12,781</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Factures en Attente</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-green-600" />
            Transactions Récentes
          </h2>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className={`flex items-center p-3 rounded-lg border-l-4 ${
                transaction.type === "income" 
                  ? "bg-green-50 border-green-500" 
                  : "bg-red-50 border-red-500"
              }`}>
                <div className="flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === "income" ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {transaction.description}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}>
                    {transaction.amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Actions rapides
          </h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center">
              <FileText className="h-4 w-4 mr-2" />
              Nouvelle Facture
            </button>
            <button className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center justify-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Enregistrer Dépense
            </button>
            <button className="w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center">
              <PieChart className="h-4 w-4 mr-2" />
              Rapport Mensuel
            </button>
            <button className="w-full py-3 px-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center justify-center">
              <Users className="h-4 w-4 mr-2" />
              Gérer Clients
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
                Facture créée - Client ABC
              </p>
              <p className="text-xs text-gray-500">Il y a 2 heures</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Paiement reçu - €1,250
              </p>
              <p className="text-xs text-gray-500">Il y a 4 heures</p>
            </div>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-800">
                Rapport généré
              </p>
              <p className="text-xs text-gray-500">Hier</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12">
        <p className="text-gray-600">
          © 2024 Module Comptable. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
