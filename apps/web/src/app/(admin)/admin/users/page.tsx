"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

type User = {
  id: string;
  email: string;
  role: string;
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    apiFetch<User[]>("/admin/users").then(setUsers);
  }, []);

  return (
    <div>
      <h1>Users</h1>

      {users.map(u => (
        <div key={u.id}>
          <span>{u.email}</span>
          <span>{u.role}</span>
        </div>
      ))}
    </div>
  );
}
