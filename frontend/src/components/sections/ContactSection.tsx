import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Github, Linkedin, Gitlab, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
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
        const errorMsg = Array.isArray(data.errors) && data.errors.length > 0
          ? `${data.message || 'Validation failed'}: ${data.errors.join(' ')}`
          : (data.message || data.error || 'Failed to submit message. Please try again.');
        throw new Error(errorMsg);
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
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 border-t border-cognac/20 bg-[#0b070d] relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-plum/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-apricot/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          eyebrow="06. CONTACT"
          title="Let's Build Something Together."
          description="Have an engineering opportunity, an infrastructure initiative, or a project in mind? Reach out directly or submit the verified inquiry form."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Coordinates (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-[#160f18]/90 border border-cognac/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-card-dark relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-apricot/15 to-transparent rounded-bl-full pointer-events-none" />

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-apricot animate-pulse" />
                <h3 className="text-xl font-display font-bold text-white">
                  Direct Channels
                </h3>
              </div>
              <p className="text-xs text-neutral-400 font-sans mb-6">
                Feel free to connect directly via email, mobile, or schedule an architectural discussion.
              </p>

              <div className="space-y-3.5">
                {/* Email - Apricot */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1f1522]/80 border border-apricot/20 hover:border-apricot hover:bg-[#291b2e] transition-all group/item shadow-inner"
                >
                  <div className="p-3 rounded-xl bg-apricot/15 text-apricot border border-apricot/30 group-hover/item:scale-110 group-hover/item:bg-apricot group-hover/item:text-white transition-all shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[11px] font-mono text-apricot uppercase tracking-wider font-semibold">Direct Email</div>
                    <div className="text-sm font-semibold text-neutral-200 truncate group-hover/item:text-white transition-colors">
                      {PERSONAL_INFO.email}
                    </div>
                  </div>
                </a>

                {/* Phone - Cognac */}
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#1f1522]/80 border border-cognac/20 hover:border-cognac hover:bg-[#291b2e] transition-all group/item shadow-inner"
                >
                  <div className="p-3 rounded-xl bg-cognac/15 text-cognac border border-cognac/30 group-hover/item:scale-110 group-hover/item:bg-cognac group-hover/item:text-white transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-cognac uppercase tracking-wider font-semibold">Mobile Phone</div>
                    <div className="text-sm font-semibold text-neutral-200 group-hover/item:text-white transition-colors">
                      {PERSONAL_INFO.phone}
                    </div>
                  </div>
                </a>

                {/* Location - Plum */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1f1522]/80 border border-plum/20 shadow-inner">
                  <div className="p-3 rounded-xl bg-plum/15 text-plum border border-plum/30 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-plum uppercase tracking-wider font-semibold">Location & Zone</div>
                    <div className="text-sm font-semibold text-neutral-200">
                      {PERSONAL_INFO.location} <span className="text-neutral-400 text-xs font-mono">(IST / UTC+5:30)</span>
                    </div>
                  </div>
                </div>

                {/* Turnaround - Rose */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1f1522]/80 border border-rose/20 shadow-inner">
                  <div className="p-3 rounded-xl bg-rose/15 text-rose border border-rose/30 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-rose uppercase tracking-wider font-semibold">Guaranteed Turnaround</div>
                    <div className="text-sm font-semibold text-neutral-200">
                      Responses within 24 hours <span className="text-emerald-400 text-xs font-mono">• Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verified Developer Accounts */}
            <div className="p-6 bg-[#160f18]/90 border border-plum/30 rounded-2xl backdrop-blur-xl shadow-card-dark">
              <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3 font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-apricot" />
                Verified Developer Accounts
              </h4>
              <div className="grid grid-cols-3 gap-2.5">
                <a
                  href={PERSONAL_INFO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#1f1522] border border-apricot/30 text-neutral-200 hover:text-white hover:border-apricot hover:bg-apricot/15 transition-all group"
                >
                  <Github className="w-4 h-4 text-apricot group-hover:scale-110 transition-transform" />
                  <span>GitHub</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.gitlab}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#1f1522] border border-cognac/30 text-neutral-200 hover:text-white hover:border-cognac hover:bg-cognac/15 transition-all group"
                >
                  <Gitlab className="w-4 h-4 text-cognac group-hover:scale-110 transition-transform" />
                  <span>GitLab</span>
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-3 text-xs font-mono font-medium rounded-xl bg-[#1f1522] border border-plum/30 text-neutral-200 hover:text-white hover:border-plum hover:bg-plum/15 transition-all group"
                >
                  <Linkedin className="w-4 h-4 text-plum group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#160f18]/90 border border-apricot/25 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-card-dark relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-plum/20 via-rose/10 to-transparent rounded-bl-full pointer-events-none" />

            <div className="flex items-center justify-between mb-1">
              <h3 className="text-2xl font-display font-bold text-white">
                Send an Inquiry
              </h3>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-plum/20 text-plum border border-plum/40 uppercase tracking-widest font-semibold">
                Docker MySQL
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mb-6 font-sans">
              Connected directly to containerized MySQL storage with automated rate limiting and notification routing.
            </p>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center rounded-2xl bg-[#1f1522] border border-emerald-500/40 shadow-inner space-y-4"
              >
                <div className="inline-flex p-3.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-display font-bold text-white">Message Stored Successfully</h4>
                <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, <strong className="text-apricot">{formData.name || 'there'}</strong>. Your inquiry has been saved to the database. I will review and reply promptly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-2"
                >
                  Send Another Message
                </Button>
              </motion.div>
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
                      className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold uppercase tracking-wider"
                    >
                      Your Name <span className="text-apricot">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full px-4 py-3 text-sm bg-[#1c121e] border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all ${
                        formErrors.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-cognac/30 focus:border-apricot focus:ring-2 focus:ring-apricot/30'
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
                      className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold uppercase tracking-wider"
                    >
                      Your Email <span className="text-apricot">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@company.com"
                      className={`w-full px-4 py-3 text-sm bg-[#1c121e] border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all ${
                        formErrors.email
                          ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                          : 'border-cognac/30 focus:border-apricot focus:ring-2 focus:ring-apricot/30'
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
                    className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold uppercase tracking-wider"
                  >
                    Subject <span className="text-apricot">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full Stack & Cloud Engineering Discussion"
                    className={`w-full px-4 py-3 text-sm bg-[#1c121e] border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      formErrors.subject
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-cognac/30 focus:border-apricot focus:ring-2 focus:ring-apricot/30'
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
                    className="block text-xs font-mono text-neutral-300 mb-1.5 font-bold uppercase tracking-wider"
                  >
                    Your Message <span className="text-apricot">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide details about your project, team requirements, or timeline..."
                    className={`w-full px-4 py-3 text-sm bg-[#1c121e] border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all ${
                      formErrors.message
                        ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                        : 'border-cognac/30 focus:border-apricot focus:ring-2 focus:ring-apricot/30'
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
                  <div className="p-4 rounded-xl bg-red-500/15 border border-red-500/40 flex items-start gap-3 text-xs text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span>{submitError}</span>
                      <p className="mt-1 text-[11px] text-neutral-400">
                        You can also write directly to{' '}
                        <a
                          href={`mailto:${PERSONAL_INFO.email}`}
                          className="text-apricot underline font-semibold"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};
