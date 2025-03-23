"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface DeletePatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string | null; // ID of the patient to delete
  onDeleteSuccess: () => void; // Callback to refresh the dashboard after deletion
}

const DeletePatientModal: React.FC<DeletePatientModalProps> = ({
  isOpen,
  onClose,
  patientId,
  onDeleteSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen || !patientId) return null; // Don't render if modal is closed or patient ID is missing

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/patients/${patientId}?id=${patientId}`);
      toast.success("Patient record deleted successfully!");
      onDeleteSuccess(); // Refresh the patient list
      onClose(); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast.error("Failed to delete patient.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black"
      onMouseDown={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      <div
        className="bg-white shadow-md rounded-xl p-6 max-w-md w-full"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-black mb-4">
          Confirm Deletion
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this patient record? This action
          cannot be undone.
        </p>
        <div className="flex justify-between">
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePatientModal;
