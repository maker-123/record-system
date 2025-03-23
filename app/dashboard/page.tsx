"use client";

import { useState, useEffect } from "react";
import moment from "moment";
import { Plus, CircleX, UserRoundPen, PillBottle } from "lucide-react";
import PatientModal from "../components/PatientModal"; // Import patient modal
import DeletePatientModal from "../components/DeletePatientModal"; // Import delete modal
import { Patient } from "@/types/patient"; // Import patient type

const Dashboard = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(
    null
  );
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Fetch patients from API
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

  // Open delete modal
  const openDeleteModal = (id: string) => {
    setSelectedPatientId(id);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedPatientId(null);
  };

  // Open edit modal with pre-filled patient data
  const openEditModal = (patient: Patient) => {
    console.log(patient);
    setSelectedPatient({
      ...patient,
      dob: moment(patient.dob).format("YYYY-MM-DD"),
    }); // Ensures all properties are included
    setShowModal(true);
  };

  // Open create modal (empty form)
  const openCreateModal = () => {
    setSelectedPatient(null); // Reset selected patient for new entry
    setShowModal(true);
  };

  // Filter patients based on search query
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
          <Plus className="mr-2" />
          Create
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6 mt-6">
        {/* Search Input */}
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search Patients..."
            className="p-3 w-80 border border-gray-300 rounded-lg shadow-sm text-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Patient Table */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Phone</th>
              <th className="p-2 text-left">status</th>
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
                    className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm 
                      ${
                        patient.status === "active"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                      ${
                        patient.status === "inactive"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                      ${
                        patient.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                      }
                      ${
                        patient.status === "archived"
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                    `}
                  >
                    {patient.status}
                  </span>
                </td>
                <td className="flex gap-2 p-2">
                  {/* meds Button */}
                  <button className="bg-blue-100 w-10 h-10 p-1 rounded-3xl flex justify-center items-center cursor-pointer">
                    <PillBottle color="blue" />
                  </button>
                  {/* Edit Button */}
                  <button
                    className="bg-green-100 w-10 h-10 p-1 rounded-3xl flex justify-center items-center cursor-pointer"
                    onClick={() => openEditModal(patient)}
                  >
                    <UserRoundPen color="green" />
                  </button>

                  {/* Delete Button */}
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

        {filteredPatients.length === 0 && (
          <div role="status" className="text-center flex justify-center p-5">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-green-900 animate-spin  fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>

      {/* Patient Modal for Create & Edit */}
      {showModal && (
        <PatientModal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedPatient(null);
          }}
          patient={selectedPatient} // Send selected patient for editing
          refreshPatients={refreshPatients} // Ensure the list updates after editing/adding
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeletePatientModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        patientId={selectedPatientId}
        onDeleteSuccess={refreshPatients}
      />
    </div>
  );
};

export default Dashboard;
