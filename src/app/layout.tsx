import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

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
  // title: "Game Dashboard",
  title: "Dashboard",
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
      {/* 왼쪽 사이드바 */}
      <aside className={styles.sidebar}>
        <header className={styles.header}>
          <Link href="/" style={{width:"20px", height:"20px", backgroundColor:"red"}}>
            <h1>Dashboard</h1>
          </Link>
        </header>
        <nav>
          <ul>
            <li>
              <Link href="/main" style={{width:"20px", height:"20px", backgroundColor:"red"}}></Link>
            </li>
            <li>
              <Link href="/summonerSearch" style={{width:"20px", height:"20px", backgroundColor:"yellow"}}></Link>
            </li>
            <li>Champions</li>
            <li>Settings</li>
          </ul>
        </nav>
      </aside>

      {/* 메인 영역 */}
      <main className={styles.main}>
        <section className={styles.content}>
          {children}
        </section>
        <footer className={styles.footer}>
          <p>© 2023 My App. All rights reserved.</p>
        </footer>
      </main>
    </body>
  </html>
    // <html lang="en">
    //   <body className={`${geistSans.variable} ${geistMono.variable} ${styles.container}`}>
    //     <header className={styles.header}>
    //       {/* <h1>Jay.gg</h1> */}
    //       <h1>Dashboard</h1>
    //     </header>

    //     <main className={styles.main}>
    //       <aside className={styles.sidebar}>
    //           <nav>
    //             <ul>
    //               <li>Home</li>
    //               <li>Stats</li>
    //               <li>Champions</li>
    //               <li>Settings</li>
    //             </ul>
    //           </nav>
    //       </aside>
    //       <section className={styles.content}>
    //         {children}
    //       </section>
    //     </main>

    //     <footer className={styles.footer}>
    //       <p>© 2023 My App. All rights reserved.</p>
    //     </footer>
    //   </body>
    // </html>
  );
}
