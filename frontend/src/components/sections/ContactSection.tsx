import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Github, Linkedin, Gitlab } from 'lucide-react';
import { SectionHeader } from '../ui/SectionHeader';
import { Button } from '../ui/Button';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ContactFormData } from '../../types';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Please enter a subject.';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide your message.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot check: if honeypot is filled, silent exit
    if (formData.honeypot) {
      setSubmitSuccess(true);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    try {
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to submit message. Please try again.');
      }

      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        honeypot: '',
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="06. CONTACT"
          title="Let's Build Something Together."
          description="Have an engineering opportunity, a cloud migration project, or an infrastructure problem to solve? I would love to connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Coordinates & Status (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-1 font-sans">
                Direct Communication
              </h3>
              <p className="text-xs text-slate-400 font-sans mb-6">
                Feel free to reach out directly via email, phone, or schedule a conversation.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Email Address</div>
                    <div className="text-sm font-semibold text-white truncate group-hover:text-emerald-400 transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900 transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Direct Mobile</div>
                    <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* Location & Timezone */}
                <div className="flex items-center gap-4 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80">
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Location & Zone</div>
                    <div className="text-sm font-semibold text-white">
                      {PERSONAL_INFO.location} <span className="text-slate-400 text-xs font-mono">(IST / UTC+5:30)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status / Working Hours */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Typical response: &lt; 24 hrs
                </span>
                <span className="text-emerald-400 font-semibold">Ready to deploy</span>
              </div>
            </div>

            {/* Verified Social Connect Cards */}
            <div className="p-6 bg-[#0d1322] border border-slate-800 rounded-2xl">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Verified Developer Profiles
              </h4>
              <div className="flex flex-wrap gap-2">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <Github className="w-4 h-4 text-emerald-400" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <Gitlab className="w-4 h-4 text-cyan-400" />
                  <span>GitLab</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-indigo-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0d1322] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-1 font-sans">
              Send a Direct Message
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6 font-sans">
              Connected directly to the AWS EC2 backend API with automated email dispatch and secure rate limiting.
            </p>

            {submitSuccess ? (
              <div className="p-8 text-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 animate-fade-in space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Received!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out, <strong className="text-white">{formData.name || 'there'}</strong>. Your message has been routed to my personal inbox. I will review and reply promptly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field for anti-spam (hidden from real users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    id="website"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-mono text-slate-300 mb-1.5 font-medium"
                    >
                      Your Name <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.name
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                      }`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-400 font-mono">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-slate-300 mb-1.5 font-medium"
                    >
                      Your Email <span className="text-emerald-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-3.5 py-2.5 text-sm bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                        formErrors.email
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                      }`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-400 font-mono">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-slate-300 mb-1.5 font-medium"
                  >
                    Subject <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack Developer Role / Cloud Infrastructure"
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      formErrors.subject
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                    }`}
                    aria-invalid={!!formErrors.subject}
                    aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                  />
                  {formErrors.subject && (
                    <p id="subject-error" className="mt-1 text-xs text-red-400 font-mono">
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-slate-300 mb-1.5 font-medium"
                  >
                    Your Message <span className="text-emerald-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, engineering requirements, or timeline..."
                    className={`w-full px-3.5 py-2.5 text-sm bg-slate-900 border rounded-lg text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      formErrors.message
                        ? 'border-red-500/80 focus:border-red-400'
                        : 'border-slate-800 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400'
                    }`}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-400 font-mono">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300 font-mono">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{submitError}</span>
                      <p className="mt-1 text-[11px] text-slate-400">
                        You can also write directly to{' '}
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-emerald-400 underline"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    rightIcon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? 'Submitting to API...' : 'Send Message'}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

