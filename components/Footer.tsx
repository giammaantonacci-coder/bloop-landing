import { Logo } from "./Logo";

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/thebloopapp?igsh=MThkdTlqMTZjbXZhOQ==",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
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
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 10v7M8 7.5v.01M12 17v-4a2.5 2.5 0 015 0v4M12 10v7"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M14 4v10.5a3.5 3.5 0 11-3.5-3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 4c.5 2.5 2.5 4.5 5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative bg-deep">
      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand block */}
          <div className="md:col-span-6">
            <Logo size="lg" animated />
            <p className="mt-8 max-w-md font-display text-2xl font-semibold leading-tight sm:text-3xl">
              Go out, <span className="highlight-coral">live the city.</span>
            </p>
            <p className="mt-8 max-w-md text-base text-white">
              Bloop è il sistema operativo per vivere la città. Real-time,
              personale, umano.
            </p>
          </div>

          {/* Meta columns */}
          <div className="md:col-span-2">
            <p className="font-sans font-semibold text-[12px] uppercase tracking-[0.3em] text-smoke">
              Naviga
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="/problema" className="text-white transition hover:text-coral">
                  Problema
                </a>
              </li>
              <li>
                <a href="/soluzione" className="text-white transition hover:text-coral">
                  Soluzione
                </a>
              </li>
              <li>
                <a href="/flusso" className="text-white transition hover:text-coral">
                  Flusso
                </a>
              </li>
              <li>
                <a href="/visione" className="text-white transition hover:text-coral">
                  Visione
                </a>
              </li>
              <li>
                <a href="/bloopers" className="text-white transition hover:text-coral">
                  Bloopers
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-sans font-semibold text-[12px] uppercase tracking-[0.3em] text-smoke">
              Contatti
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:bloopappevents@gmail.com"
                  className="break-all text-white transition hover:text-coral"
                >
                  bloopappevents@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-sans font-semibold text-[12px] uppercase tracking-[0.3em] text-smoke">
              Social
            </p>
            <ul className="mt-5 space-y-3">
              {socials.map((s) => {
                const isExternal = s.href.startsWith("http");
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      aria-label={s.name}
                      {...(isExternal && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="group inline-flex items-center gap-3 text-sm text-white transition hover:text-coral"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.06] transition group-hover:bg-coral group-hover:text-deep">
                        {s.icon}
                      </span>
                      {s.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 pt-8 font-sans font-semibold text-[12px] uppercase tracking-[0.25em] text-smoke sm:flex-row sm:items-center">
          <p>© 2026 Bloop — Made in Italia</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white">
              Termini
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
