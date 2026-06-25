import cloudinary from '../src/lib/cloudinary';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { file, folder, publicId } = body;

    if (!file) {
      return new Response(JSON.stringify({ error: 'file is required (base64 data URL)' }), { status: 400 });
    }

    const uploadOptions: Record<string, string> = {
      folder: folder || 'leish/portfolio',
      resource_type: 'image',
    };
    if (publicId) uploadOptions.public_id = publicId;

    const result = await cloudinary.uploader.upload(file, uploadOptions);

    return new Response(JSON.stringify({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
