import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import DialogProvider from "@/providers/dialog-provider";
import AuthProvider from "@/providers/auth-provider";
import { getSession } from "./auth";
import AuthSessionProvider from "@/providers/auth-session-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/application-provider";
import Navbar from "@/components/navbar";
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});



export const metadata: Metadata = {
  title: "Shop Admin",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"dark"}
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Toaster />
            <DialogProvider />
            <AuthSessionProvider />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
