/**
 * Order confirmation page displayed after successful checkout.
 * Presents a simple message and link back home.
 */
import Link from 'next/link'
import type { Metadata } from 'next'

/** Metadata for the success page. */
export const metadata: Metadata = {
  title: 'Order Success',
  description: 'Order confirmation'
}

export default function OrderSuccessPage() {
  return (
    <main className="p-4 space-y-4">
      {/* <auto-gen start: crew-site-mimicker> */}
      <h1 className="text-xl font-bold">Order Successful</h1>
      <p>Thank you for your purchase.</p>
      <Link href="/">Return Home</Link>
      {/* <auto-gen end: crew-site-mimicker> */}
    </main>
  )
}
