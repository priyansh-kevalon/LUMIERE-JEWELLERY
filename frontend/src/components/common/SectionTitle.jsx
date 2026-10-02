/**
 * Centred eyebrow + heading + optional lede, used to open every section
 * with the same typographic rhythm.
 */
export default function SectionTitle({
  eyebrow,
  title,
  lede,
  align = 'center',
  tone = 'dark',
  className = '',
}) {
  const isDark = tone === 'dark';

  const alignment = {
    center: 'items-center text-center mx-auto',
    left: 'items-start text-left',
  }[align];

  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}>
      {eyebrow && (
        <span
          className={`text-[10px] font-medium uppercase tracking-wideluxe sm:text-[11px] ${
            isDark ? 'text-gold' : 'text-gold-deep'
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`font-serif text-2xl font-normal leading-[1.15] tracking-tight sm:text-3xl lg:text-[2.6rem] ${
          isDark ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </h2>

      {/* Hairline rule — the only ornament in the system. */}
      <span
        aria-hidden="true"
        className={`h-px w-14 ${align === 'center' ? '' : ''} bg-gradient-to-r from-gold/0 via-gold to-gold/0`}
      />

      {lede && (
        <p
          className={`max-w-2xl text-sm font-light leading-relaxed sm:text-[15px] ${
            isDark ? 'text-muted' : 'text-ink/60'
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}
