import { useRef, useState } from 'react';
import {
  ArrowRight,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Check,
  Loader2,
  AlertCircle,
  Send,
} from 'lucide-react';
import SmartImage from '../components/common/SmartImage';
import { contactInfo, contactMethods, whatsappLink, mapLink } from '../data/contact';
import { submitContactMessage } from '../services/contact';

const inputClass =
  'h-11 w-full rounded-md border border-[#484848] bg-[#343434] px-4 text-[13px] text-[#f0eae5] placeholder-[#8c867f] outline-none transition-colors duration-200 focus:border-[#b99662] focus:ring-1 focus:ring-[#b99662]/40';

function ContactHero({ onTalkToConcierge }) {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-y-0 right-0 w-full sm:w-[70%] lg:w-[58%]">
        <SmartImage
          src="/images/contact/contact-hero.png"
          alt="A jewellery specialist consulting with a customer at a warmly lit showroom counter"
          priority
          className="h-full w-full"
          imgClassName="!object-[64%_center] sm:!object-[center_46%]"
          sizes="(min-width: 1024px) 58vw, 100vw"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(13,13,13,1)_0%,rgba(13,13,13,0.78)_32%,rgba(13,13,13,0.28)_62%,rgba(13,13,13,0)_100%)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#0d0d0d]/40 sm:hidden"
      />

      <div className="relative z-10 mx-auto flex h-[560px] w-full max-w-[88rem] items-center px-6 sm:h-[500px] sm:px-10 md:h-[480px] lg:h-[520px] lg:px-14">
        <div className="max-w-[400px]">
          <h1 className="font-serif text-[32px] font-normal leading-[1.12] tracking-[-0.01em] text-[#f0eae5] sm:text-[36px] lg:text-[40px]">
            Let&rsquo;s Create Something
            <span className="block">Beautiful</span>
          </h1>

          <p className="mt-5 max-w-[400px] text-[13px] font-light leading-[1.7] text-[#bcb5af] sm:text-[14px]">
            Whether you have a question about a piece, need assistance with an order, or wish to
            discuss a bespoke design, our team is here to help.
          </p>

          <button
            type="button"
            onClick={onTalkToConcierge}
            className="group mt-7 inline-flex items-center gap-2.5 rounded-[10px] bg-[#353535] px-6 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#f0eae5] transition-colors duration-300 hover:bg-[#454545] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662]"
          >
            <span>Talk to Our Concierge</span>
            <ArrowRight
              size={15}
              strokeWidth={1.6}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: '',
    method: 'phone',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  const update = (key) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: '' } : prev));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = 'Please enter your full name.';
    if (!/^\d{10}$/.test(values.phone.replace(/\s+/g, ''))) {
      next.phone = 'Enter a valid 10-digit phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      next.email = 'Enter a valid email address.';
    }
    if (!values.message.trim()) next.message = 'Please describe your query.';
    return next;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      setFeedback('');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      await submitContactMessage({
        name: values.name.trim(),
        phone: `+91${values.phone.replace(/\s+/g, '')}`,
        email: values.email.trim(),
        preferredContactMethod: values.method,
        message: values.message.trim(),
      });
      setStatus('success');
      setFeedback('Thank you. Your message has been received — our concierge will reach out shortly.');
      setValues({ name: '', phone: '', email: '', method: 'phone', message: '' });
    } catch (error) {
      setStatus('error');
      setFeedback(
        error.message === 'contact-not-configured'
          ? `Our contact service is not connected yet. Please email us at ${contactInfo.email}.`
          : `We could not send your message right now. Please try again, or email us at ${contactInfo.email}.`,
      );
    }
  };

  const errorText = (key) =>
    errors[key] ? (
      <p className="mt-1.5 text-[11px] text-[#e0a08f]">{errors[key]}</p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Full Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update('name')}
            placeholder="Enter Your Full Name"
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
          />
          {errorText('name')}
        </div>

        <div>
          <label htmlFor="contact-phone" className="sr-only">
            Phone Number
          </label>
          <div
            className={`flex h-11 overflow-hidden rounded-md border bg-[#343434] transition-colors duration-200 focus-within:border-[#b99662] focus-within:ring-1 focus-within:ring-[#b99662]/40 ${
              errors.phone ? 'border-[#e0a08f]' : 'border-[#484848]'
            }`}
          >
            <span className="flex select-none items-center border-r border-[#484848] px-3 text-[13px] text-[#bcb5af]">
              +91
            </span>
            <input
              id="contact-phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={values.phone}
              onChange={update('phone')}
              placeholder="00000 00000"
              aria-invalid={Boolean(errors.phone)}
              className="h-full w-full bg-transparent px-4 text-[13px] text-[#f0eae5] placeholder-[#8c867f] outline-none"
            />
          </div>
          {errorText('phone')}
        </div>

        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update('email')}
            placeholder="abc@gmail.com"
            aria-invalid={Boolean(errors.email)}
            className={inputClass}
          />
          {errorText('email')}
        </div>

        <div>
          <fieldset
            aria-describedby="contact-method-hint"
            className="flex min-h-[44px] flex-wrap items-center gap-x-5 gap-y-2 rounded-md border border-[#484848] bg-[#343434] px-3 py-2"
          >
            <legend className="sr-only">Preferred Contact Method</legend>
            {contactMethods.map((method) => (
              <label
                key={method.id}
                className="flex cursor-pointer items-center gap-2 text-[12px] text-[#d8d2cb]"
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method.id}
                  checked={values.method === method.id}
                  onChange={update('method')}
                  className="h-3.5 w-3.5 accent-[#b99662]"
                />
                {method.label}
              </label>
            ))}
          </fieldset>
          <span id="contact-method-hint" className="sr-only">
            Choose how you would like us to reach you.
          </span>
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="contact-message" className="sr-only">
          How Can We Help?
        </label>
        <textarea
          id="contact-message"
          rows={3}
          value={values.message}
          onChange={update('message')}
          placeholder="Describe your query..."
          aria-invalid={Boolean(errors.message)}
          className={`min-h-[92px] w-full resize-y rounded-md border bg-[#343434] px-4 py-3 text-[13px] text-[#f0eae5] placeholder-[#8c867f] outline-none transition-colors duration-200 focus:ring-1 ${
            errors.message
              ? 'border-[#e0a08f] focus:border-[#e0a08f] focus:ring-[#e0a08f]/40'
              : 'border-[#484848] focus:border-[#b99662] focus:ring-[#b99662]/40'
          }`}
        />
        {errorText('message')}
      </div>

      <div className="mt-5">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#f0eae5] px-6 text-[11px] font-medium uppercase tracking-[0.2em] text-[#171515] transition-colors duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662] disabled:cursor-not-allowed disabled:opacity-60 sm:w-[180px]"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending
            </>
          ) : (
            <>
              <Send size={14} strokeWidth={1.8} />
              Submit
            </>
          )}
        </button>

        {feedback && (
          <p
            role="status"
            className={`mt-4 flex items-start gap-2 text-[12px] leading-relaxed ${
              status === 'success' ? 'text-[#9fc6a2]' : 'text-[#e0a08f]'
            }`}
          >
            {status === 'success' ? (
              <Check size={15} className="mt-0.5 shrink-0" />
            ) : (
              <AlertCircle size={15} className="mt-0.5 shrink-0" />
            )}
            <span>{feedback}</span>
          </p>
        )}
      </div>
    </form>
  );
}

