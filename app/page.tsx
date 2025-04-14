"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Plus, CircleX, UserRoundPen, PillBottle } from "lucide-react";
import PatientModal from "./components/PatientModal";
import DeletePatientModal from "./components/DeletePatientModal";
import MedicationModal from "./components/MedicationModal";
import { Patient } from "@/lib/types";

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const [medicationModalOpen, setMedicationModalOpen] = useState(false);
  const [selectedPatientForMedication, setSelectedPatientForMedication] =
    useState<Patient | null>(null);

  const refreshPatients = async () => {
    try {
      const response = await fetch("/api/patients");
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  const openDeleteModal = (id: string) => {
    setSelectedPatientId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPatientId(null);
  };

  const openEditModal = (patient: Patient) => {
    setSelectedPatient({
      ...patient,
      dob: moment(patient.dob).format("YYYY-MM-DD"),
    });
    setShowModal(true);
  };

  const openCreateModal = () => {
    setSelectedPatient(null);
    setShowModal(true);
  };

  const openMedicationModal = (patient: Patient) => {
    setSelectedPatientForMedication(patient);
    setMedicationModalOpen(true);
  };

  const filteredPatients = patients.filter((patient) =>
    `${patient.firstName} ${patient.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="mb-6 flex justify-between items-center bg-white p-6 rounded-lg shadow-md border">
        <h1 className="text-3xl font-bold text-gray-700">Patient Dashboard</h1>
        <button
          className="p-2 shadow-md rounded-xl bg-blue-500 hover:bg-blue-600 text-white flex items-center"
          onClick={openCreateModal}
        >
          <Plus className="mr-2" /> Create
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search Patients..."
            className="p-3 w-80 border border-gray-300 rounded-lg shadow-sm text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.map((patient, index) => (
              <tr
                key={patient.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition-all`}
              >
                <td className="p-2 font-medium text-gray-800">
                  {patient.firstName} {patient.lastName}
                </td>
                <td className="p-2 text-gray-600">{patient.email}</td>
                <td className="p-2 text-gray-600">{patient.phone}</td>
                <td className="p-2">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-sm ${
                      patient.status === "active"
                        ? "bg-green-100 text-green-800"
                        : ""
                    } ${
                      patient.status === "inactive"
                        ? "bg-red-100 text-red-800"
                        : ""
                    } ${
                      patient.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : ""
                    } ${
                      patient.status === "medication_set"
                        ? "bg-blue-100 text-blue-800"
                        : ""
                    } ${
                      patient.status === "archived"
                        ? "bg-gray-100 text-gray-800"
                        : ""
                    }`}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="flex gap-2 p-2">
                  <button
                    className="bg-blue-100 w-10 h-10 p-1 rounded-3xl flex justify-center items-center cursor-pointer"
                    onClick={() => openMedicationModal(patient)}
                  >
                    <PillBottle color="blue" />
                  </button>
                  <button
                    className="bg-green-100 w-10 h-10 p-1 rounded-3xl flex justify-center items-center cursor-pointer"
                    onClick={() => openEditModal(patient)}
                  >
                    <UserRoundPen color="green" />
                  </button>
                  <button
                    className="bg-red-100 w-10 h-10 p-1 rounded-3xl flex justify-center items-center cursor-pointer"
                    onClick={() => openDeleteModal(patient.id)}
                  >
                    <CircleX color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <PatientModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPatient(null);
          }}
          patient={selectedPatient}
          refreshPatients={refreshPatients}
        />
      )}

      <DeletePatientModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        patientId={selectedPatientId}
        onDeleteSuccess={refreshPatients}
      />

      <MedicationModal
        isOpen={medicationModalOpen}
        onClose={() => setMedicationModalOpen(false)}
        patientId={selectedPatientForMedication?.id ?? null}
        refreshMedications={refreshPatients}
        medication={selectedPatientForMedication?.medications?.[0] ?? null}
      />
    </div>
  );
};

export default Dashboard;
