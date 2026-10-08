import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

/**
 * Logo di header. Ganti file di public/logos/ (atau ubah daftar ini) untuk memakai logo asli.
 * `width` dan `height` = ukuran asli file; di header tingginya 24px (ponsel) / 28px.
 */
const logos = [
  { src: "/logos/logo-1.svg", alt: "Logo 1", width: 120, height: 32 },
  { src: "/logos/logo-2.svg", alt: "Logo 2", width: 120, height: 32 },
  { src: "/logos/logo-3.svg", alt: "Logo 3", width: 120, height: 32 },
];

/** Deretan logo berjajar dengan garis pemisah. Seluruhnya adalah link ke beranda. */
export function LogoGroup({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Beranda"
      className={`flex min-w-0 items-center gap-3 py-2 sm:gap-4 ${className}`}
    >
      {logos.map((logo, i) => (
        <Fragment key={logo.src}>
          {i > 0 && <span aria-hidden className="h-6 w-px shrink-0 bg-border" />}
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-6 w-auto min-w-0 shrink object-contain object-left sm:h-7"
          />
        </Fragment>
      ))}
    </Link>
  );
}
