import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Zellij — AI-Powered Product Blueprint Platform",
  description: "Turn your idea into a complete, connected, build-ready product blueprint.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zellij-navy text-zellij-ivory antialiased selection:bg-zellij-gold selection:text-zellij-navy">
        {children}
      </body>
    </html>
  );
}
