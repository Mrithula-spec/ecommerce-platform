"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { useRouter } from "next/navigation";

type MeResponse = {
  role: "ADMIN" | "USER";
};

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    apiFetch<MeResponse>("/auth/me")
      .then(user => {
        if (user.role !== "ADMIN") {
          router.replace("/products");
        } else {
          setAllowed(true);
        }
      })
      .catch(() => {
        router.replace("/login");
      });
  }, [router]);

  if (!allowed) {
    return <div>Checking admin permissions…</div>;
  }

  return <>{children}</>;
}
