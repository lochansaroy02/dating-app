'use client'

import { ThemeProvider } from "@/components/theme-provider";
import { usePathname } from 'next/navigation';
import "./globals.css";
import Navbar from "./navbar/page";

const ClientLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const hideHeaderOnRoutes = ['/login', '/signup'];
  const shouldHideHeader = hideHeaderOnRoutes.includes(pathname);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {!shouldHideHeader && <Navbar />}
      {children}
    </ThemeProvider>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
