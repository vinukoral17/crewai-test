/**
 * Product detail route.
 * Server component that loads product data and delegates rendering to a client component with gallery and cart actions.
 * Used for /product/[id].
 */
import type { Metadata } from 'next'
import ProductDetail from '../../../components/organisms/ProductDetail'
import { getProduct } from '../../../lib/products'

/** Generate minimal SEO metadata based on the product id. */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = getProduct(params.id)
  return { title: product ? product.name : 'Product' }
}

interface PageProps {
  params: { id: string }
}

export default function ProductPage({ params }: PageProps) {
  const product = getProduct(params.id)
  if (!product) {
    return <main className="p-4">Product not found</main>
  }
  return (
    <main className="p-4">
      {/* <auto-gen start: crew-site-mimicker> */}
      <ProductDetail product={product} />
      {/* <auto-gen end: crew-site-mimicker> */}
    </main>
  )
}
