import emailjs from '@emailjs/browser'

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export const isEmailJSConfigured = Boolean(serviceId && templateId && publicKey)

export const sendContactEmail = async (formData) => {
  if (!isEmailJSConfigured) {
    throw new Error('EmailJS is not configured')
  }

  return emailjs.send(
    serviceId,
    templateId,
    {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: 'nesharavichandran@gmail.com',
    },
    publicKey
  )
}
