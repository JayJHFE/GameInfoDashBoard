import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Game Dashboard",
  description: "League of Legends Game Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${styles.container}`}>
        <header className={styles.header}>
          <h1>Jay.gg</h1>
        </header>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <p>© 2023 My App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
