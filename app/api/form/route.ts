import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'

interface SubmissionField {
  label: string
  fieldName: string
  value: string
}

interface FormSubmitBody {
  formId: string
  formName: string
  fields: SubmissionField[]
  utmParams?: Record<string, string>
  pageUrl?: string
  // Email
  emailTo?: string[]
  emailCc?: string[]
  emailBcc?: string[]
  emailSubject?: string
  emailReplyToField?: string
  // Autoresponder
  autoresponderEnabled?: boolean
  autoresponderEmailField?: string
  autoresponderSubject?: string
  autoresponderMessage?: string
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string, maxPerMinute: number): boolean {
  if (maxPerMinute <= 0) return true
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 })
    return true
  }
  if (entry.count >= maxPerMinute) return false
  entry.count++
  return true
}

export async function POST(request: Request) {
  try {
    const body: FormSubmitBody = await request.json()

    if (!body.formId || !body.fields || body.fields.length === 0) {
      return NextResponse.json({ error: 'Fehlende Pflichtfelder' }, { status: 400 })
    }

    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    if (!checkRateLimit(ip, 5)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' }, { status: 429 })
    }

    // 1. Save submission to Sanity
    try {
      if (process.env.SANITY_API_WRITE_TOKEN) {
        await writeClient.create({
          _type: 'formSubmission',
          form: { _type: 'reference', _ref: body.formId },
          data: body.fields.map((f) => ({
            _type: 'object',
            _key: crypto.randomUUID(),
            label: f.label,
            value: f.value,
          })),
          utmParams: body.utmParams || undefined,
          pageUrl: body.pageUrl || undefined,
          userAgent: request.headers.get('user-agent') || undefined,
          ipAddress: ip !== 'unknown' ? ip : undefined,
          status: 'new',
        })
      } else {
        console.log('=== FORM SUBMISSION (no write token) ===')
        console.log('Form:', body.formName)
        console.log('Fields:', JSON.stringify(body.fields, null, 2))
        console.log('UTM:', JSON.stringify(body.utmParams))
        console.log('=========================================')
      }
    } catch (err) {
      console.error('Error saving to Sanity:', err)
      // Don't fail the request — still try to send email
    }

    // 2. Send notification email
    const resendKey = process.env.RESEND_API_KEY
    if (resendKey && body.emailTo?.length) {
      // Replace placeholders in subject
      let subject = body.emailSubject || `Neue Anfrage: ${body.formName}`
      subject = subject.replace(/\{\{_formName\}\}/g, body.formName)
      body.fields.forEach((f) => {
        subject = subject.replace(new RegExp(`\\{\\{${escapeRegex(f.label)}\\}\\}`, 'gi'), f.value)
      })

      // Build HTML
      const htmlContent = `
        <h2>Neue Anfrage: ${escapeHtml(body.formName)}</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
          ${body.fields.filter(f => f.value).map((f) => `
            <tr>
              <td style="padding:10px 14px;border:1px solid #e0e0e0;font-weight:600;background:#f5f5f5;width:35%;vertical-align:top;">${escapeHtml(f.label)}</td>
              <td style="padding:10px 14px;border:1px solid #e0e0e0;">${escapeHtml(f.value).replace(/\n/g, '<br>')}</td>
            </tr>
          `).join('')}
        </table>
        ${body.utmParams ? `
          <br>
          <p style="font-size:12px;color:#888;">
            <strong>Tracking:</strong> ${Object.entries(body.utmParams).map(([k, v]) => `${k}=${v}`).join(', ')}
          </p>
        ` : ''}
        ${body.pageUrl ? `<p style="font-size:12px;color:#888;">Seite: ${escapeHtml(body.pageUrl)}</p>` : ''}
      `

      const textContent = body.fields
        .filter(f => f.value)
        .map((f) => `${f.label}: ${f.value}`)
        .join('\n')

      // Find reply-to email
      let replyTo: string | undefined
      if (body.emailReplyToField) {
        const replyField = body.fields.find((f) =>
          f.label.toLowerCase() === body.emailReplyToField!.toLowerCase()
        )
        if (replyField?.value) replyTo = replyField.value
      }

      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM_EMAIL || 'Formular <onboarding@resend.dev>',
            to: body.emailTo,
            cc: body.emailCc?.length ? body.emailCc : undefined,
            bcc: body.emailBcc?.length ? body.emailBcc : undefined,
            reply_to: replyTo,
            subject,
            html: htmlContent,
            text: textContent,
          }),
        })
      } catch (err) {
        console.error('Error sending notification email:', err)
      }

      // 3. Auto-responder
      if (body.autoresponderEnabled && body.autoresponderEmailField) {
        const recipientField = body.fields.find((f) =>
          f.label.toLowerCase() === body.autoresponderEmailField!.toLowerCase()
        )
        if (recipientField?.value) {
          let autoMessage = body.autoresponderMessage || 'Vielen Dank für Ihre Nachricht.'
          // Replace placeholders
          body.fields.forEach((f) => {
            autoMessage = autoMessage.replace(
              new RegExp(`\\{\\{${escapeRegex(f.label)}\\}\\}`, 'gi'),
              f.value
            )
          })

          try {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${resendKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                from: process.env.RESEND_FROM_EMAIL || 'Formular <onboarding@resend.dev>',
                to: [recipientField.value],
                subject: body.autoresponderSubject || 'Vielen Dank für Ihre Anfrage',
                html: `<div style="font-family:sans-serif;max-width:600px;">${escapeHtml(autoMessage).replace(/\n/g, '<br>')}</div>`,
                text: autoMessage,
              }),
            })
          } catch (err) {
            console.error('Error sending autoresponder:', err)
          }
        }
      }
    } else if (!resendKey) {
      console.log('=== FORM EMAIL (no Resend key) ===')
      console.log('To:', body.emailTo?.join(', '))
      console.log('Subject:', body.emailSubject)
      console.log(body.fields.map((f) => `${f.label}: ${f.value}`).join('\n'))
      console.log('===================================')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Form API error:', error)
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
