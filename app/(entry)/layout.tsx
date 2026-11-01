import { Document } from "@/components/Document";
import "../globals.css";
export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Document locale="ar">{children}</Document>;
}
