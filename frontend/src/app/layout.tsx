import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./appComoponent/CartContext";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoRo Shop",
  description: "Your destination for basketball world",
  icons: {
    icon: "/inversed_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={archivo.className}>
        <link rel="icon" href="/inversed_logo.svg" sizes="any" />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
