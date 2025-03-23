"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
import { useState } from "react";
import { Patient } from "@/types/patient";
import { toast } from "react-toastify";

const Record = () => {
  const { register, handleSubmit, reset } = useForm<Patient>();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: Patient) => {
    try {
      setLoading(true);

      const formattedData = {
        ...data,
        allergies: Array.isArray(data.allergies)
          ? data.allergies
          : [data.allergies], // Ensure it's always an array
        dob: moment(data.dob).format("YYYY-MM-DD"),
        weight: parseFloat(data.weight.toString()),
        height: parseFloat(data.height.toString()),
        phone: parseInt(data.phone.toString()),
        zip: parseInt(data.zip.toString()),
      };

      await axios.post("/api/patients/create", formattedData);

      toast.success("Patient record saved successfully!");

      reset();
    } catch (error) {
      console.log(error);
      toast.error("Error saving patient:");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-xl p-8 max-w-4xl w-full">
        <h1 className="text-black text-3xl font-bold mb-6">
          Patient Information
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 md:grid-cols-2"
        >
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
            { label: "Email", name: "email", type: "email", required: true },
            { label: "Phone", name: "phone", type: "tel", required: true },
            { label: "Street", name: "street", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "ZIP Code", name: "zip", type: "number" },
            { label: "Weight (kg)", name: "weight", type: "number" },
            { label: "Height (cm)", name: "height", type: "number" },
            { label: "MRN", name: "mrn", type: "text" },
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
              <label className="text-sm  text-gray-600 font-semibold">
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

          {/* Pregnancy Status */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Pregnancy Status
            </label>
            <select
              {...register("pregnancy")}
              className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
            >
              <option value="Not Pregnant">Not Pregnant</option>
              <option value="First Trimester">First Trimester</option>
              <option value="Second Trimester">Second Trimester</option>
              <option value="Third Trimester">Third Trimester</option>
            </select>
          </div>

          {/* Renal Function */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-600">
              Renal Function
            </label>
            <select
              {...register("renalFunction")}
              className="border border-gray-300 text-black text-sm rounded-lg p-2.5"
            >
              <option value="Normal">Normal</option>
              <option value="Mild Impairment">Mild Impairment</option>
              <option value="Moderate Impairment">Moderate Impairment</option>
              <option value="Severe Impairment">Severe Impairment</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              disabled={loading}
            >
              {loading ? "Saving..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Record;
