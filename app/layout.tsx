"use client";
import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="">{children}</div>
      </body>
    </html>
  );
};

export default Layout;
