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
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-theme-border bg-theme-base">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="06. CONTACT"
          title="Let's Build Something Together."
          description="Have an engineering opportunity, an infrastructure initiative, or a project in mind? Reach out directly or submit the verified inquiry form."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Coordinates & Profiles (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 card-shading">
              <h3 className="text-xl font-display font-bold text-theme-main mb-1">
                Direct Channels
              </h3>
              <p className="text-xs text-theme-muted font-sans mb-6">
                Feel free to connect directly via email, mobile, or schedule an architectural discussion.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-theme-elevated border border-theme-border hover:border-apricot hover:bg-theme-hover transition-all shadow-sand-sm group"
                >
                  <div className="p-2.5 rounded-lg bg-apricot/15 text-apricot group-hover:bg-apricot group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-theme-muted uppercase">Direct Email</div>
                    <div className="text-sm font-semibold text-theme-main truncate group-hover:text-apricot transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-theme-elevated border border-theme-border hover:border-cognac hover:bg-theme-hover transition-all shadow-sand-sm group"
                >
                  <div className="p-2.5 rounded-lg bg-cognac/15 text-cognac group-hover:bg-cognac group-hover:text-white transition-colors shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-theme-muted uppercase">Mobile Phone</div>
                    <div className="text-sm font-semibold text-theme-main group-hover:text-cognac transition-colors">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-theme-elevated border border-theme-border shadow-sand-sm">
                  <div className="p-2.5 rounded-lg bg-plum/15 text-plum shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-theme-muted uppercase">Location & Zone</div>
                    <div className="text-sm font-semibold text-theme-main">
                      {PERSONAL_INFO.location} <span className="text-theme-muted text-xs font-mono">(IST / UTC+5:30)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Ribbon */}
              <div className="mt-6 pt-5 border-t border-theme-border/60 flex items-center justify-between text-xs font-mono text-theme-muted">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-apricot" />
                  Response within 24 hours
                </span>
                <span className="text-emerald-600 font-bold">Active in IST</span>
              </div>
            </div>

            {/* Verified Profiles */}
            <div className="p-6 bg-theme-surface border border-theme-border rounded-2xl card-shading">
              <h4 className="text-xs font-mono uppercase tracking-wider text-theme-muted mb-3 font-semibold">
                Verified Developer Accounts
              </h4>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-mono font-medium rounded-xl bg-theme-elevated border border-theme-border text-theme-main hover:border-apricot hover:bg-theme-hover transition-colors shadow-sand-sm"
                >
                  <Github className="w-4 h-4 text-theme-main" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-mono font-medium rounded-xl bg-theme-elevated border border-theme-border text-theme-main hover:border-cognac hover:bg-theme-hover transition-colors shadow-sand-sm"
                >
                  <Gitlab className="w-4 h-4 text-theme-main" />
                  <span>GitLab</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-mono font-medium rounded-xl bg-theme-elevated border border-theme-border text-theme-main hover:border-plum hover:bg-theme-hover transition-colors shadow-sand-sm"
                >
                  <Linkedin className="w-4 h-4 text-theme-main" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-theme-surface border border-theme-border rounded-2xl p-6 sm:p-8 card-shading">
            <h3 className="text-2xl font-display font-bold text-theme-main mb-1">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-theme-muted mb-6 font-sans">
              Connected to the Docker MySQL database with automated rate limiting and notification routing.
            </p>

            {submitSuccess ? (
              <div className="p-8 text-center rounded-2xl bg-theme-elevated border border-theme-border shadow-sand-sm space-y-4">
                <div className="inline-flex p-3 rounded-full bg-emerald-500/15 text-emerald-600 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-theme-main">Message Received</h4>
                <p className="text-sm text-theme-muted max-w-md mx-auto">
                  Thank you for reaching out, <strong className="text-theme-main">{formData.name || 'there'}</strong>. Your inquiry has been saved to the database. I will review and reply promptly.
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
                {/* Honeypot field */}
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
                      className="block text-xs font-mono text-theme-main mb-1.5 font-bold"
                    >
                      Your Name <span className="text-theme-accent">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-2.5 text-sm bg-theme-elevated border rounded-xl text-theme-main placeholder-theme-muted focus:outline-none transition-all ${
                        formErrors.name
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-theme-border focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 shadow-sand-sm'
                      }`}
                      aria-invalid={!!formErrors.name}
                      aria-describedby={formErrors.name ? 'name-error' : undefined}
                    />
                    {formErrors.name && (
                      <p id="name-error" className="mt-1 text-xs text-red-500 font-mono">
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-mono text-theme-main mb-1.5 font-bold"
                    >
                      Your Email <span className="text-theme-accent">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-4 py-2.5 text-sm bg-theme-elevated border rounded-xl text-theme-main placeholder-theme-muted focus:outline-none transition-all ${
                        formErrors.email
                          ? 'border-red-400 focus:border-red-500'
                          : 'border-theme-border focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 shadow-sand-sm'
                      }`}
                      aria-invalid={!!formErrors.email}
                      aria-describedby={formErrors.email ? 'email-error' : undefined}
                    />
                    {formErrors.email && (
                      <p id="email-error" className="mt-1 text-xs text-red-500 font-mono">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs font-mono text-theme-main mb-1.5 font-bold"
                  >
                    Subject <span className="text-theme-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack & Cloud Engineering Discussion"
                    className={`w-full px-4 py-2.5 text-sm bg-theme-elevated border rounded-xl text-theme-main placeholder-theme-muted focus:outline-none transition-all ${
                      formErrors.subject
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-theme-border focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 shadow-sand-sm'
                    }`}
                    aria-invalid={!!formErrors.subject}
                    aria-describedby={formErrors.subject ? 'subject-error' : undefined}
                  />
                  {formErrors.subject && (
                    <p id="subject-error" className="mt-1 text-xs text-red-500 font-mono">
                      {formErrors.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-mono text-theme-main mb-1.5 font-bold"
                  >
                    Your Message <span className="text-theme-accent">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project, team requirements, or timeline..."
                    className={`w-full px-4 py-2.5 text-sm bg-theme-elevated border rounded-xl text-theme-main placeholder-theme-muted focus:outline-none transition-all ${
                      formErrors.message
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-theme-border focus:border-theme-accent focus:ring-2 focus:ring-theme-accent/20 shadow-sand-sm'
                    }`}
                    aria-invalid={!!formErrors.message}
                    aria-describedby={formErrors.message ? 'message-error' : undefined}
                  />
                  {formErrors.message && (
                    <p id="message-error" className="mt-1 text-xs text-red-500 font-mono">
                      {formErrors.message}
                    </p>
                  )}
                </div>

                {/* Error Banner */}
                {submitError && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-500 font-mono">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span>{submitError}</span>
                      <p className="mt-1 text-[11px] text-theme-muted">
                        You can also write directly to{' '}
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-theme-accent underline font-semibold"
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
                    {isSubmitting ? 'Recording to Database...' : 'Send Message'}
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
