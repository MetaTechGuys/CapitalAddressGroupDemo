import type { Metadata } from "next";
import "./styles/globals.scss";
import Navbar from "./components/Navbar/Navbar";
import { LanguageProvider } from "./contexts/LanguageContext";
import ClientMetadata from "./components/ClientMetadata";

export const metadata: Metadata = {
  title: "Capital Address Group",
  description: "World-Wide Capital Address Group Holding, The Future of Investing",
  icons: {
    icon: [
      { url: '/svgs/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <LanguageProvider>
          <ClientMetadata />
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
