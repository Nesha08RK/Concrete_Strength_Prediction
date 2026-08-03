import { useState } from 'react'
import { motion } from 'framer-motion'
import { LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send, Sparkles } from 'lucide-react'
import { isEmailJSConfigured, sendContactEmail } from '../utils/emailjs'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function ContactPage() {
  const [formData, setFormData] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState('')

  const validate = () => {
    const nextErrors = {}
    if (!formData.name.trim()) nextErrors.name = 'Name is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nextErrors.email = 'Enter a valid email.'
    if (!formData.subject.trim()) nextErrors.subject = 'Subject is required.'
    if (!formData.message.trim()) nextErrors.message = 'Message is required.'
    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false)
      setStatusMessage('')
      setStatusType('')
      return
    }

    setIsSending(true)
    setStatusMessage('')
    setStatusType('')

    try {
      await sendContactEmail(formData)
      setSubmitted(true)
      setStatusType('success')
      setStatusMessage('✓ Message Sent Successfully')
      setFormData(initialForm)
    } catch (error) {
      setSubmitted(false)
      setStatusType('error')
      setStatusMessage('Unable to send message. Please try again later.')
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-[2rem] border border-white/10 bg-slate-900/60 p-5 shadow-[0_0_100px_rgba(37,99,235,0.14)] backdrop-blur-xl sm:p-8 lg:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-200">
                <Sparkles size={15} />
                Contact SmartCrete AI
              </p>
              <h1 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Let’s connect about your next concrete innovation</h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                Have questions or feedback? We’d love to hear from you.
              </p>
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-300">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">Developer</p>
                  <p className="text-sm text-slate-400">NESHA R K</p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm text-slate-300">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3">
                  <Mail size={16} className="text-cyan-300" />
                  <span>Department: Computer Science and Engineering</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3">
                  <Phone size={16} className="text-cyan-300" />
                  <span>Project: SmartCrete AI</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3">
                  <MapPin size={16} className="text-cyan-300" />
                  <span>Final Year Project</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="rounded-[1.75rem] border border-white/10 bg-slate-950/70 p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Name</span>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 text-white outline-none focus:border-cyan-400" />
                  {errors.name && <p className="mt-2 text-sm text-rose-300">{errors.name}</p>}
                </label>
                <label className="block text-sm text-slate-300">
                  <span className="mb-2 block">Email</span>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 text-white outline-none focus:border-cyan-400" />
                  {errors.email && <p className="mt-2 text-sm text-rose-300">{errors.email}</p>}
                </label>
              </div>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Subject</span>
                <input name="subject" value={formData.subject} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 text-white outline-none focus:border-cyan-400" />
                {errors.subject && <p className="mt-2 text-sm text-rose-300">{errors.subject}</p>}
              </label>

              <label className="block text-sm text-slate-300">
                <span className="mb-2 block">Message</span>
                <textarea name="message" rows="5" value={formData.message} onChange={handleChange} className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-3 py-3 text-white outline-none focus:border-cyan-400" />
                {errors.message && <p className="mt-2 text-sm text-rose-300">{errors.message}</p>}
              </label>

              <button
                type="submit"
                disabled={isSending}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 font-medium text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSending ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>

              {!isEmailJSConfigured && (
                <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  EmailJS is not configured yet. Add your Vite environment variables to enable delivery.
                </div>
              )}

              {statusMessage && (
                <div className={`rounded-2xl border px-4 py-3 text-sm ${statusType === 'success' ? 'border-emerald-400/20 bg-emerald-500/10 text-emerald-200' : 'border-rose-400/20 bg-rose-500/10 text-rose-200'}`}>
                  <div className="font-medium">{statusType === 'success' ? '✓ Message Sent Successfully' : 'Unable to send message.'}</div>
                  <div className="mt-1 leading-6">
                    {statusType === 'success' ? 'Thank you for contacting SmartCrete AI. I will get back to you soon.' : 'Please try again later.'}
                  </div>
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactPage
