"use client";

import { logout } from "@/lib/auth";
import { useRouter, usePathname } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  // Determine title from pathname
  let title = "Dashboard";

  if (pathname.startsWith("/admin/products")) {
    title = "Products";
  } else if (pathname.startsWith("/admin/orders")) {
    title = "Orders";
  } else if (pathname.startsWith("/admin/users")) {
    title = "Users";
  }

  return (
    <header className="admin-header">
      <h1 className="admin-page-title">{title}</h1>
      <button className="admin-logout" onClick={handleLogout}>
        Log out
      </button>
    </header>
  );
}
