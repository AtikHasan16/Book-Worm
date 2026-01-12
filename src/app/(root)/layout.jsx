import DashFooter from "@/components/shared/DashFooter";
import DashNavbar from "@/components/shared/DashNavbar";

export default function MainLayout({ children }) {
  return (
    <>
      <DashNavbar />
      <main className="min-h-screen">{children}</main>
      <DashFooter />
    </>
  );
}
