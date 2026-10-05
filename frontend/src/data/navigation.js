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
    text: 'Only the finest diamonds and materials.',
  },
  {
    icon: Sparkles,
    title: 'MASTERFUL CRAFTSMANSHIP',
    text: 'Expertly crafted with precision and passion.',
  },
  {
    icon: ShieldCheck,
    title: 'CERTIFIED & TRUSTED',
    text: 'Authentic, certified & ethically sourced.',
  },
  {
    icon: Gift,
    title: 'LUXURY GIFTING',
    text: "Beautifully packaged for life's special moments.",
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
      { label: 'Testimonials', href: '#story' },
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

export const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: '#' },
  { label: 'Facebook', icon: 'facebook', href: '#' },
  { label: 'Pinterest', icon: 'pinterest', href: '#' },
];
