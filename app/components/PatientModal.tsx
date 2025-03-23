"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { Patient } from "@/types/patient";
import { toast } from "react-toastify";

interface PatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient | null; // Allow editing when a patient is passed
  refreshPatients: () => void; // Refresh list after save
}

const PatientModal: React.FC<PatientModalProps> = ({
  isOpen,
  onClose,
  patient,
  refreshPatients,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm<Patient>();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const isEditMode = Boolean(patient); // Check if editing

  // Prefill form fields when editing
  useEffect(() => {
    if (patient) {
      setId(patient.id);
      console.log(patient);
      Object.keys(patient).forEach((key) => {
        setValue(key as keyof Patient, (patient as any)[key]);
      });
    } else {
      reset();
    }
  }, [patient, setValue, reset]);

  if (!isOpen) return null; // Don't render if modal is closed

  const onSubmit = async (data: Patient) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        allergies: Array.isArray(data.allergies)
          ? data.allergies
          : [data.allergies],
        dob: moment(data.dob).format("YYYY-MM-DD"),
        weight: parseFloat(data.weight.toString()),
        height: parseFloat(data.height.toString()),
        phone: parseInt(data.phone.toString()),
        zip: parseInt(data.zip.toString()),
      };

      if (isEditMode) {
        await axios.put(`/api/patients/update/${patient?.id}`, formattedData);
        toast.success("Patient record updated successfully!");
      } else {
        await axios.post("/api/patients/create", formattedData);
        toast.success("Patient record created successfully!");
      }

      reset();
      onClose();
      refreshPatients(); // Refresh list
    } catch (error) {
      console.log(error);
      toast.error("Error saving patient record.");
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
        <h1 className="text-black text-xl font-bold mb-6 ">
          {isEditMode ? `Edit Patient (${id})` : "Add New Patient"}{" "}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
          {/* Form Fields */}
          {[
            {
              label: "First Name",
              name: "firstName",
              type: "text",
              required: true,
            },
            {
              label: "Last Name",
              name: "lastName",
              type: "text",
              required: true,
            },
            {
              label: "Date of Birth",
              name: "dob",
              type: "date",
              required: true,
            },
            {
              label: "Age",
              name: "age",
              type: "number",
              required: true,
            },

            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "tel", required: true },
            { label: "Street", name: "street", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "ZIP Code", name: "zip", type: "number" },
            { label: "Weight (kg)", name: "weight", type: "number" },
            { label: "Height (cm)", name: "height", type: "number" },

            // { label: "MRN", name: "mrn", type: "text" },
            { label: "Blood Pressure", name: "bloodPressure", type: "text" },
            { label: "Heart Rate", name: "heartRate", type: "text" },
            {
              label: "Respiratory Rate",
              name: "respiratoryRate",
              type: "text",
            },
            { label: "Temperature", name: "temperature", type: "text" },
            {
              label: "Oxygen Saturation",
              name: "oxygenSaturation",
              type: "text",
            },
          ].map(({ label, name, type, required }) => (
            <div key={name} className="flex flex-col">
              <label className="text-sm text-gray-600 font-semibold">
                {label}
              </label>
              <input
                type={type}
                {...register(
                  name as keyof Patient,
                  required ? { required: `${label} is required` } : {}
                )}
                className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
                placeholder={label}
              />
            </div>
          ))}

          {/* Gender */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Gender
            </label>
            <select
              {...register("gender")}
              className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Allergies */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Allergies
            </label>
            <select
              {...register("allergies")}
              multiple
              className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
            >
              <option value="NKDA">No Known Drug Allergies (NKDA)</option>
              <option value="Skin Rash">Skin Rash</option>
              <option value="Hives">Hives</option>
              <option value="Itching">Itching</option>
              <option value="Fever">Fever</option>
              <option value="Shortness of Breath">Shortness of Breath</option>
            </select>
          </div>

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

export default PatientModal;
