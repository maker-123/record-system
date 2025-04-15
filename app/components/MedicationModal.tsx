"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Medication {
  id?: string;
  name: string;
  dosage: string;
  route: string;
  frequency: string;
  indication: string;
  prescribedBy: string;
  patientId: string;
}

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication?: Medication | null;
  patientId: string | null;
  refreshMedications: () => void;
}

const MedicationModal: React.FC<MedicationModalProps> = ({
  isOpen,
  onClose,
  medication,
  patientId,
  refreshMedications,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Medication>();
  const [loading, setLoading] = useState(false);
  const isEditMode = Boolean(medication);

  useEffect(() => {
    if (isOpen) {
      if (medication) {
        Object.entries(medication).forEach(([key, value]) => {
          setValue(key as keyof Medication, value as never);
        });
      } else {
        reset();
      }
    }
  }, [isOpen, medication, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: Medication) => {
    if (!patientId) {
      toast.error("No patient selected!");
      return;
    }

    try {
      setLoading(true);
      const formattedData = { ...data, patientId };

      if (isEditMode) {
        await axios.put(
          `/api/medications/${medication?.id}?id=${medication?.id}`,
          formattedData
        );
        toast.success("Medication updated successfully!");
      } else {
        await axios.post("/api/medications", formattedData);
        toast.success("Medication added successfully!");
      }

      reset();
      onClose();
      refreshMedications();
    } catch (error) {
      console.log(error);

      toast.error("Error saving medication record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black "
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      onMouseDown={onClose}
    >
      <div
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isEditMode
            ? `Edit Medication (${medication?.id})`
            : "Add Medication"}
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 grid-cols-1 md:grid-cols-2"
        >
          {[
            {
              label: "Medication Name",
              name: "name",
              options: [
                "Acetaminophen",
                "Ibuprofen",
                "Morphine",
                "Fentanyl",
                "Amoxicillin",
                "Amlodipine",
                "Losartan",
                "Metformin",
                "Cetirizine",
                "Omeprazole",
                "Aspirin",
              ],
            },
            {
              label: "Preparation",
              name: "preparation",
              options: [
                "Liquid",
                "Tablet",
                "Capsules",
                "Topical",
                "Suppositories",
                "Drops",
                "Inhalers",
                "Injections",
                "Implants",
                "Patches",
              ],
            },
            {
              label: "Route of Administration",
              name: "route",
              options: [
                "Oral",
                "Intravenous",
                "Intramuscular",
                "Subcutaneous",
                "Other",
              ],
            },
            {
              label: "Frequency",
              name: "frequency",
              options: [
                "Once Daily",
                "Twice Daily",
                "Three Times Daily",
                "Four Times Daily",
                "Every 4 Hours",
                "Every 8 Hours",
                "As Needed",
                "Other",
              ],
            },
          ].map(({ label, name, options }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">
                {label}
              </label>
              <select
                {...register(name as keyof Medication, {
                  required: `${label} is required`,
                })}
                className="border border-gray-300 rounded-lg p-2.5 text-black text-sm"
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}

          {[
            { label: "Dosage", name: "dosage" },
            { label: "Prescribed By", name: "prescribedBy" },
          ].map(({ label, name }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-600">
                {label}
              </label>
              <input
                type="text"
                {...register(name as keyof Medication)}
                className="border border-gray-300 rounded-lg p-2.5 text-black text-sm"
                placeholder={label}
              />
            </div>
          ))}

          <div className="flex flex-col col-span-2">
            <label className="text-sm text-gray-600 font-semibold">
              Indication
            </label>
            <textarea
              {...register("indication")}
              className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
              placeholder="Indication"
            />
          </div>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-5 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : isEditMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicationModal;
