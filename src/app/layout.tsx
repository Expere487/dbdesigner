import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../providers/theme-provider";
import "./globals.css";
import Header from "@/components/header";
import { createClient } from "@/lib/supabase/server";
import { ModalProvider } from "@/hooks/use-modal";
import { Toaster } from "@/components/ui/sonner"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />

          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
