import { getToken } from "./auth";
import { redirect } from "next/navigation";

export function requireAuth() {
  const token = getToken();
  if (!token) {
    redirect("/login");
  }
}
