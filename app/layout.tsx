"use client";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useState } from "react";
import {
  // Home,
  FileText,
  Calendar,
  ClipboardList,
  Heart,
  ShieldCheck,
  // Settings,
  User,
} from "lucide-react";

const Sidebar = () => {
  const [active, setActive] = useState("profile");

  const menuItems = [
    { name: "My Profile", icon: <User />, id: "profile" },
    { name: "Prescriptions", icon: <ClipboardList />, id: "prescriptions" },
    { name: "See My Doc", icon: <Calendar />, id: "doc" },
    { name: "Health Record", icon: <Heart />, id: "health" },
    { name: "Treatment Plan", icon: <FileText />, id: "plan" },
    { name: "Insurance", icon: <ShieldCheck />, id: "insurance" },
  ];

  return (
    <div className="w-64 h-screen bg-[#0D1B2A] text-white flex flex-col fixed">
      <div className="p-6 text-2xl font-bold">TATEEDA</div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center p-4 cursor-pointer hover:bg-[#1B263B] ${
              active === item.id ? "bg-[#1B263B]" : ""
            }`}
            onClick={() => setActive(item.id)}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-[#1B263B]">Settings</div>
    </div>
  );
};
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Sidebar />
        <div className="ml-64">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
