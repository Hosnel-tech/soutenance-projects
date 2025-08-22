"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Building,
  CreditCard,
  MapPin,
  Phone,
  Lock,
  CheckCircle,
  LayoutDashboard,
} from "lucide-react";

interface FormData {
  nom: string;
  prenom: string;
  ifu: string;
  numeroCompte: string;
  banque: string;
  etablissement: string;
  email: string;
  telephone: string;
  adresse: string;
  motDePasse: string;
  confirmMotDePasse: string;
}

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    nom: "",
    prenom: "",
    ifu: "",
    numeroCompte: "",
    banque: "",
    etablissement: "",
    email: "",
    telephone: "",
    adresse: "",
    motDePasse: "",
    confirmMotDePasse: "",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const banques: string[] = ["Ecobank", "UBA", "NSIA"];
  const etablissements: string[] = ["Berger", "Palmier", "Pyramide"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simuler un délai de soumission
    setTimeout(() => {
      console.log("Données du formulaire:", formData);
      setIsSubmitting(false);

      // Rediriger vers le dashboard après création du compte
      router.push("/admin/dashboard");
    }, 1000);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Informations personnelles
        </h2>
        <p className="text-gray-600">Commençons par vos informations de base</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleInputChange}
            placeholder="Nom"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleInputChange}
            placeholder="Prénom"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>
      </div>

      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Adresse email"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="relative">
        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="tel"
          name="telephone"
          value={formData.telephone}
          onChange={handleInputChange}
          placeholder="Numéro de téléphone"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Informations bancaires
        </h2>
        <p className="text-gray-600">
          Vos informations professionnelles et bancaires
        </p>
      </div>

      <div className="relative">
        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          name="ifu"
          value={formData.ifu}
          onChange={handleInputChange}
          placeholder="Numéro IFU"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="relative">
        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          name="numeroCompte"
          value={formData.numeroCompte}
          onChange={handleInputChange}
          placeholder="Numéro de compte bancaire"
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      <div className="relative">
        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          name="banque"
          value={formData.banque}
          onChange={handleInputChange}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
        >
          <option value="">Sélectionner votre banque</option>
          {banques.map((banque) => (
            <option key={banque} value={banque}>
              {banque}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <select
          name="etablissement"
          value={formData.etablissement}
          onChange={handleInputChange}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
        >
          <option value="">Sélectionner votre établissement</option>
          {etablissements.map((etablissement) => (
            <option key={etablissement} value={etablissement}>
              {etablissement}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Finalisation</h2>
        <p className="text-gray-600">
          Dernières informations pour créer votre compte
        </p>
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={showPassword ? "text" : "password"}
          name="motDePasse"
          value={formData.motDePasse}
          onChange={handleInputChange}
          placeholder="Mot de passe"
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type={showConfirmPassword ? "text" : "password"}
          name="confirmMotDePasse"
          value={formData.confirmMotDePasse}
          onChange={handleInputChange}
          placeholder="Confirmer le mot de passe"
          className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showConfirmPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 animate-slideDown">
          <div className="mx-auto w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
            <LayoutDashboard className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            EduTD Manager
          </h1>
          <p className="text-gray-600">Créez votre compte pour commencer</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8 animate-slideDown">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step <= currentStep
                      ? "bg-[#004B70] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-8 h-1 mx-2 transition-all duration-300 ${
                      step < currentStep ? "bg-[#004B70]" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 animate-slideUp">
          <div>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Précédent
                </button>
              )}

              <div className="ml-auto">
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-[#004B70] text-white rounded-lg hover:from-blue-600 hover:to-[#004B70] transition-all duration-200 transform hover:scale-105"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-gradient-to-r from-[#0F673B] to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Inscription...</span>
                      </>
                    ) : (
                      <span>Créer le compte</span>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 animate-slideUp">
          <p className="text-gray-600">
            Vous avez déjà un compte ?{" "}
            <a
              href="/login"
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Se connecter
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