function ContactCards() {
  const cards = [
    {
      icon: Phone,
      title: 'Call Us',
      value: contactInfo.phoneDisplay,
      href: `tel:${contactInfo.phoneDial}`,
      external: false,
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      external: false,
    },
    {
      icon: MessageCircle,
      title: 'Message Us',
      value: contactInfo.whatsappDisplay,
      href: whatsappLink,
      external: true,
    },
    {
      icon: MapPin,
      title: 'Visit us',
      value: contactInfo.address,
      href: mapLink,
      external: true,
    },
  ];

  return (
    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const externalProps = card.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {};
        return (
          <a
            key={card.title}
            href={card.href}
            {...externalProps}
            className="group flex min-h-[150px] flex-col items-center justify-center gap-3 rounded-xl bg-[#eee8e4] px-5 py-8 text-center text-[#171515] transition-transform duration-300 ease-luxe hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b99662]"
          >
            <Icon
              size={32}
              strokeWidth={1.4}
              className="text-[#2c2724] transition-colors duration-300 group-hover:text-[#b99662]"
            />
            <span className="text-[13px] font-medium tracking-[0.02em]">{card.title}</span>
            <span className="text-[13px] text-[#4a443f]">{card.value}</span>
          </a>
        );
      })}
    </div>
  );
}

export default function Contact() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <main>
      <ContactHero onTalkToConcierge={scrollToForm} />

      <section
        ref={formRef}
        id="contact-form"
        className="scroll-mt-24 bg-[#0d0d0d] pb-20 pt-16 sm:pt-20 lg:pb-24 lg:pt-24"
      >
        <div className="mx-auto w-full max-w-[88rem] px-6 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-[720px]">
            <h2 className="mb-8 text-[28px] font-medium leading-tight tracking-[-0.01em] text-[#f0eae5] sm:text-[32px] lg:mb-10 lg:text-[34px]">
              How Can We Help You?
            </h2>
            <ContactForm />
          </div>

          <ContactCards />
        </div>
      </section>
    </main>
  );
}
