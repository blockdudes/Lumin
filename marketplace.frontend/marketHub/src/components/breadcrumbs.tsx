"use client";
import { Breadcrumbs } from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Debug: Log the pathname to ensure it is correct
  console.log("Current Pathname:", pathname);

  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <Link href="/" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        // Debug: Log each breadcrumb segment
        console.log(`Breadcrumb Segment: ${name}, Route: ${routeTo}`);

        return isLast ? (
          <span key={name}>{name}</span>
        ) : (
          <Link key={name} href={routeTo} className="opacity-60">
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
