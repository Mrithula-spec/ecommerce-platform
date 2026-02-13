import "./globals.css";
import { CartProvider } from "@/lib/cart";

export const metadata = {
  title: "E-Commerce MVP",
  description: "Global E-Commerce Platform"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}