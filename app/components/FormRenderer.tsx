'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { FormData, FormField } from '../[slug]/page'

interface FormRendererProps {
  form: FormData
}

export default function FormRenderer({ form }: FormRendererProps) {
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState<Record<string, string | string[]>>({})
  const honeypotRef = useRef<HTMLInputElement>(null)

  // Capture UTM params from URL on mount
  useEffect(() => {
    if (!form.captureUtmParams) return
    const params = new URLSearchParams(window.location.search)
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
    const utms: Record<string, string> = {}
    utmKeys.forEach((key) => {
      const val = params.get(key)
      if (val) utms[key] = val
    })
    if (Object.keys(utms).length > 0) {
      setFormData((prev) => ({ ...prev, __utmParams: JSON.stringify(utms) }))
    }
  }, [form.captureUtmParams])

  // Initialize default values
  useEffect(() => {
    const defaults: Record<string, string> = {}
    form.fields?.forEach((field) => {
      if (field.defaultValue && field.fieldType === 'hidden') {
        // Replace dynamic placeholders
        let val = field.defaultValue
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search)
          val = val.replace(/\{\{(\w+)\}\}/g, (_, key) => params.get(key) || '')
        }
        const name = field.fieldName?.current || field.label
        defaults[name] = val
      }
    })
    if (Object.keys(defaults).length > 0) {
      setFormData((prev) => ({ ...prev, ...defaults }))
    }
  }, [form.fields])

  const getFieldName = (field: FormField) => field.fieldName?.current || field.label

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [getFieldName(field)]: value }))
  }

  const handleCheckboxChange = (field: FormField, option: string, checked: boolean) => {
    const name = getFieldName(field)
    const current = (formData[name] as string[]) || []
    const updated = checked
      ? [...current, option]
      : current.filter((v) => v !== option)
    setFormData((prev) => ({ ...prev, [name]: updated }))
  }

  const fireTrackingEvents = () => {
    if (!form.trackingEnabled) return

    // GA4 Event
    if (form.ga4EventName && typeof window !== 'undefined' && window.gtag) {
      const params: Record<string, string> = {
        form_name: form.name,
        form_id: form._id,
      }
      form.ga4EventParams?.forEach((p) => {
        params[p.key] = p.value
      })
      window.gtag('event', form.ga4EventName, params)
    }

    // Google Ads Conversion
    if (form.gadsConversionId && form.gadsConversionLabel && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: `${form.gadsConversionId}/${form.gadsConversionLabel}`,
        value: form.gadsConversionValue || undefined,
        currency: form.gadsCurrency || 'EUR',
      })
    }

    // Meta Pixel
    if (form.metaPixelEvent && typeof window !== 'undefined' && window.fbq) {
      const eventName = form.metaPixelEvent === 'custom'
        ? form.metaPixelCustomEvent || 'CustomFormSubmit'
        : form.metaPixelEvent
      window.fbq('track', eventName)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (form.honeypotEnabled && honeypotRef.current?.value) {
      // Bot detected — silently pretend success
      setStatus('success')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      // Build submission data
      const fields = form.fields?.map((field) => ({
        label: field.label,
        fieldName: getFieldName(field),
        value: Array.isArray(formData[getFieldName(field)])
          ? (formData[getFieldName(field)] as string[]).join(', ')
          : (formData[getFieldName(field)] as string) || '',
      })) || []

      const res = await fetch('/api/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId: form._id,
          formName: form.name,
          fields,
          utmParams: formData.__utmParams ? JSON.parse(formData.__utmParams as string) : undefined,
          pageUrl: typeof window !== 'undefined' ? window.location.href : '',
          // Email settings
          emailTo: form.emailTo,
          emailCc: form.emailCc,
          emailBcc: form.emailBcc,
          emailSubject: form.emailSubject,
          emailReplyToField: form.emailReplyToField,
          // Autoresponder
          autoresponderEnabled: form.autoresponderEnabled,
          autoresponderEmailField: form.autoresponderEmailField,
          autoresponderSubject: form.autoresponderSubject,
          autoresponderMessage: form.autoresponderMessage,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrorMessage(data.error || 'Fehler beim Senden')
        setStatus('error')
        return
      }

      // Fire tracking events
      fireTrackingEvents()

      // Handle after submit action
      if (form.afterSubmitAction === 'redirect') {
        const redirectUrl = form.redirectType === 'internal' && form.redirectPage?.slug?.current
          ? `/${form.redirectPage.slug.current}`
          : form.redirectUrl
        if (redirectUrl) {
          router.push(redirectUrl)
          return
        }
      }

      setStatus('success')
      setFormData({})
    } catch {
      setErrorMessage('Ein Netzwerkfehler ist aufgetreten.')
      setStatus('error')
    }
  }

  if (status === 'success' && form.afterSubmitAction !== 'redirect') {
    return (
      <div className="form-success">
        <div className="form-success__icon">✓</div>
        <p>{form.successMessage || 'Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.'}</p>
      </div>
    )
  }

  return (
    <form
      className={`form ${form.cssClass || ''}`}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="form__fields">
        {form.fields?.map((field, i) => {
          if (field.fieldType === 'hidden') {
            return (
              <input
                key={i}
                type="hidden"
                name={getFieldName(field)}
                value={(formData[getFieldName(field)] as string) || field.defaultValue || ''}
              />
            )
          }

          return (
            <div
              key={i}
              className={`form__field ${field.halfWidth ? 'form__field--half' : ''}`}
            >
              <label className="form__label">
                {field.label}
                {field.required && <span className="form__required">*</span>}
              </label>
              {renderField(field, formData, handleChange, handleCheckboxChange)}
            </div>
          )
        })}
      </div>

      {/* Honeypot */}
      {form.honeypotEnabled && (
        <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
          <input
            ref={honeypotRef}
            type="text"
            name="website_url_confirm"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      )}

      {form.privacyNote && (
        <p className="form__privacy">{form.privacyNote}</p>
      )}

      <button
        type="submit"
        className="form__submit"
        style={{
          ...(form.submitButtonBgColor?.hex ? { backgroundColor: form.submitButtonBgColor.hex } : {}),
          ...(form.submitButtonTextColor?.hex ? { color: form.submitButtonTextColor.hex } : {}),
        }}
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Wird gesendet...' : (form.submitButtonText || 'Absenden')}
      </button>

      {status === 'error' && (
        <p className="form__error">{errorMessage || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'}</p>
      )}
    </form>
  )
}

