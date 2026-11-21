import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  if (!slug || slug.length === 0) {
    return new NextResponse('Not Found', { status: 404 });
  }

  const filename = slug[slug.length - 1];
  const filePath = path.join(process.cwd(), 'public', 'images', filename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse('File Not Found', { status: 404 });
  }

  const ext = path.extname(filename).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
