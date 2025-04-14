// app/api/images/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { getDbAndReqBody } from '@/lib/utils/api-routes';

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null);
    const url = new URL(req.url);
    const imgId = url.searchParams.get('id');

    if (!imgId) {
      return new NextResponse(null, {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const image = await db.collection('images').findOne({ imgId });

    if (!image) {
      return new NextResponse(null, {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Если хранится публичный URL (например, из Cloudinary), перенаправь на него
    if (image.url && !image.dataUrl) {
      return NextResponse.redirect(image.url);
    }

    // Извлечём Base64-данные
    const base64Data = image.dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');

    // Определи Content-Type на основе mime-типа из dataUrl
    const mimeTypeMatch = image.dataUrl.match(/^data:image\/(\w+);base64,/);
    const mimeType = mimeTypeMatch ? `image/${mimeTypeMatch[1]}` : 'image/jpeg';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Length': imageBuffer.length.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*', // Для устранения CORS-проблем
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export const dynamic = 'force-dynamic';