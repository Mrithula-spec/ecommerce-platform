import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-body">
          <AdminHeader />
          <div className="admin-content">
            {children}
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
