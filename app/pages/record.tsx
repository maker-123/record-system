import { useState } from "react";

const Record = () => {
  const [activeTab, setActiveTab] = useState("personal");

  return (
    <div className="min-h-screen p-6 bg-blue-50">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center text-blue-300 mb-4">
          EMR Electronic Medical Record
        </h1>

        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-4">
          {["personal", "administration", "medical"].map((tab) => (
            <button
              key={tab}
              className={`p-2 px-4 rounded-t-lg ${
                activeTab === tab
                  ? "bg-blue-300 text-white"
                  : "bg-gray-200 text-black "
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Information
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-4">
          {/* Patient Info Fields */}
          <div className="col-span-2 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              name <input className="p-2 border rounded-md" />
              <div className="p-2 border rounded-md">ID Card/Passport</div>
              <div className="p-2 border rounded-md">Nationality</div>
              <div className="p-2 border rounded-md">Address</div>
              <div className="p-2 border rounded-md">Telephone</div>
              <div className="p-2 border rounded-md">E-mail</div>
              <div className="p-2 border rounded-md">Date of Birth</div>
              <div className="p-2 border rounded-md">Marital Status</div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="p-4 border rounded-md flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Photo</span>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">Page 1</div>
      </div>
    </div>
  );
};

export default Record;
