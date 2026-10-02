import { forwardRef } from 'react';

/**
 * Small, premium pill button used across the whole site.
 *
 * tone:
 *   glass  — dark translucent w/ thin border (hero, editorial cards)
 *   solid  — near-black fill (ivory sections)
 *   gold   — gold fill (single accents)
 *   light  — ivory fill on dark sections
 */
const tones = {
  glass: 'border-white/25 bg-black/35 text-white backdrop-blur-sm hover:border-gold hover:bg-gold hover:text-ink',
  solid: 'border-ink bg-ink text-white hover:border-gold-deep hover:bg-gold-deep hover:text-ink',
  gold: 'border-gold bg-gold text-ink hover:border-gold-light hover:bg-gold-light',
  light: 'border-ivory/70 bg-ivory text-ink hover:border-gold hover:bg-gold',
};

const sizes = {
  sm: 'px-5 py-2 text-[9px]',
  md: 'px-7 py-3 text-[10px]',
  lg: 'px-9 py-4 text-[11px]',
};

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 rounded-full border font-medium uppercase ' +
  'tracking-luxe transition-all duration-500 ease-luxe whitespace-nowrap ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const Button = forwardRef(function Button(
  { as: Tag = 'button', tone = 'glass', size = 'md', className = '', children, ...props },
  ref,
) {
  return (
    <Tag ref={ref} className={`${base} ${tones[tone]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </Tag>
  );
});

export default Button;
