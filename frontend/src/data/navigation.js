import { Gem, Sparkles, ShieldCheck, Gift } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Primary navigation                                                  */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: 'HOME', href: '#home', id: 'home' },
  { label: 'COLLECTIONS', href: '#collections', id: 'collections' },
  { label: 'ABOUT US', href: '#story', id: 'about' },
  { label: 'CONTACT US', href: '#contact', id: 'contact' },
];

/* ------------------------------------------------------------------ */
/* Floating trust bar                                                  */
/* ------------------------------------------------------------------ */

export const trustFeatures = [
  {
    icon: Gem,
    title: 'EXCEPTIONAL QUALITY',
    text: 'Every piece is crafted with care.',
  },
  {
    icon: Sparkles,
    title: 'MASTERFUL CRAFTSMANSHIP',
    text: 'Designed and crafted with precision.',
  },
  {
    icon: ShieldCheck,
    title: 'CERTIFIED & TRUSTED',
    text: 'Authenticity you can trust.',
  },
  {
    icon: Gift,
    title: 'LUXURY PACKAGING',
    text: 'Beautifully packaged for every occasion.',
  },
];

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footerColumns = [
  {
    title: 'SHOP',
    links: [
      { label: 'All Jewellery', href: '#collections' },
      { label: 'Gold Jewellery', href: '#collections' },
      { label: 'Diamond Jewellery', href: '#collections' },
      { label: 'Silver Jewellery', href: '#collections' },
      { label: 'Bridal Jewellery', href: '#moments' },
      { label: "Men's Jewellery", href: '#collections' },
      { label: 'New Arrivals', href: '#arrivals' },
    ],
  },
  {
    title: 'COLLECTIONS',
    links: [
      { label: 'Featured Collections', href: '#collections' },
      { label: 'Wedding Collection', href: '#moments' },
      { label: 'Festival Collection', href: '#moments' },
      { label: 'Gifting Collection', href: '#cta' },
      { label: 'Offers & Occasions', href: '#offers' },
      { label: 'Custom Jewellery', href: '#contact' },
      { label: 'Bespoke Designs', href: '#contact' },
    ],
  },
  {
    title: 'THE BRAND',
    links: [
      { label: 'About Us', href: '#story' },
      { label: 'Our Craftsmanship', href: '#story' },
      { label: 'Hallmark & Certifications', href: '#story' },
      { label: 'Sustainability', href: '#story' },
      { label: 'Store Locator', href: '#contact' },
      { label: 'Virtual Consultation', href: '#contact' },
    ],
  },
  {
    title: 'CUSTOMER CARE',
    links: [
      { label: 'Contact Us', href: '#contact' },
      { label: 'FAQs', href: '#contact' },
      { label: 'Shipping & Delivery', href: '#contact' },
      { label: 'Returns & Exchanges', href: '#contact' },
      { label: 'Jewellery Care', href: '#contact' },
      { label: 'Custom Order Support', href: '#contact' },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Social — icons are resolved in the Footer component. Pinterest is   */
/* not part of lucide-react, hence the custom `pinterest` key.          */
/* ------------------------------------------------------------------ */

export const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'Facebook', icon: 'facebook', href: '#' },
  { label: 'Pinterest', icon: 'pinterest', href: '#' },
];
