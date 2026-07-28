import Link from "next/link";
import { Logo } from "./Logo";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ==",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/thebloopapp/",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect x="3" y="3" width="18" height="18" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 10v7M8 7.5v.01M12 17v-4a2.5 2.5 0 015 0v4M12 10v7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const nav = [
  { n: "02", label: "Problema", href: "/problema" },
  { n: "03", label: "Soluzione", href: "/soluzione" },
  { n: "04", label: "Flusso", href: "/flusso" },
  { n: "05", label: "Visione", href: "/visione" },
  { n: "06", label: "Bloopers", href: "/bloopers" },
];

export function Footer() {
  return (
    <footer className="tone-dark relative !bg-deep">
      <div className="shell py-20 sm:py-24">
        <div className="grid12 gap-y-14">
          {/* Brand block */}
          <div className="md:col-span-6">
            <div className="text-fg">
              <Logo size="lg" animated />
            </div>
            <p className="statement mt-10 max-w-md">
              Go out. <span className="mark">Live the city.</span>
            </p>
            <p className="copy mt-10 max-w-md text-muted">
              Il radar degli eventi della tua città. Tutti gli eventi in un solo
              posto, per trovare cosa fare stasera, vicino a te.
            </p>
          </div>

          {/* Meta columns */}
          <div className="md:col-span-2">
            <p className="eyebrow-sm rule-b pb-3 text-muted">Naviga</p>
            <ul className="mt-5 space-y-3">
              {nav.map((l) => (
                <li key={l.href} className="flex items-baseline gap-3">
                  <span className="eyebrow-sm text-muted">{l.n}</span>
                  <Link
                    href={l.href}
                    className="eyebrow text-fg transition hover:text-accent-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow-sm rule-b pb-3 text-muted">Contatti</p>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:bloopappevents@gmail.com"
                  className="eyebrow-sm break-all text-fg transition hover:text-accent-ink"
                >
                  bloopappevents@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="eyebrow-sm rule-b pb-3 text-muted">Social</p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 text-fg transition hover:text-accent-ink"
                  >
                    <span className="inline-flex h-9 w-9 items-center justify-center border border-rule transition group-hover:border-accent">
                      {s.icon}
                    </span>
                    <span className="eyebrow">{s.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule-t mt-20 flex flex-col items-start justify-between gap-4 pt-6 sm:flex-row sm:items-center">
          <p className="eyebrow-sm text-muted">© 2026 Bloop — Made in Italia</p>
          <div className="flex items-center gap-8">
            <Link href="/privacy-policy" className="eyebrow-sm text-muted transition hover:text-fg">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="eyebrow-sm text-muted transition hover:text-fg">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
