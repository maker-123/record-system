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
  medication: Medication | null; // Optional for editing
  patientId: string; // Ensure it's linked to a patient
  refreshMedications: () => void; // Callback to refresh list
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

  // Prefill form when editing
  useEffect(() => {
    if (medication) {
      Object.entries(medication).forEach(([key, value]) => {
        setValue(key as keyof Medication, value as never);
      });
    } else {
      reset();
    }
  }, [medication, setValue, reset]);

  if (!isOpen) return null;

  const onSubmit = async (data: Medication) => {
    try {
      setLoading(true);
      const payload = { ...data, patientId };

      if (isEditMode) {
        await axios.put(`/api/medications/${medication?.id}`, payload);
        toast.success("Medication updated successfully!");
      } else {
        await axios.post("/api/medications", payload);
        toast.success("Medication added successfully!");
      }

      reset();
      onClose();
      refreshMedications();
    } catch (error) {
      console.error(error);
      toast.error("Error saving medication.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onMouseDown={onClose}
    >
      <div
        className="bg-white shadow-md rounded-xl p-8 max-w-lg w-full"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Medication" : "Add Medication"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {[
            { label: "Name", name: "name", type: "text" },
            { label: "Dosage", name: "dosage", type: "text" },
            { label: "Route", name: "route", type: "text" },
            { label: "Frequency", name: "frequency", type: "text" },
            { label: "Indication", name: "indication", type: "text" },
            { label: "Prescribed By", name: "prescribedBy", type: "text" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm font-semibold">{label}</label>
              <input
                type={type}
                {...register(name as keyof Medication, { required: true })}
                className="border border-gray-300 rounded-lg p-2"
                placeholder={label}
              />
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
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
