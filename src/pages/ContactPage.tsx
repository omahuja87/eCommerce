import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, Phone } from 'lucide-react';
import { SeoHead } from '../components/SeoHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function ContactPage() {
  const breadcrumbs = [{ label: 'Home', href: '/' }, { label: 'Contact Us' }];

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || message.trim().length < 10) {
      setError('Please complete your name, a valid email address, and a message of at least 10 characters.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <SeoHead
        title="Contact Us – VESTORA Client Concierge"
        description="Get in touch with VESTORA customer care for sizing help, bulk corporate orders, or Cash on Delivery order assistance in India."
        path="/contact-us"
        breadcrumbs={breadcrumbs}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="pb-8 mb-10 border-b border-[#EAE5DC]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8C7355]">
          Client Concierge
        </p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold text-[#111111] mt-1">
          Contact Us
        </h1>
        <p className="text-sm sm:text-base text-[#524D46] max-w-2xl mt-2">
          Questions about tailoring measurements, Cash on Delivery serviceability, or corporate bulk orders? Reach our styling desk below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#EAE5DC] bg-[#F8F6F2] p-6 space-y-5">
            <div className="flex items-start gap-3.5">
              <MapPin className="w-5 h-5 text-[#8C7355] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#111111]">Mumbai Atelier &amp; Studio</h2>
                <p className="text-sm text-[#524D46] mt-0.5">
                  Level 4, One Crest Business Park, Lower Parel, Mumbai – 400013, Maharashtra
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone className="w-5 h-5 text-[#8C7355] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#111111]">Client Care Desk</h2>
                <p className="text-sm text-[#524D46] mt-0.5 tabular-nums">+91 22 4890 3210</p>
                <p className="text-xs text-[#6B655E]">Mon – Sat · 10:00 AM to 7:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail className="w-5 h-5 text-[#8C7355] shrink-0 mt-0.5" />
              <div>
                <h2 className="text-sm font-semibold text-[#111111]">Email Support</h2>
                <p className="text-sm text-[#524D46] mt-0.5">concierge@vestora.in</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="border border-[#EAE5DC] bg-[#F8F6F2] p-8 space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#111111]" />
              <h2 className="font-display text-2xl font-semibold text-[#111111]">
                Message Received (Demo)
              </h2>
              <p className="text-sm text-[#524D46]">
                Thank you, {name}. Your enquiry has been recorded in this frontend demonstration. For live assistance, reach concierge@vestora.in.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="mt-2 px-5 py-2.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-[#EAE5DC] p-6 sm:p-8 space-y-5">
              <h2 className="font-display text-2xl font-semibold text-[#111111]">Send a Message</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-medium text-[#111111] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#D5CEC2] focus:outline-none focus:border-[#111111]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-[#111111] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-[#D5CEC2] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-[#111111] mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Sizing inquiry, COD order, or corporate gifting"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D5CEC2] focus:outline-none focus:border-[#111111]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-[#111111] mb-1.5">
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#D5CEC2] focus:outline-none focus:border-[#111111]"
                />
              </div>

              {error && <p className="text-xs text-[#9E2A2B]">{error}</p>}

              <button
                type="submit"
                className="px-6 py-3.5 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#2B2824] transition-colors"
              >
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
