"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">Admin Panel</div>

      <nav>
        {links.map(link => {
           const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href)
              return(
          <Link
            key={link.href}
            href={link.href}
            className={isActive 
                ? "admin-link active"
                : "admin-link"
            }
          >
            {link.label}
          </Link>
              );
            })};
      </nav>
    </aside>
  );
}
