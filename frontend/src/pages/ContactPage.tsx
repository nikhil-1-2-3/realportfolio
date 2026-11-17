import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Github, Linkedin, Gitlab, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/ui/SectionHeader';
import { Button } from '../components/ui/Button';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export const ContactPage: React.FC = () => {
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
    setFormData((prev: ContactFormData) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof ContactFormData]) {
      setFormErrors((prev: Partial<Record<keyof ContactFormData, string>>) => ({ ...prev, [name]: undefined }));
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

    const apiUrl = import.meta.env.VITE_API_URL || '/api';

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
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="GET IN TOUCH"
        title="Let's Build Something Resilient."
        description="Have an engineering opportunity, an infrastructure initiative, or a project in mind? Reach out directly or submit the verified inquiry form."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Direct Coordinates (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-rose/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-card-light relative overflow-hidden">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-ochre animate-pulse" />
              <h3 className="text-xl font-display font-bold text-[#231215]">
                Direct Channels
              </h3>
            </div>
            <p className="text-xs text-[#5C4448] font-sans mb-6">
              Connect directly via email or mobile to schedule an architectural discussion.
            </p>

            <div className="space-y-3.5">
              {/* Email - Cognac */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF4EC] border border-rose/25 hover:border-cognac/50 hover:bg-white transition-all group shadow-aesthetic-sm"
              >
                <div className="p-3 rounded-xl bg-cognac/10 text-cognac border border-cognac/20 group-hover:scale-105 group-hover:bg-cognac group-hover:text-white transition-all shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] font-mono text-cognac uppercase tracking-wider font-bold">Direct Email</div>
                  <div className="text-sm font-semibold text-[#231215] truncate group-hover:text-cognac transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>

              {/* Phone - Ochre */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF4EC] border border-rose/25 hover:border-ochre/50 hover:bg-white transition-all group shadow-aesthetic-sm"
              >
                <div className="p-3 rounded-xl bg-ochre/15 text-ochre border border-ochre/25 group-hover:scale-105 group-hover:bg-ochre group-hover:text-white transition-all shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-ochre uppercase tracking-wider font-bold">Mobile Phone</div>
                  <div className="text-sm font-semibold text-[#231215] group-hover:text-ochre transition-colors">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </a>

              {/* Location - Rose */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF4EC] border border-rose/25 shadow-aesthetic-sm">
                <div className="p-3 rounded-xl bg-rose/15 text-rose border border-rose/25 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-rose uppercase tracking-wider font-bold">Location & Zone</div>
                  <div className="text-sm font-semibold text-[#231215]">
                    {PERSONAL_INFO.location} <span className="text-[#8A6E73] text-xs font-mono">(IST / UTC+5:30)</span>
                  </div>
                </div>
              </div>

              {/* Turnaround - Mulberry */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#FAF4EC] border border-rose/25 shadow-aesthetic-sm">
                <div className="p-3 rounded-xl bg-mulberry/10 text-mulberry border border-mulberry/20 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-mulberry uppercase tracking-wider font-bold">Guaranteed Turnaround</div>
                  <div className="text-sm font-semibold text-[#231215]">
                    Responses within 24 hours <span className="text-ochre text-xs font-mono font-bold">• Active in IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Developer Accounts */}
          <div className="p-6 bg-white border border-rose/30 rounded-2xl shadow-card-light">
            <h4 className="text-xs font-mono uppercase tracking-wider text-[#5C4448] mb-3 font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cognac" />
              Verified Developer Accounts
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#FAF4EC] border border-rose/25 text-[#231215] hover:text-white hover:border-cognac hover:bg-cognac transition-all group"
              >
                <Github className="w-4 h-4 text-cognac group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.gitlab}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#FAF4EC] border border-rose/25 text-[#231215] hover:text-white hover:border-ochre hover:bg-ochre transition-all group"
              >
                <Gitlab className="w-4 h-4 text-ochre group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>GitLab</span>
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#FAF4EC] border border-rose/25 text-[#231215] hover:text-white hover:border-rose hover:bg-rose transition-all group"
              >
                <Linkedin className="w-4 h-4 text-rose group-hover:text-white group-hover:scale-110 transition-transform" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-rose/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-card-light relative overflow-hidden">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-2xl font-display font-bold text-[#231215]">
              Send an Inquiry
            </h3>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FAF4EC] text-cognac border border-cognac/30 uppercase tracking-widest font-bold shadow-aesthetic-sm">
              Docker MySQL
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#5C4448] mb-6 font-sans">
            Connected directly to containerized MySQL storage with automated rate limiting and notification routing.
          </p>

          {submitSuccess ? (
            <div className="p-8 text-center rounded-2xl bg-[#FAF4EC] border border-ochre/40 shadow-inner space-y-4">
              <div className="inline-flex p-3.5 rounded-full bg-ochre/15 text-ochre border border-ochre/30 shadow-aesthetic-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-display font-bold text-[#231215]">Message Stored Successfully</h4>
              <p className="text-sm text-[#5C4448] max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <strong className="text-cognac">{formData.name || 'there'}</strong>. Your inquiry has been saved to the database. I will review and reply promptly.
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
                    className="block text-xs font-mono text-[#231215] mb-1.5 font-bold uppercase tracking-wider"
                  >
                    Your Name <span className="text-cognac">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Johnson"
                    className={`w-full px-4 py-3 text-sm bg-[#FAF6F0] border rounded-xl text-[#231215] placeholder-[#8A6E73] focus:outline-none transition-all ${
                      formErrors.name
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-rose/30 focus:border-cognac focus:ring-1 focus:ring-cognac/30'
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
                    className="block text-xs font-mono text-[#231215] mb-1.5 font-bold uppercase tracking-wider"
                  >
                    Your Email <span className="text-cognac">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. alex@company.com"
                    className={`w-full px-4 py-3 text-sm bg-[#FAF6F0] border rounded-xl text-[#231215] placeholder-[#8A6E73] focus:outline-none transition-all ${
                      formErrors.email
                        ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                        : 'border-rose/30 focus:border-cognac focus:ring-1 focus:ring-cognac/30'
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
                  className="block text-xs font-mono text-[#231215] mb-1.5 font-bold uppercase tracking-wider"
                >
                  Subject <span className="text-cognac">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Full Stack & Cloud Engineering Discussion"
                  className={`w-full px-4 py-3 text-sm bg-[#FAF6F0] border rounded-xl text-[#231215] placeholder-[#8A6E73] focus:outline-none transition-all ${
                    formErrors.subject
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : 'border-rose/30 focus:border-cognac focus:ring-1 focus:ring-cognac/30'
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
                  className="block text-xs font-mono text-[#231215] mb-1.5 font-bold uppercase tracking-wider"
                >
                  Your Message <span className="text-cognac">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Provide details about your project, team requirements, or timeline..."
                  className={`w-full px-4 py-3 text-sm bg-[#FAF6F0] border rounded-xl text-[#231215] placeholder-[#8A6E73] focus:outline-none transition-all ${
                    formErrors.message
                      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500/30'
                      : 'border-rose/30 focus:border-cognac focus:ring-1 focus:ring-cognac/30'
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
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-xs text-red-600 font-mono">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <span>{submitError}</span>
                    <p className="mt-1 text-[11px] text-[#5C4448]">
                      You can also write directly to{' '}
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-cognac underline font-bold"
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
                  {isSubmitting ? 'Recording to MySQL...' : 'Send Message'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
