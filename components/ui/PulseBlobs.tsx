type PulseBlobsProps = {
  variant?: "hero" | "soft";
};

/**
 * Slow-moving, blurred colour blobs used as ambient background.
 * Kept CSS-only (no JS animation) so it stays cheap on mobile and
 * automatically stills when the user prefers reduced motion.
 */
export function PulseBlobs({ variant = "hero" }: PulseBlobsProps) {
  const opacity = variant === "hero" ? "opacity-70" : "opacity-40";
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${opacity}`} aria-hidden>
      <div
        className="absolute -top-24 -left-24 h-[42rem] w-[42rem] rounded-full blur-3xl motion-safe:animate-float-1"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,92,104,0.55), rgba(255,92,104,0) 60%)",
        }}
      />
      <div
        className="absolute top-1/3 -right-32 h-[38rem] w-[38rem] rounded-full blur-3xl motion-safe:animate-float-2"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, rgba(162,105,255,0.5), rgba(162,105,255,0) 60%)",
        }}
      />
      <div
        className="absolute bottom-[-10rem] left-1/3 h-[34rem] w-[34rem] rounded-full blur-3xl motion-safe:animate-float-3"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(40,36,117,0.85), rgba(40,36,117,0) 60%)",
        }}
      />
    </div>
  );
}
