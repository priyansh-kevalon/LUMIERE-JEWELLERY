import { useEffect, useMemo, useRef, useState } from 'react';
import { getImage, toCandidates } from '../../data/images';

/**
 * Image with a resilient loading strategy.
 *
 * 1. Receives a candidate list (or dotted key into `data/images.js`).
 * 2. Advances to the next candidate on every network/decode error.
 * 3. When every candidate fails, renders a branded tonal panel carrying the
 *    alt text — the layout never shows a broken or empty box.
 * 4. Fades the bitmap in once decoded so slow connections stay unobtrusive.
 */
export default function SmartImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  objectPosition = 'center',
  priority = false,
  sizes,
  ...rest
}) {
  const resolved = useMemo(() => {
    /* A bare dotted key such as `collections.necklace` is looked up in the
       image registry. Anything with a protocol or a slash is a literal URL
       or path and is used as-is. */
    const isRegistryKey = typeof src === 'string' && /^[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(src);
    const value = isRegistryKey ? getImage(src) : src;
    return toCandidates(value).filter(Boolean);
  }, [src]);

  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState('loading');
  const [loadedSrc, setLoadedSrc] = useState(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    setIndex(0);
    setStatus('loading');
    setLoadedSrc(null);
    return () => {
      mounted.current = false;
    };
  }, [src]);

  const advance = () => {
    if (!mounted.current) return;
    setStatus('error');
    setIndex((current) => current + 1);
  };

  const current = resolved[index];

  /* Every candidate exhausted → branded fallback panel. */
  if (!current || index >= resolved.length) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-ink-soft ${className}`}
        {...rest}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              'radial-gradient(120% 90% at 30% 20%, rgba(185,150,91,0.22) 0%, rgba(21,19,17,0) 62%)',
          }}
        />
        <span className="relative px-4 text-center text-[9px] uppercase tracking-wideluxe text-gold/70">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-ink-soft ${className}`} {...rest}>
      <img
        src={current}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onError={advance}
        onLoad={() => {
          if (!mounted.current) return;
          setLoadedSrc(current);
          setStatus('ready');
        }}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-luxe ${
          status === 'ready' && loadedSrc === current ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        style={{ objectPosition }}
      />

      {/* Shimmer placeholder while decoding. */}
      {status !== 'ready' && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-ink-soft via-ink-line to-ink-soft"
        />
      )}
    </div>
  );
}
