import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Mail, User, MessageSquare, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('sending');
    // Simulate send (Resend / Edge Function when configured)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus('success');
  }

  return (
    <section id="contacto" className="py-24 bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Tienes alguna pregunta?
            </h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
              Si quieres saber más antes de iniciar el cuestionario, escríbenos directamente.
              Respondemos en menos de 24 horas.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Email directo</p>
                  <a
                    href="mailto:hola@thinkbetter.dev"
                    className="text-sm text-white hover:text-emerald-400 transition-colors"
                  >
                    hola@thinkbetter.dev
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-0.5">Tiempo de respuesta</p>
                  <p className="text-sm text-white">Menos de 24 horas en días laborables</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center p-12 rounded-3xl border border-emerald-500/30 bg-emerald-950/10"
                >
                  <CheckCircle className="w-14 h-14 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
                  <p className="text-zinc-400">
                    Hemos recibido tu mensaje. Te responderemos en menos de 24 horas.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5 p-8 rounded-3xl border border-zinc-800 bg-zinc-900/50"
                >
                  {status === 'error' && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/30 border border-red-800/40 text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      Error al enviar. Inténtalo de nuevo o escríbenos directamente.
                    </div>
                  )}

                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-zinc-300 mb-2">
                      <User className="w-3.5 h-3.5 inline mr-1.5 text-zinc-500" />
                      Nombre completo <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-zinc-300 mb-2">
                      <Mail className="w-3.5 h-3.5 inline mr-1.5 text-zinc-500" />
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-zinc-300 mb-2">
                      <MessageSquare className="w-3.5 h-3.5 inline mr-1.5 text-zinc-500" />
                      Mensaje <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Cuéntanos brevemente tu proyecto o duda..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full py-3.5 rounded-xl bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                          className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Enviar mensaje
                      </>
                    )}
                  </button>

                  <p className="text-xs text-zinc-600 text-center">
                    También puedes escribirnos directamente a{' '}
                    <a href="mailto:hola@thinkbetter.dev" className="text-zinc-500 hover:text-zinc-300 transition-colors">
                      hola@thinkbetter.dev
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
