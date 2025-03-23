"use client";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import { LayoutDashboard, FileText } from "lucide-react"; // Icons

const Sidebar = () => {
  const [active, setActive] = useState("dashboard");
  const router = useRouter();

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      id: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Patient Records",
      icon: <FileText />,
      id: "records",
      path: "/record",
    },
  ];

  return (
    <div className="w-64 lg:translate-x-0 -translate-x-64 h-screen bg-[#395e3b] text-white flex flex-col fixed shadow-lg ">
      <div className="p-6 text-2xl font-bold">FEU</div>
      <nav className="flex-1">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`hover:shadow-lg hover:w-64 hover:translate-x-3 transition-all  flex items-center p-4 cursor-pointer hover:bg-[#486a47] ${
              active === item.id ? "bg-[#395e3b]" : ""
            }`}
            onClick={() => {
              setActive(item.id);
              router.push(item.path); // Navigate to the selected page
            }}
          >
            <span className="mr-3">{item.icon}</span>
            {item.name}
          </div>
        ))}
      </nav>
    </div>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Sidebar />
        <div className="lg:ml-64 ml-0">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
