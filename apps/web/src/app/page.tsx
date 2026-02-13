import { redirect } from "next/navigation";

export default function RootPage() {
  // This ensures anyone hitting "localhost:3000/" is sent to login
  redirect("/login");
}