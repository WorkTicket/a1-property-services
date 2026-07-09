const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const SERVICE_LABELS = {
  'retaining-walls': 'Retaining Walls',
  'paver-patios': 'Paver Patios',
  'landscape-installation': 'Landscape Installation',
  'lawn-care': 'Lawn Care & Mowing',
  'tree-service': 'Tree Service',
  'water-features': 'Water Features & Ponds',
  hydroseeding: 'Hydroseeding',
  'snow-removal': 'Snow Removal',
  other: 'Other',
}

const DEFAULT_TO_EMAIL = 'a1propertyservices0219@gmail.com'
const DEFAULT_FROM_EMAIL = 'quotes@a1pslandscape.com'

function getRecipientEmails(env) {
  const raw = env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL
  return raw
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean)
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function normalizePhone(phone) {
  return phone.replace(/\D/g, '')
}

function validatePayload(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, message: 'Invalid request body.' }
  }

  if (typeof body._honey === 'string' && body._honey.trim()) {
    return { ok: true, honeypot: true }
  }

  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = typeof body.phone === 'string' ? body.phone.trim() : ''
  const city = typeof body.city === 'string' ? body.city.trim() : ''
  const service = typeof body.service === 'string' ? body.service.trim() : ''
  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const details = typeof body.details === 'string' ? body.details.trim() : ''

  if (name.length < 2) {
    return { ok: false, message: 'Please enter your full name.' }
  }

  if (normalizePhone(phone).length < 10) {
    return { ok: false, message: 'Please enter a valid phone number.' }
  }

  if (city.length < 2) {
    return { ok: false, message: 'Please enter your city.' }
  }

  if (!SERVICE_LABELS[service]) {
    return { ok: false, message: 'Please select a service.' }
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: 'Please enter a valid email address.' }
  }

  return {
    ok: true,
    data: { name, phone, city, service, email, details },
  }
}

function buildEmailHtml(data) {
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service
  const rows = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['City', data.city],
    ['Service', serviceLabel],
    ['Email', data.email || 'Not provided'],
    ['Project Details', data.details || 'Not provided'],
  ]

  const tableRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;background:#f9fafb;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`,
    )
    .join('')

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h2 style="margin:0 0 16px;">New Quote Request</h2>
      <p style="margin:0 0 16px;">A visitor submitted the contact form on a1pslandscape.com.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;">${tableRows}</table>
    </div>
  `.trim()
}

function buildEmailText(data) {
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service

  return [
    'New Quote Request',
    '',
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `City: ${data.city}`,
    `Service: ${serviceLabel}`,
    `Email: ${data.email || 'Not provided'}`,
    `Project Details: ${data.details || 'Not provided'}`,
  ].join('\n')
}

async function sendViaCloudflareEmail(env, data) {
  if (!env.EMAIL) {
    return { ok: false, status: 503, message: 'Contact form is not configured yet. Please call us directly.' }
  }

  const toEmails = getRecipientEmails(env)
  const fromEmail = env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL
  const serviceLabel = SERVICE_LABELS[data.service] ?? data.service

  const message = {
    to: toEmails.length === 1 ? toEmails[0] : toEmails,
    from: { email: fromEmail, name: 'A1 Property Services' },
    subject: `New Quote Request - ${data.name} (${serviceLabel})`,
    html: buildEmailHtml(data),
    text: buildEmailText(data),
  }

  if (data.email) {
    message.replyTo = data.email
  }

  try {
    await env.EMAIL.send(message)
    return { ok: true }
  } catch (error) {
    const messageText =
      typeof error?.message === 'string'
        ? error.message
        : 'Unable to send your request right now.'
    return { ok: false, status: 502, message: messageText }
  }
}

export async function handleContact(request, env) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS })
  }

  if (request.method !== 'POST') {
    return Response.json(
      { success: false, message: 'Method not allowed.' },
      { status: 405, headers: CORS_HEADERS },
    )
  }

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json(
      { success: false, message: 'Invalid request body.' },
      { status: 400, headers: CORS_HEADERS },
    )
  }

  const validation = validatePayload(body)
  if (!validation.ok) {
    return Response.json(
      { success: false, message: validation.message },
      { status: 400, headers: CORS_HEADERS },
    )
  }

  if (validation.honeypot) {
    return Response.json({ success: true }, { headers: CORS_HEADERS })
  }

  const delivery = await sendViaCloudflareEmail(env, validation.data)
  if (!delivery.ok) {
    return Response.json(
      { success: false, message: delivery.message },
      { status: delivery.status ?? 502, headers: CORS_HEADERS },
    )
  }

  return Response.json({ success: true }, { headers: CORS_HEADERS })
}
