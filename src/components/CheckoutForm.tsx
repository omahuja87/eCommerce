import React, { useState } from 'react';
import { CustomerDetails } from '../types';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Chandigarh',
  'Jammu & Kashmir',
  'Puducherry',
];

interface CheckoutFormProps {
  onSubmitOrder: (details: CustomerDetails) => void;
}

type FormErrors = Partial<Record<keyof CustomerDetails, string>>;

export function CheckoutForm({ onSubmitOrder }: CheckoutFormProps) {
  const [form, setForm] = useState<CustomerDetails>({
    fullName: '',
    mobileNumber: '',
    email: '',
    houseNumber: '',
    streetArea: '',
    city: '',
    state: '',
    pinCode: '',
    orderNotes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = (field: keyof CustomerDetails, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const cleanPhone = form.mobileNumber.replace(/[\s-]/g, '').replace(/^\+91/, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address or leave it blank.';
    }
    if (!form.houseNumber.trim()) {
      nextErrors.houseNumber = 'House or flat number is required.';
    }
    if (form.streetArea.trim().length < 3) {
      nextErrors.streetArea = 'Street, locality, or area is required.';
    }
    if (form.city.trim().length < 2) {
      nextErrors.city = 'City is required.';
    }
    if (!form.state) {
      nextErrors.state = 'Please select your state.';
    }
    if (!/^\d{6}$/.test(form.pinCode.trim())) {
      nextErrors.pinCode = 'Enter a valid 6-digit Indian PIN code.';
    }
    return nextErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstKey = Object.keys(validationErrors)[0];
      const target = document.getElementById(`checkout-${firstKey}`);
      target?.focus();
      return;
    }

    const normalizedPhone = form.mobileNumber.replace(/[\s-]/g, '').replace(/^\+91/, '');
    onSubmitOrder({
      ...form,
      fullName: form.fullName.trim(),
      mobileNumber: normalizedPhone,
      email: form.email.trim(),
      houseNumber: form.houseNumber.trim(),
      streetArea: form.streetArea.trim(),
      city: form.city.trim(),
      pinCode: form.pinCode.trim(),
      orderNotes: form.orderNotes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {/* Customer Contact */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#111111] pb-2 border-b border-[#EAE5DC]">
          01. Contact Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label htmlFor="checkout-fullName" className="block text-xs font-medium text-[#111111] mb-1.5">
              Full Name <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-fullName"
              type="text"
              required
              autoComplete="name"
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              placeholder="e.g. Aarav Sharma"
              aria-invalid={Boolean(errors.fullName)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.fullName ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.fullName && <p className="text-xs text-[#9E2A2B] mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label htmlFor="checkout-mobileNumber" className="block text-xs font-medium text-[#111111] mb-1.5">
              Mobile Number <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-mobileNumber"
              type="tel"
              required
              autoComplete="tel"
              value={form.mobileNumber}
              onChange={(e) => updateField('mobileNumber', e.target.value)}
              placeholder="10-digit mobile number"
              aria-invalid={Boolean(errors.mobileNumber)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] tabular-nums focus:outline-none ${
                errors.mobileNumber ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.mobileNumber && <p className="text-xs text-[#9E2A2B] mt-1">{errors.mobileNumber}</p>}
          </div>

          <div>
            <label htmlFor="checkout-email" className="block text-xs font-medium text-[#111111] mb-1.5">
              Email Address <span className="text-[#6B655E]">(Optional)</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="you@company.com"
              aria-invalid={Boolean(errors.email)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.email ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.email && <p className="text-xs text-[#9E2A2B] mt-1">{errors.email}</p>}
          </div>
        </div>
      </section>

      {/* Delivery Address */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#111111] pb-2 border-b border-[#EAE5DC]">
          02. Delivery Address
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="checkout-houseNumber" className="block text-xs font-medium text-[#111111] mb-1.5">
              House / Flat Number <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-houseNumber"
              type="text"
              required
              value={form.houseNumber}
              onChange={(e) => updateField('houseNumber', e.target.value)}
              placeholder="e.g. Flat 402, Crest Residency"
              aria-invalid={Boolean(errors.houseNumber)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.houseNumber ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.houseNumber && <p className="text-xs text-[#9E2A2B] mt-1">{errors.houseNumber}</p>}
          </div>

          <div>
            <label htmlFor="checkout-streetArea" className="block text-xs font-medium text-[#111111] mb-1.5">
              Street / Area <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-streetArea"
              type="text"
              required
              value={form.streetArea}
              onChange={(e) => updateField('streetArea', e.target.value)}
              placeholder="e.g. Linking Road, Bandra West"
              aria-invalid={Boolean(errors.streetArea)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.streetArea ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.streetArea && <p className="text-xs text-[#9E2A2B] mt-1">{errors.streetArea}</p>}
          </div>

          <div>
            <label htmlFor="checkout-city" className="block text-xs font-medium text-[#111111] mb-1.5">
              City <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-city"
              type="text"
              required
              autoComplete="address-level2"
              value={form.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="e.g. Mumbai"
              aria-invalid={Boolean(errors.city)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.city ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.city && <p className="text-xs text-[#9E2A2B] mt-1">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="checkout-state" className="block text-xs font-medium text-[#111111] mb-1.5">
              State <span className="text-[#9E2A2B]">*</span>
            </label>
            <select
              id="checkout-state"
              required
              value={form.state}
              onChange={(e) => updateField('state', e.target.value)}
              aria-invalid={Boolean(errors.state)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] focus:outline-none ${
                errors.state ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-xs text-[#9E2A2B] mt-1">{errors.state}</p>}
          </div>

          <div>
            <label htmlFor="checkout-pinCode" className="block text-xs font-medium text-[#111111] mb-1.5">
              PIN Code <span className="text-[#9E2A2B]">*</span>
            </label>
            <input
              id="checkout-pinCode"
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              autoComplete="postal-code"
              value={form.pinCode}
              onChange={(e) => updateField('pinCode', e.target.value.replace(/\D/g, ''))}
              placeholder="6-digit PIN code"
              aria-invalid={Boolean(errors.pinCode)}
              className={`w-full px-3.5 py-2.5 text-sm border bg-white text-[#111111] tabular-nums focus:outline-none ${
                errors.pinCode ? 'border-[#9E2A2B]' : 'border-[#D5CEC2] focus:border-[#111111]'
              }`}
            />
            {errors.pinCode && <p className="text-xs text-[#9E2A2B] mt-1">{errors.pinCode}</p>}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="checkout-orderNotes" className="block text-xs font-medium text-[#111111] mb-1.5">
              Order Notes <span className="text-[#6B655E]">(Optional)</span>
            </label>
            <textarea
              id="checkout-orderNotes"
              rows={2}
              value={form.orderNotes}
              onChange={(e) => updateField('orderNotes', e.target.value)}
              placeholder="Delivery instructions or office landmark (optional)"
              className="w-full px-3.5 py-2.5 text-sm border border-[#D5CEC2] bg-white text-[#111111] focus:outline-none focus:border-[#111111]"
            />
          </div>
        </div>
      </section>

      {/* Payment Method — COD ONLY */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold text-[#111111] pb-2 border-b border-[#EAE5DC]">
          03. Payment Method
        </h2>

        <label className="flex items-start gap-3.5 p-4 border border-[#111111] bg-[#F8F6F2] cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked
            readOnly
            className="mt-1 h-4 w-4 accent-[#111111]"
          />
          <div>
            <span className="block text-sm font-semibold text-[#111111]">Cash on Delivery (COD)</span>
            <span className="block text-xs text-[#524D46] mt-1">
              Pay in cash at your doorstep when your VESTORA order arrives. No advance payment required.
            </span>
          </div>
        </label>

        <p className="text-xs text-[#6B655E] bg-[#F8F6F2] border border-[#E5E0D8] p-3">
          Frontend Demonstration Notice: Placing an order stores the receipt locally in your browser for demonstration purposes and does not transmit data to an external fulfilment backend.
        </p>

        <button
          type="submit"
          className="w-full py-4 px-6 bg-[#111111] text-white text-xs sm:text-sm font-semibold tracking-wider uppercase hover:bg-[#2B2824] transition-colors cursor-pointer"
        >
          PLACE ORDER – CASH ON DELIVERY
        </button>
      </section>
    </form>
  );
}
