import type { Metadata } from "next";
import "../globals.css";
import LayoutAdmin from "./components/LayoutAdmin";
import AdminAuth from "./utils/AdminAuth";
import { CMSProvider } from "@/context/CMSContext";
import { CMSDataProvider } from "@/context/CMSDataContext";
import { CMSThemeProvider } from "@/context/CMSThemeContext";

export const metadata: Metadata = {
  title: "CMS Admin Portal",
  description: "Developed by Rohit Guptaa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CMSThemeProvider>
      <CMSDataProvider>
        <CMSProvider>
          <AdminAuth>
            <LayoutAdmin>
              {children}
            </LayoutAdmin>
          </AdminAuth>
        </CMSProvider>
      </CMSDataProvider>
    </CMSThemeProvider>
  );
}
