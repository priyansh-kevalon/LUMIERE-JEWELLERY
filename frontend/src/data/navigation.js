import { Gem, Sparkles, ShieldCheck, Gift } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Primary navigation                                                  */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: 'HOME', href: '#home', id: 'home' },
  { label: 'COLLECTIONS', href: '#/collections', id: 'collections' },
  { label: 'ABOUT US', href: '#/about', id: 'about' },
  { label: 'CONTACT US', href: '#/contact', id: 'contact' },
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
      { label: 'All Jewellery', href: '#/collections' },
      { label: 'Gold Jewellery', href: '#/collections?category=GOLD' },
      { label: 'Diamond Jewellery', href: '#/collections?category=DIAMOND' },
      { label: 'Silver Jewellery', href: '#/collections?category=SILVER' },
      { label: 'Bridal Jewellery', href: '#/collections?category=BRIDAL' },
      { label: "Men's Jewellery", href: '#/collections?category=MEN%27S' },
      { label: 'New Arrivals', href: '#/collections?sort=newest' },
    ],
  },
  {
    title: 'COLLECTIONS',
    links: [
      { label: 'Featured Collections', href: '#/collections' },
      { label: 'Wedding Collection', href: '#/collections?occasion=Wedding' },
      { label: 'Festival Collection', href: '#/collections?occasion=Festive' },
      { label: 'Gifting Collection', href: '#/collections' },
      { label: 'Offers & Occasions', href: '#/collections' },
      { label: 'Custom Jewellery', href: '#/contact' },
      { label: 'Bespoke Designs', href: '#/contact' },
    ],
  },
  {
    title: 'THE BRAND',
    links: [
      { label: 'About Us', href: '#/about' },
      { label: 'Our Craftsmanship', href: '#/about' },
      { label: 'Hallmark & Certifications', href: '#/about' },
      { label: 'Testimonials', href: '#/about' },
      { label: 'Store Locator', href: '#/contact' },
      { label: 'Virtual Consultation', href: '#/contact' },
    ],
  },
  {
    title: 'CUSTOMER CARE',
    links: [
      { label: 'Sign In', href: '#/login' },
      { label: 'Create Account', href: '#/register' },
      { label: 'Contact Us', href: '#/contact' },
      { label: 'FAQs', href: '#/contact' },
      { label: 'Shipping & Delivery', href: '#/contact' },
      { label: 'Returns & Exchanges', href: '#/contact' },
      { label: 'Jewellery Care', href: '#/contact' },
      { label: 'Custom Order Support', href: '#/contact' },
    ],
  },
];

export const socialLinks = [
  { label: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com' },
  { label: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com' },
  { label: 'Pinterest', icon: 'pinterest', href: 'https://www.pinterest.com' },
];
