import type { Metadata, Viewport } from "next";
import { Inter, Roboto } from "next/font/google";
import { Provider } from "@/components/ui/provider";
import { StoreProvider } from "@/store/StoreProvider";
import NextTopLoader from "nextjs-toploader";
import App from "@/components/App";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { auth } from "@/auth";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "PHOFLIX-V3 | Xem Phim Online Miễn Phí",
  description: "WEBSITE XEM PHIM MIỄN PHÍ",
  icons: {
    icon: "/icons/logo.ico",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  width: "device-width",
};

export default async function RootLayout({
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
            <SessionProvider
              // session={session} // cung cấp session từ server cho client
              refetchInterval={5 * 60} // tự động làm mới phiên mỗi 5 phút
              refetchOnWindowFocus={true} // làm mới khi cửa sổ được focus lại
              refetchWhenOffline={false} // không làm mới khi offline
            >
              <App>{children}</App>
            </SessionProvider>
          </Provider>
        </StoreProvider>
      </body>
    </html>
  );
}
