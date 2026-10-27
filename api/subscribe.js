import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email } = req.body || {}
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  try {
    // Keep a real list when a Resend audience is configured
    if (process.env.RESEND_AUDIENCE_ID) {
      await resend.contacts.create({ audienceId: process.env.RESEND_AUDIENCE_ID, email })
    }

    await resend.emails.send({
      from: 'Updates Signup <contact@mdeluna.com>',
      to: 'michael@mdeluna.com',
      replyTo: email,
      subject: `New expediting-updates subscriber: ${email}`,
      text: `${email} subscribed to NYC expediting updates from mdeluna.com.`,
    })

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Subscribe error:', err)
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}
