import { NextResponse } from 'next/server'
import { products } from '../../../../lib/products'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const product = products.find(p => p.id === params.id)
  if (!product) {
    return new NextResponse('Not found', { status: 404 })
  }
  return NextResponse.json(product)
}
