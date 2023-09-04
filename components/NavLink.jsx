"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, prefetch }) {
  const pathname = usePathname();
  console.log("pathname:", pathname);
  console.log(href);
  if (pathname === href) {
    return (
      <span
        className="text-black cursor-default"
      >
        {children}
      </span>
    );
  }
  return (
    <Link
      className="text-orange-800 hover:underline"
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
