import Link from 'next/link'

export default function FooterSignature() {
  return (
    <span>
      Built by{' '}
      <Link
        href="https://www.kinexisdigital.com/en"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-neutral-400 underline decoration-neutral-600 underline-offset-2 transition-colors hover:text-neutral-200 hover:decoration-neutral-200"
      >
        Kinexis Digital
      </Link>
    </span>
  )
}
