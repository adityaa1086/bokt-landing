import { NextRequest, NextResponse } from 'next/server'

// Google Places (New) API key
const API_KEY = 'AIzaSyAM_QXuJa5D7ZYKB-RkBAuU9eOEDfAMIvU'

export async function POST(req: NextRequest) {
  const { query } = await req.json()
  if (!query) return NextResponse.json({ error: 'No query' }, { status: 400 })

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': [
        'places.displayName',
        'places.rating',
        'places.userRatingCount',
        'places.formattedAddress',
        'places.regularOpeningHours',
        'places.photos',
        'places.websiteUri',
        'places.nationalPhoneNumber',
        'places.types',
        'places.businessStatus',
      ].join(','),
    },
    body: JSON.stringify({ textQuery: query }),
  })

  const data = await res.json()
  const place = data.places?.[0]

  if (!place) {
    return NextResponse.json({ found: false })
  }

  return NextResponse.json({
    found: true,
    name: place.displayName?.text ?? query,
    rating: place.rating ?? 0,
    reviewCount: place.userRatingCount ?? 0,
    address: place.formattedAddress ?? '',
    hasHours: !!(place.regularOpeningHours),
    hasWebsite: !!(place.websiteUri),
    hasPhone: !!(place.nationalPhoneNumber),
    hasPhotos: !!(place.photos?.length),
    photoCount: place.photos?.length ?? 0,
  })
}
