import React, { useState } from "react";

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

interface AddTDProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TDFormData) => void;
}

export default function AddTD({ isOpen, onClose, onSubmit }: AddTDProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<TDFormData>({
    titre: "",
    matiere: "",
    classe: "",
    etablissement: "",
    date: "",
    duree: "",
    description: "",
    enseignant: "",
  });

  const etablissements = ["Berger", "Palmier", "Pyramide"];
  const matieres = [
    "Anglais",
    "Français",
    "Mathématiques",
    "Physique",
    "Chimie",
    "Biologie",
    "Histoire",
    "Géographie",
    "Informatique",
    "Économie",
  ];
  const classes = [
    "CM2",
    "6ème",
    "5ème",
    "4ème",
    "3ème",
    "2nde",
    "1ère S",
    "1ère ES",
    "1ère L",
    "Terminale S",
    "Terminale ES",
    "Terminale L",
  ];

  const enseignants = [
    "Jean Dupont",
    "Marie Martin",
    "Pierre Durand",
    "Sophie Bernard",
    "Paul Moreau",
    "Claire Dubois",
    "Michel Leroy",
    "Anne Petit",
  ];

  const steps = [
    {
      id: 1,
      name: "Informations générales",
      description: "Titre et matière du TD",
    },
    {
      id: 2,
      name: "Planning et lieu",
      description: "Dates, horaires et salle",
    },
    {
      id: 3,
      name: "Détails et validation",
      description: "Description et finalisation",
    },
  ];

  // Icons as SVG components
  const BookOpenIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );

  const GraduationCapIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l9-5-9-5-9 5 9 5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
      />
    </svg>
  );

  const BuildingIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );

  const CalendarIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );

  const ClockIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const UserIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );

  const DocumentTextIcon = () => (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const XIcon = () => (
    <svg
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: TDFormData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = (): void => {
    if (currentStep < 3) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };

  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep((prev: number) => prev - 1);
    }
  };

  const handleSubmit = async (): Promise<void> => {
    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        titre: "",
        matiere: "",
        classe: "",
        etablissement: "",
        date: "",
        duree: "",
        description: "",
        enseignant: "",
      });
      setCurrentStep(1);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (): void => {
    setFormData({
      titre: "",
      matiere: "",
      classe: "",
      etablissement: "",
      date: "",
      duree: "",
      description: "",
      enseignant: "",
    });
    setCurrentStep(1);
    onClose();
  };

  interface InputFieldProps {
    label: string;
    name: keyof TDFormData;
    type?: string;
    placeholder: string;
    icon?: React.ComponentType;
    options?: string[] | null;
  }

  const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    icon: IconComponent,
    options = null,
  }) => {
    const isTextArea = name === "description";
    const isSelect = options !== null;

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          {IconComponent && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <IconComponent />
            </div>
          )}

          {isSelect ? (
            <select
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              className={`w-full ${
                IconComponent ? "pl-12" : "pl-4"
              } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-300 bg-white hover:border-gray-400`}
            >
              <option value="">{placeholder}</option>
              {options.map((option: string) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : isTextArea ? (
            <textarea
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              placeholder={placeholder}
              rows={4}
              className={`w-full ${
                IconComponent ? "pl-12" : "pl-4"
              } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 resize-none border-gray-300 bg-white hover:border-gray-400`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleInputChange}
              placeholder={placeholder}
              className={`w-full ${
                IconComponent ? "pl-12" : "pl-4"
              } pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 border-gray-300 bg-white hover:border-gray-400`}
            />
          )}
        </div>
      </div>
    );
  };

  const renderStep = (): React.ReactElement | null => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <InputField
              label="Titre du TD"
              name="titre"
              placeholder="Ex: TD de Mathématiques - Équations du second degré"
              icon={DocumentTextIcon}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Matière"
                name="matiere"
                placeholder="Sélectionner une matière"
                icon={BookOpenIcon}
                options={matieres}
              />
              <InputField
                label="Classe"
                name="classe"
                placeholder="Sélectionner une classe"
                icon={GraduationCapIcon}
                options={classes}
              />
            </div>
            <InputField
              label="Établissement"
              name="etablissement"
              placeholder="Sélectionner un établissement"
              icon={BuildingIcon}
              options={etablissements}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Date du TD"
                name="date"
                type="date"
                placeholder="Sélectionner la date"
                icon={CalendarIcon}
              />
              <InputField
                label="Durée"
                name="duree"
                placeholder="Ex: 2h, 1h30, 45min"
                icon={ClockIcon}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <InputField
              label="Enseignant responsable"
              name="enseignant"
              placeholder="Sélectionner un enseignant"
              icon={UserIcon}
              options={enseignants}
            />
            <InputField
              label="Description du TD"
              name="description"
              placeholder="Décrivez les objectifs, le contenu et les modalités du TD..."
              icon={DocumentTextIcon}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Ajouter un TD</h2>
              <p className="text-blue-100 mt-1">
                {steps[currentStep - 1].description}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-blue-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              <XIcon />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step.id < currentStep
                        ? "bg-green-500 text-white"
                        : step.id === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step.id < currentStep ? <CheckCircleIcon /> : step.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p
                      className={`text-sm font-medium ${
                        step.id <= currentStep
                          ? "text-gray-900"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-20 h-1 mx-4 ${
                      step.id < currentStep ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-96">{renderStep()}</div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t flex justify-between items-center">
          <div>
            {currentStep > 1 && (
              <button
                onClick={prevStep}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                ← Précédent
              </button>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>

            {currentStep < 3 ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Suivant →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
              >
                {isSubmitting ? "Création..." : "Créer le TD"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