/* ─── Field Renderer ─── */
function renderField(
  field: FormField,
  formData: Record<string, string | string[]>,
  handleChange: (field: FormField, value: string) => void,
  handleCheckboxChange: (field: FormField, option: string, checked: boolean) => void,
) {
  const name = field.fieldName?.current || field.label
  const value = (formData[name] as string) || ''
  const validationProps: Record<string, unknown> = {}
  if (field.validation?.minLength) validationProps.minLength = field.validation.minLength
  if (field.validation?.maxLength) validationProps.maxLength = field.validation.maxLength
  if (field.validation?.pattern) validationProps.pattern = field.validation.pattern
  if (field.validation?.patternMessage) validationProps.title = field.validation.patternMessage

  switch (field.fieldType) {
    case 'textarea':
      return (
        <textarea
          className="form__input form__textarea"
          placeholder={field.placeholder}
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          rows={5}
          {...validationProps}
        />
      )

    case 'select':
      return (
        <select
          className="form__input form__select"
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
        >
          <option value="">{field.placeholder || 'Bitte wählen...'}</option>
          {field.options?.map((opt, j) => (
            <option key={j} value={opt}>{opt}</option>
          ))}
        </select>
      )

    case 'checkbox':
      return (
        <div className="form__checkbox-group">
          {field.options?.map((opt, j) => (
            <label key={j} className="form__checkbox-label">
              <input
                type="checkbox"
                className="form__checkbox"
                checked={((formData[name] as string[]) || []).includes(opt)}
                onChange={(e) => handleCheckboxChange(field, opt, e.target.checked)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )

    case 'radio':
      return (
        <div className="form__radio-group">
          {field.options?.map((opt, j) => (
            <label key={j} className="form__radio-label">
              <input
                type="radio"
                className="form__radio"
                name={name}
                value={opt}
                checked={value === opt}
                onChange={(e) => handleChange(field, e.target.value)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )

    case 'file':
      return (
        <input
          type="file"
          className="form__input form__file"
          accept={field.acceptedFileTypes}
          required={field.required}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleChange(field, file.name)
          }}
        />
      )

    case 'date':
      return (
        <input
          type="date"
          className="form__input"
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      )

    case 'time':
      return (
        <input
          type="time"
          className="form__input"
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
        />
      )

    default:
      return (
        <input
          type={field.fieldType || 'text'}
          className="form__input"
          placeholder={field.placeholder}
          required={field.required}
          value={value}
          onChange={(e) => handleChange(field, e.target.value)}
          {...validationProps}
        />
      )
  }
}

// Type extensions
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fbq?: (...args: any[]) => void
  }
}
