import React, { useState } from "react";
import { FileText, Upload, X } from "lucide-react";

interface EpreuveFormData {
  titre: string;
  description: string;
  fichier: File | null;
}

interface AddEpreuveProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: EpreuveFormData) => void;
}

export default function AddEpreuve({
  isOpen,
  onClose,
  onSubmit,
}: AddEpreuveProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<EpreuveFormData>({
    titre: "",
    description: "",
    fichier: null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      fichier: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titre.trim()) {
      alert("Veuillez saisir un titre pour l'épreuve");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      setFormData({
        titre: "",
        description: "",
        fichier: null,
      });
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création de l'épreuve:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      titre: "",
      description: "",
      fichier: null,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Créer une épreuve</h2>
              <p className="text-green-100 mt-1">
                Ajoutez une nouvelle épreuve avec ses documents
              </p>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-green-200 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Titre de l&apos;épreuve *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FileText className="h-5 w-5" />
              </div>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                placeholder="Ex: Contrôle Mathématiques - Chapitre 5"
                className="w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 border-gray-300 bg-white hover:border-gray-400"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Décrivez le contenu de l'épreuve, les chapitres concernés, les consignes particulières..."
              rows={4}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none border-gray-300 bg-white hover:border-gray-400"
            />
          </div>

          {/* Upload de fichier */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Fichier de l&apos;épreuve
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="h-6 w-6 text-gray-400" />
                </div>

                {formData.fichier ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      Fichier sélectionné:
                    </p>
                    <div className="inline-flex items-center px-3 py-2 bg-green-50 border border-green-200 rounded-lg">
                      <FileText className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">
                        {formData.fichier.name}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, fichier: null }))
                        }
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Glissez-déposez votre fichier ici ou
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Choisir un fichier
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                      />
                    </label>
                  </div>
                )}

                <p className="text-xs text-gray-500">
                  Formats acceptés: PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.titre.trim()}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isSubmitting ? "Création..." : "Créer l'épreuve"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
