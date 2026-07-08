import Link from 'next/link'

export default function FooterSignature() {
  return (
    <p className="text-center text-sm text-gray-400 py-4">
      Built by{' '}
      <Link
        href="https://www.kinexisdigital.com/en"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-gray-300 hover:text-white transition-colors underline underline-offset-2 decoration-gray-500 hover:decoration-white"
      >
        Kinexis Digital
      </Link>
    </p>
  )
}
