import Link from "next/link";
import { LogoIcon } from "@/components/icons";

const navLinks = [
  { href: "/", label: "หน้าแรก" },
  { href: "/articles", label: "บทความ" },
  { href: "/categories", label: "หมวดหมู่" },
  { href: "/about", label: "เกี่ยวกับ" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="icon-box h-10 w-10 transition group-hover:bg-green-100">
            <LogoIcon size={22} />
          </span>
          <div>
            <span className="block text-[15px] font-semibold tracking-tight text-black">
              NetKnowledge
            </span>
            <span className="block text-[11px] font-medium uppercase tracking-wider text-green-700">
              Network Sharing
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-[15px] font-medium text-neutral-800 transition hover:bg-green-50 hover:text-black"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/articles"
          className="rounded-lg bg-green-600 px-4 py-2.5 text-[15px] font-semibold text-black transition hover:bg-green-500"
        >
          ค้นหาความรู้
        </Link>
      </div>

      <nav className="flex gap-1 overflow-x-auto border-t border-[var(--color-border)] px-4 py-2 md:hidden">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-neutral-800 transition hover:bg-green-50 hover:text-black"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
