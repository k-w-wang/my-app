'use client'
import Link from 'next/link'

export default function NavLink({
  href,
  children,
}: {
  href: string
    children: React.ReactNode
}) {


  return (
    <Link
      key={href}
      href={href}
    >
      {children}
    </Link>
  )
}
