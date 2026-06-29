'use client'

import { useCallback, useEffect, useId, useRef } from 'react'
import Script from 'next/script'
import { hubspotForm, hubspotFormsScript } from '@/lib/hubspot'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          portalId: string
          formId: string
          target: string | HTMLElement
          region?: string
        }) => void
      }
    }
    hsFormsOnReady?: Array<() => void>
  }
}

export default function ContactForm() {
  const containerId = useId().replace(/:/g, '')
  const created = useRef(false)

  const createForm = useCallback(() => {
    if (created.current || !window.hbspt) return
    const target = document.getElementById(containerId)
    if (!target) return

    created.current = true
    target.innerHTML = ''
    window.hbspt.forms.create({
      portalId: hubspotForm.portalId,
      formId: hubspotForm.formId,
      region: hubspotForm.region,
      target: `#${containerId}`,
    })
  }, [containerId])

  useEffect(() => {
    if (window.hbspt) {
      createForm()
      return
    }

    window.hsFormsOnReady = window.hsFormsOnReady || []
    window.hsFormsOnReady.push(createForm)
  }, [createForm])

  return (
    <>
      <Script src={hubspotFormsScript} strategy="afterInteractive" onLoad={createForm} />
      <div id={containerId} className="hubspot-form" />
    </>
  )
}
