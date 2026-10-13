import { CreditCard, Headphones, RotateCcw, Truck } from 'lucide-react';

/* Store-wide service strip shown directly above the footer. */
export const benefits = [
  { icon: Truck, title: 'Free Shipping', text: 'You will love at great low prices' },
  { icon: RotateCcw, title: '15 Days Return', text: 'Within 15 days for an exchange' },
  { icon: Headphones, title: 'Customer Support', text: '24 hours a day, 7 days a week' },
  { icon: CreditCard, title: 'Flexible Payment', text: 'Pay with multiple credit cards' },
];

export default function BenefitsBar() {
  return (
    <section aria-label="Shopping benefits" className="bg-[#eee8e2] py-12 sm:py-14">
      <div className="mx-auto grid w-full max-w-shell grid-cols-2 gap-x-4 gap-y-9 px-6 sm:px-10 lg:grid-cols-4 lg:px-14">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex flex-col items-center gap-2.5 text-center lg:px-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#171717]/25 text-[#171717]">
              <benefit.icon size={22} strokeWidth={1.4} aria-hidden="true" />
            </div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#171717]">
              {benefit.title}
            </h3>
            <p className="text-[11px] font-light leading-relaxed text-[#4b4640]">{benefit.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
