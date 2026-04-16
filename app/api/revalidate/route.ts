import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  try {
    // Revalidate all pages (layout-level covers everything)
    revalidatePath('/', 'layout')

    // Also revalidate specific high-traffic paths explicitly
    revalidatePath('/')
    revalidatePath('/taubenabwehr')
    revalidatePath('/ueber-uns')
    revalidatePath('/standorte')
    revalidatePath('/karriere')
    revalidatePath('/superexpel')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json(
      { message: 'Error revalidating', error: String(err) },
      { status: 500 }
    )
  }
}

// Allow GET for easy manual testing
export async function GET(req: NextRequest) {
  return POST(req)
}
