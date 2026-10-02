import Link from 'next/link'
import { cn } from '@/lib/utils'

function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#12372c" />
      <path
        d="M7.5 21.5c3.2-.4 5.2-6.2 8.2-6.2 2.4 0 3.3 3.6 6.1-5.6"
        fill="none"
        stroke="#f4f1ea"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="23.6" cy="8.2" r="1.7" fill="#6ee7b7" />
    </svg>
  )
}

export function Logo({
  size = 'md',
  tone = 'ink',
  className,
}: {
  size?: 'md' | 'lg'
  tone?: 'ink' | 'light'
  className?: string
}) {
  const grande = size === 'lg'

  return (
    <Link href="/" className={cn('inline-flex items-center gap-2.5', className)}>
      <BrandMark className={grande ? 'h-11 w-11' : 'h-8 w-8'} />
      <span className="flex items-baseline gap-1.5">
        <span
          className={cn(
            'font-heading leading-none tracking-tight',
            grande ? 'text-3xl' : 'text-[1.35rem]',
            tone === 'light' ? 'text-[#f4f1ea]' : 'text-[#12372c]'
          )}
        >
          Fin
        </span>
        <span
          className={cn(
            'font-semibold uppercase tracking-[0.16em]',
            grande ? 'text-xs' : 'text-[0.68rem]',
            tone === 'light' ? 'text-emerald-300' : 'text-emerald-800'
          )}
        >
          Bootcamp
        </span>
      </span>
    </Link>
  )
}
