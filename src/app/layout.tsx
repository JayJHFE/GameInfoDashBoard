import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";
import { GiMagnifyingGlass } from "react-icons/gi";

{
  /* <i class="fa-solid fa-dragon"></i> */
}

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

const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("[antd: compatible] antd v5 support React is 16 ~ 18")
  ) {
    return; // `antd` 호환성 경고 무시
  }
  originalWarn(...args);
};

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${styles.container}`}
      >
        {/* 왼쪽 사이드바 */}
        <aside className={styles.sidebar}>
          <header className={styles.header}>
            <Link href="/" style={{ width: "20px", height: "20px" }}>
              {/* <img src="/lolIcon.png" style={{ width: "30px" }} />
              LoL.gg */}
              <img src="/leagueOfLegendIcon.png" style={{ width: "150px" }} />
            </Link>
          </header>
          <nav>
            <ul>
              <li>
                <Link href="/main">
                  <div
                    style={{
                      width: "170px",
                      display: "flex",
                      textAlign: "center",
                      verticalAlign: "center",
                    }}
                  >
                    <div style={{ width: "40px", marginRight: "20px" }}>
                      {/* <FontAwesomeIcon icon={faDragon} /> */}
                      <img src="/ingameIcon.png" style={{ width: "30px" }} />
                    </div>
                    <div style={{ paddingTop: "5px" }}>인게임 정보</div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/summonerSearch">
                  <div
                    style={{
                      width: "170px",
                      display: "flex",
                      textAlign: "center",
                      verticalAlign: "center",
                    }}
                  >
                    <div style={{ width: "40px", marginRight: "20px" }}>
                      <GiMagnifyingGlass
                        size={25}
                        style={{ marginRight: "10px", marginTop: "8px" }}
                      />
                    </div>
                    <div style={{ paddingTop: "5px" }}>전적 검색</div>
                  </div>
                </Link>
              </li>
              {/* <li>Champions</li>
            <li>Settings</li> */}
            </ul>
          </nav>
        </aside>

        {/* 메인 영역 */}
        <main className={styles.main}>
          <section className={styles.content}>{children}</section>
          <footer className={styles.footer}>
            <p>© 2025 JayJHFE. All rights reserved.</p>
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
