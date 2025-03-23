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
  patientId: string; // Required to associate with a patient
}

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  medication?: Medication | null; // Allow editing when a medication is passed
  patientId: string | null; // ID of the patient associated with the medication
  refreshMedications: () => void; // Refresh list after save
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
  const isEditMode = Boolean(medication); // Check if editing

  // Prefill form fields when editing
  useEffect(() => {
    if (medication) {
      Object.entries(medication).forEach(([key, value]) => {
        setValue(key as keyof Medication, value as never); // Ensures type compatibility
      });
    } else {
      reset();
    }
  }, [medication, setValue, reset]);

  if (!isOpen) return null; // Don't render if modal is closed

  const onSubmit = async (data: Medication) => {
    if (!patientId) {
      toast.error("No patient selected!");
      return;
    }

    try {
      setLoading(true);
      const formattedData = { ...data, patientId }; // Ensure the medication is linked to a patient

      if (isEditMode) {
        await axios.put(`/api/medications/${medication?.id}`, formattedData);
        toast.success("Medication record updated successfully!");
      } else {
        await axios.post("/api/medications", formattedData);
        toast.success("Medication record created successfully!");
      }

      reset();
      onClose();
      refreshMedications(); // Refresh list
    } catch (error) {
      console.log(error);
      toast.error("Error saving medication record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
      onMouseDown={onClose} // Close modal when clicking outside
    >
      <div
        className="bg-white shadow-md rounded-xl p-8 max-w-4xl w-full"
        onMouseDown={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h1 className="text-black text-xl font-bold mb-6">
          {isEditMode ? "Edit Medication" : "Add New Medication"}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Form Fields */}
          {[
            {
              label: "Medication Name",
              name: "name",
              type: "text",
              required: true,
            },
            { label: "Dosage", name: "dosage", type: "text", required: true },
            { label: "Route", name: "route", type: "text", required: true },
            {
              label: "Frequency",
              name: "frequency",
              type: "text",
              required: true,
            },
            {
              label: "Indication",
              name: "indication",
              type: "text",
              required: true,
            },
            {
              label: "Prescribed By",
              name: "prescribedBy",
              type: "text",
              required: true,
            },
          ].map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm text-gray-600 font-semibold">
                {label}
              </label>
              <input
                type={type}
                {...register(
                  name as keyof Medication,
                  required ? { required: `${label} is required` } : {}
                )}
                className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
                placeholder={label}
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
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
