import { Document } from "@/components/Document";
import "../globals.css";
import "./admin.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Document locale="ar" className="admin-page">
      {children}
    </Document>
  );
}
