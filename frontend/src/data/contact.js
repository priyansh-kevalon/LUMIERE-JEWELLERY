export const contactInfo = {
  phoneDisplay: '+91 99999 00000',
  phoneDial: '+919999900000',
  whatsappDisplay: '+91 99999 00000',
  whatsappNumber: '919999900000',
  email: 'ravisales@gamil.com',
  address: 'Ahmedabad, Gujarat',
  mapQuery: 'Ahmedabad, Gujarat, India',
};

export const contactMethods = [
  { id: 'phone', label: 'Phone Call' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'email', label: 'Email' },
];

export const whatsappLink = `https://wa.me/${contactInfo.whatsappNumber}`;

export const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  contactInfo.mapQuery,
)}`;
