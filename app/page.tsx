"use client";
const Record = () => {
  return (
    <div className="min-h-screen p-10 bg-blue-50">
      <div className="bg-white shadow-sm rounded-xl p-6 mb-10">
        <h1 className="text-black text-4xl mb-5">Patient Information</h1>
        <div className="grid gap-6 gap-y-3 mb-6 md:grid-cols-2">
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              First name
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Last name
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center col-end-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Date of Birth
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Medical Record Number (MRN)
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Weight
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Height
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h1 className="text-black text-4xl mb-5">Medical Record</h1>
        <div className="grid gap-6 gap-y-3 mb-6 md:grid-cols-2">
          <div className="flex justify-center items-center  col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Allergies
            </label>
            <select
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              required
            >
              <option value="1">option 1</option>
            </select>
          </div>
          <div className="flex justify-center items-center  col-span-2">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Pregnancy Status: (Select one)
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Renal Function: (Select one)
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center ">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Liver Function: (Select one)
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Medical Record Number (MRN)
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Weight
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
          <div className="flex justify-center items-center">
            <label className="block mb-2 text-sm font-medium text-gray-600 w-32">
              Height
            </label>
            <input
              type="text"
              id="first_name"
              className="cols-4 bg-gray-50 border border-gray-300 text-black text-sm rounded-lg  block w-full p-2.5"
              placeholder="John"
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Record;
