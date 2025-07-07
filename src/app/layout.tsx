import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { StoreProvider } from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import App from "@/components/App";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "PHOFLIX-V3 | Xem Phim Online Miễn Phí",
  description: "WEBSITE XEM PHIM MIỄN PHÍ",
  icons: {
    icon: "/icon/logo.ico",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="vi">
      <body className={`${inter.className} antialiased`}>
        <NextTopLoader color="#ffd875" showSpinner={false} height={2} />

        <StoreProvider>
          <Provider>
            <SessionProvider>
              <App>{children}</App>
            </SessionProvider>
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
