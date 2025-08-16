"use client";

import Link from "next/link";
import type { Components } from "react-markdown";

export const markdownComponents: Components = {
  img: ({ src, alt }) => (src ? <img src={src} alt={alt || "image"} /> : null),
  a: ({ href, children }: any) => {
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className="text-gray-200 underline">
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-200 underline"
      >
        {children}
      </a>
    );
  },

  // 🎯 Custom bảng
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-white/10 text-left text-sm text-white">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-white/10 text-black font-semibold">{children}</thead>
  ),
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-black/10 hover:bg-black/5">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 border text-black border-black/10">{children}</th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border text-black border-black/10">{children}</td>
  ),
  hr: ({ children }) => {
    return <hr className="border-transparent" />;
  },
};
