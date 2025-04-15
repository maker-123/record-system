"use client";
import { useState } from "react";
export default function Example() {
  const [name] = useState("dency");
  return (
    <div className="bg-linear-to-r from-cyan-500 to-blue-500 py-24 sm:py-32 h-screen">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-amber-200 text-4xl p-20 bg-emerald-100 hover:translate-x-20 hover:shadow-sm ease-in-out duration-300 rounded-3xl mb-5">
          hello {name}
        </h1>
        <h1 className="text-green-400 text-4xl p-20 bg-blue-100  hover:translate-x-20 hover:shadow-sm ease-in-out duration-300 rounded-3xl mb-5">
          hello {name}
        </h1>
        <h1 className="text-cyan-400 text-4xl bg-amber-100 p-20  hover:translate-x-20 hover:shadow-sm ease-in-out duration-300 rounded-3xl cursor-pointer">
          hello {name}
        </h1>
      </div>
    </div>
  );
}
