import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";

const sora = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOROSHOP",
  description: "Your destination for basketball world",
  icons: {
    icon: '/inversed_logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <link rel="icon" href="/inversed_logo.svg" sizes="any" />
        {children}</body>
    </html>
  );
}
