import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { appConfig, FeatureStatus } from "./configs/app.config";
import { ENV } from "./constants/env.contant";
import {
  adminPaths,
  protectedPaths,
  userPaths,
} from "./constants/middleware.contant";

export async function middleware(request: NextRequest) {
  const url = request.url;
  const { pathname } = new URL(url);

  if (ENV === "development") {
    console.log("Middleware triggered for path:", pathname);
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName:
      process.env.ENV === "development"
        ? "authjs.session-token"
        : "__Secure-authjs.session-token",
  });

  if (ENV === "development") {
    console.log("Token:", token);
  }

  // Nếu không có token và yêu cầu truy cập vào trang bảo vệ
  if (!token && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Kiềm tra trạng thái của các trang từ appConfig
  const pathsCheck = [...userPaths, ...protectedPaths];

  // Kiểm tra xem pathname có bắt đầu bằng một trong các đường dẫn trong pathsCheck
  const matchedPath = pathsCheck.find((path) => path === pathname);

  if (matchedPath) {
    // Kiểm tra trạng thái của trang trong appConfig
    const featureStatus = appConfig.pages[matchedPath]?.status;

    if (ENV === "development") {
      console.log(`Feature status for ${pathname}:`, featureStatus);
    }

    switch (featureStatus) {
      case FeatureStatus.ACTIVE:
      case FeatureStatus.NEW:
        break;
      case FeatureStatus.MAINTENANCE:
        return NextResponse.redirect(new URL("/maintenance", request.url));
      case FeatureStatus.INACTIVE:
        return NextResponse.redirect(new URL("/inactive", request.url));
      case FeatureStatus.COMINGSOON:
        return NextResponse.redirect(new URL("/coming-soon", request.url));
      default:
        return NextResponse.redirect(new URL("/not-found", request.url));
    }
  }

  // Nếu có token và đang truy cập vào adminPaths, kiểm tra quyền truy cập
  if (token && adminPaths.includes(pathname)) {
    if (token.role === "admin") {
      return NextResponse.next();
    } else if (token.role === "member") {
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/nguoi-dung/:path*",
    "/xem-chung/:path*",
    "/dien-vien/:path*",
    "/tim-kiem/:path*",
    "/thong-tin-phim/:path*",
    "/chi-tiet/:path*",
    "/dang-xem/:path*",
    "/loc-nang-cao/:path*",
  ],
};
