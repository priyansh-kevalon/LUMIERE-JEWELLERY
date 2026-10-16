/* ------------------------------------------------------------------ */
/* Footer / informational pages                                        */
/* Each entry drives the reusable `InfoPage` renderer. `nav` maps the  */
/* page to a primary navigation item so the header underline follows.  */
/* ------------------------------------------------------------------ */

export const infoPages = {
  faqs: {
    nav: 'contact',
    eyebrow: 'Customer Care',
    title: 'Frequently Asked Questions',
    intro:
      'Answers to the questions we hear most often about orders, sizing, shipping, returns and caring for your jewellery.',
    sections: [
      {
        heading: 'Orders & Payment',
        faqs: [
          {
            q: 'How do I place an order?',
            a: 'Browse a collection, open a piece, choose a size or finish where available and add it to your cart. When you are ready, head to checkout to complete your order.',
          },
          {
            q: 'Which payment methods do you accept?',
            a: 'We accept major credit and debit cards, UPI and popular digital wallets. All transactions are processed over a secure connection.',
          },
          {
            q: 'Can I modify or cancel my order?',
            a: 'Orders can be modified or cancelled within 24 hours of placing them, provided they have not yet been dispatched. Contact us and our team will assist you.',
          },
        ],
      },
      {
        heading: 'Product & Sizing',
        faqs: [
          {
            q: 'How do I find my ring size?',
            a: 'The available sizes are listed on each ring product page. If you are unsure, book a virtual consultation or visit a boutique and our team will help you measure.',
          },
          {
            q: 'Are the pieces hallmarked and certified?',
            a: 'Eligible gold jewellery carries BIS hallmarks, and diamonds may be accompanied by a recognised laboratory report. See our Hallmark & Certifications page for details.',
          },
        ],
      },
      {
        heading: 'Shipping & Returns',
        faqs: [
          {
            q: 'How long does delivery take?',
            a: 'Standard delivery is typically 5 to 7 business days. Bespoke and made-to-order pieces take longer, and we confirm the timeline when your order is placed.',
          },
          {
            q: 'What is your return policy?',
            a: 'Unworn pieces in their original packaging may be returned within 15 days of delivery. Bespoke, engraved and custom pieces are non-returnable. See Returns & Exchanges for the full policy.',
          },
        ],
      },
    ],
    cta: {
      title: 'Still have a question?',
      text: 'Our client advisors are happy to help.',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'shipping-delivery': {
    nav: 'contact',
    eyebrow: 'Customer Care',
    title: 'Shipping & Delivery',
    intro: 'Everything you need to know about how your LUMIÈRE order reaches you.',
    sections: [
      {
        heading: 'Delivery Options',
        list: [
          'Standard Delivery — 5 to 7 business days across India, complimentary on all orders.',
          'Express Delivery — 2 to 3 business days, available at checkout in select cities.',
          'International Shipping — 7 to 14 business days with duties calculated at checkout.',
        ],
      },
      {
        heading: 'Order Processing',
        paragraphs: [
          'In-stock pieces are dispatched within 24 to 48 hours of order confirmation. Made-to-order and bespoke designs are crafted to your specifications, so please allow the timeline confirmed by our team.',
          'You will receive a confirmation email with tracking details as soon as your order leaves our studio.',
        ],
      },
      {
        heading: 'Packaging',
        paragraphs: [
          'Every order arrives in signature LUMIÈRE packaging, designed to protect your piece and ready for gifting. Discreet, tamper-proof outer packaging keeps your purchase secure in transit.',
        ],
      },
    ],
    cta: {
      title: 'Need help with a delivery?',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'returns-exchanges': {
    nav: 'contact',
    eyebrow: 'Customer Care',
    title: 'Returns & Exchanges',
    intro: 'We want you to love your LUMIÈRE piece. If something is not quite right, here is how returns and exchanges work.',
    sections: [
      {
        heading: 'Our Promise',
        paragraphs: [
          'Eligible items may be returned or exchanged within 15 days of delivery, provided they are unworn and in their original condition.',
        ],
      },
      {
        heading: 'Eligibility',
        list: [
          'Items must be unworn, unaltered and returned in their original packaging with all documentation.',
          'Returns are accepted within 15 days of delivery.',
          'Bespoke, engraved, resized and custom-made pieces cannot be returned or exchanged.',
          'Proof of purchase or an order confirmation is required.',
        ],
      },
      {
        heading: 'How to Return',
        steps: [
          { title: 'Request', text: 'Contact us with your order number to begin a return.' },
          { title: 'Pack', text: 'Securely pack the piece in its original packaging.' },
          { title: 'Ship', text: 'We arrange a pickup or share return instructions with you.' },
          {
            title: 'Refund',
            text: 'Once inspected, refunds are issued to the original payment method within 7 to 10 business days.',
          },
        ],
      },
    ],
    cta: {
      title: 'Start a return',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'jewellery-care': {
    nav: 'contact',
    eyebrow: 'Customer Care',
    title: 'Jewellery Care',
    intro: 'Simple habits that keep your jewellery radiant for generations.',
    sections: [
      {
        heading: 'Everyday Care',
        list: [
          'Put jewellery on last and take it off first to avoid contact with perfume, hairspray and cosmetics.',
          'Remove pieces before swimming, bathing, exercising or household chores.',
          'Store each piece separately to prevent scratches and tangling.',
        ],
      },
      {
        heading: 'Cleaning',
        list: [
          'Clean gold and platinum with warm water, a mild soap and a soft-bristled brush.',
          'Gently polish diamonds with a lint-free cloth, and avoid harsh chemicals.',
          'Have pearls and gemstone-set pieces cleaned professionally.',
        ],
      },
      {
        heading: 'Professional Servicing',
        paragraphs: [
          'We offer complimentary cleaning and inspection of your LUMIÈRE jewellery. Visit a boutique or contact us to arrange servicing or resizing.',
        ],
      },
    ],
    cta: {
      title: 'Book a care service',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'custom-order-support': {
    nav: 'contact',
    eyebrow: 'Customer Care',
    title: 'Custom Order Support',
    intro: 'Guidance every step of the way for bespoke and made-to-order pieces.',
    sections: [
      {
        heading: 'What We Support',
        list: [
          'Design consultation and concept sketches',
          'Stone selection and metal choices',
          'Size and fit adjustments',
          'Progress updates and timeline guidance',
        ],
      },
      {
        heading: 'How It Works',
        steps: [
          { title: 'Enquire', text: 'Share your idea, occasion and budget with our team.' },
          { title: 'Consult', text: 'Meet in-store or virtually to refine the design.' },
          { title: 'Approve', text: 'Review renders and approve before crafting begins.' },
          { title: 'Craft', text: 'Our artisans create your piece with regular updates.' },
        ],
      },
    ],
    cta: {
      title: 'Start your custom piece',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'store-locator': {
    nav: 'contact',
    eyebrow: 'Visit Us',
    title: 'Store Locator',
    intro: 'Visit us to experience LUMIÈRE in person.',
    sections: [
      {
        heading: 'Our Boutiques',
        stores: [
          {
            name: 'LUMIÈRE Flagship — Mumbai',
            address: '14 Marine Drive, Colaba, Mumbai 400001',
            phone: '+91 22 4000 1234',
            hours: 'Mon–Sat, 10:30 AM – 8:00 PM',
          },
          {
            name: 'LUMIÈRE — Delhi',
            address: '5 Connaught Place, New Delhi 110001',
            phone: '+91 11 4000 5678',
            hours: 'Mon–Sat, 11:00 AM – 8:00 PM',
          },
          {
            name: 'LUMIÈRE — Bengaluru',
            address: '21 Vittal Mallya Road, Bengaluru 560001',
            phone: '+91 80 4000 9012',
            hours: 'Mon–Sat, 11:00 AM – 8:00 PM',
          },
        ],
      },
      {
        heading: 'Plan Your Visit',
        paragraphs: [
          'Private appointments are available for engagement, bridal and bespoke consultations. Book ahead and our team will prepare a curated selection for you.',
        ],
      },
    ],
    cta: {
      title: 'Book a private appointment',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'virtual-consultation': {
    nav: 'contact',
    eyebrow: 'Visit Us',
    title: 'Virtual Consultation',
    intro: 'Meet our jewellery experts from wherever you are.',
    sections: [
      {
        heading: 'What to Expect',
        list: [
          'A one-to-one video appointment with a LUMIÈRE expert',
          'Personalised styling and gift recommendations',
          'Guidance on sizing, metals and stones',
          'Close-up viewing of pieces you are considering',
        ],
      },
      {
        heading: 'Before Your Appointment',
        list: [
          'Have your questions or inspiration ready',
          'Know your ring size if you are shopping for rings',
          'Share any occasion or budget preferences',
        ],
      },
    ],
    cta: {
      title: 'Book your video appointment',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  craftsmanship: {
    nav: 'about',
    eyebrow: 'The Brand',
    title: 'Our Craftsmanship',
    intro: 'The skill, patience and detail behind every LUMIÈRE creation.',
    sections: [
      {
        heading: 'From Sketch to Setting',
        paragraphs: [
          'Every piece begins as an idea — a story, an occasion, a quiet wish to be kept close. Our designers translate it into sketches before a single gram of metal is shaped.',
        ],
      },
      {
        heading: 'The Steps',
        steps: [
          { title: 'Consultation', text: 'Listening to the occasion, the wearer and the story yet to be told.' },
          { title: 'Design', text: 'Hand-drawn concepts refined into a precise design.' },
          { title: 'Craft', text: 'Metal is formed and stones are set by skilled hands.' },
          { title: 'Finish', text: 'The final polish draws out the light and brings the piece to life.' },
        ],
      },
      {
        heading: 'Materials',
        paragraphs: [
          'We work with responsibly sourced gold, platinum, diamonds and gemstones, selected for their beauty and integrity and checked to meet the standards we promise.',
        ],
      },
    ],
    cta: {
      title: 'Explore our collections',
      label: 'Shop Collections',
      href: '#/collections',
    },
  },

  certifications: {
    nav: 'about',
    eyebrow: 'The Brand',
    title: 'Hallmark & Certifications',
    intro: 'Transparency and assurance in every piece you own.',
    sections: [
      {
        heading: 'BIS Hallmarking',
        paragraphs: [
          'Eligible gold jewellery is hallmarked in accordance with applicable BIS standards, assuring the purity of the metal.',
        ],
      },
      {
        heading: 'Diamond Certification',
        paragraphs: [
          'Diamonds may be accompanied by a grading report from a recognised laboratory, detailing the four Cs — cut, colour, clarity and carat.',
        ],
      },
      {
        heading: 'Documentation',
        paragraphs: [
          'Every purchase includes documentation describing the materials of your piece, so you can cherish it with complete confidence.',
        ],
      },
    ],
    cta: {
      title: 'Questions about certification?',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  testimonials: {
    nav: 'about',
    eyebrow: 'The Brand',
    title: 'Testimonials',
    intro: 'Stories from those who wear LUMIÈRE.',
    sections: [
      {
        heading: 'What Our Clients Say',
        quotes: [
          {
            text: 'The craftsmanship is extraordinary. My engagement ring is even more beautiful in person than I imagined.',
            name: 'Ananya & Rohan',
            photo: 'https://randomuser.me/api/portraits/women/44.jpg',
          },
          {
            text: 'From consultation to delivery, the team made our anniversary gift effortless and truly special.',
            name: 'Priya S.',
            photo: 'https://randomuser.me/api/portraits/women/68.jpg',
          },
          {
            text: 'Every detail feels considered. This is jewellery meant to be passed down.',
            name: 'Meera K.',
            photo: 'https://randomuser.me/api/portraits/women/79.jpg',
          },
        ],
      },
    ],
    cta: {
      title: 'Share your story',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  gifting: {
    nav: 'collections',
    eyebrow: 'Collections',
    title: 'Gifting Collection',
    intro: 'Thoughtful pieces for the moments that matter most.',
    sections: [
      {
        heading: 'For Every Occasion',
        list: [
          'Birthdays, anniversaries and milestones',
          'Weddings and bridal gifting',
          'Festive and celebratory moments',
          'Everyday tokens of appreciation',
        ],
      },
      {
        heading: 'Gift-Ready',
        paragraphs: [
          'Every order arrives in signature LUMIÈRE packaging, ready to gift. Ask our team to help you choose, or add a personal message at checkout.',
        ],
      },
    ],
    cta: {
      title: 'Find the perfect gift',
      label: 'Shop Collections',
      href: '#/collections',
    },
  },

  offers: {
    nav: 'collections',
    eyebrow: 'Collections',
    title: 'Offers & Occasions',
    intro: 'Seasonal offers and curated edits for the moments you celebrate.',
    sections: [
      {
        heading: 'Current Offers',
        paragraphs: [
          'From festive edits to bridal previews, our offers change with the season. Explore curated selections and enjoy complimentary services on qualifying orders.',
        ],
      },
      {
        heading: 'Occasions We Celebrate',
        list: ['Festive Collection', 'Wedding Season', 'Anniversaries', 'First Milestones'],
      },
    ],
    cta: {
      title: 'Shop the latest offers',
      label: 'Shop Collections',
      href: '#/collections',
    },
  },

  'custom-jewellery': {
    nav: 'collections',
    eyebrow: 'Collections',
    title: 'Custom Jewellery',
    intro: 'Create a piece that is entirely, unmistakably yours.',
    sections: [
      {
        heading: 'Made for You',
        paragraphs: [
          'Choose the metal, the stones and the silhouette. Our designers work with you to shape a piece that reflects your story.',
        ],
      },
      {
        heading: 'What You Can Customise',
        list: [
          'Metal and finish',
          'Diamond and gemstone selection',
          'Setting and silhouette',
          'Engraving and personal details',
        ],
      },
    ],
    cta: {
      title: 'Begin your custom design',
      label: 'Contact Us',
      href: '#/contact',
    },
  },

  'bespoke-designs': {
    nav: 'collections',
    eyebrow: 'Collections',
    title: 'Bespoke Designs',
    intro: 'One-of-a-kind jewellery, crafted around your vision.',
    sections: [
      {
        heading: 'A Design of Your Own',
        paragraphs: [
          'Bespoke begins with a conversation. From the first sketch to the final polish, our atelier brings your design to life with meticulous attention to detail.',
        ],
      },
      {
        heading: 'The Bespoke Journey',
        steps: [
          { title: 'Discover', text: 'Share your vision, inspiration and occasion.' },
          { title: 'Design', text: 'Work with our designers to refine every detail.' },
          { title: 'Craft', text: 'Artisans create your piece by hand.' },
          { title: 'Deliver', text: 'Your finished piece arrives in signature packaging.' },
        ],
      },
    ],
    cta: {
      title: 'Start a bespoke commission',
      label: 'Contact Us',
      href: '#/contact',
    },
  },
};
