import { Router, type Router as RouterType } from 'express';
import { existsSync, mkdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const router: RouterType = Router();
const UPLOAD_DIR = join(process.cwd(), 'uploads');

// Ensure upload dir exists
if (!existsSync(UPLOAD_DIR)) {
  mkdirSync(UPLOAD_DIR, { recursive: true });
}

const MAX_SIZE_MB = 10;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

router.post('/image', async (req, res, next) => {
  try {
    const contentType = req.headers['content-type'] || '';

    // Handle raw body upload (multipart will be added with multer later)
    const baseType = contentType.split(';')[0].toLowerCase();
    if (baseType === 'application/octet-stream' || ALLOWED_TYPES.includes(baseType)) {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.from(chunk));
      }
      const buffer = Buffer.concat(chunks);

      if (buffer.length > MAX_SIZE_MB * 1024 * 1024) {
        res.status(413).json({ error: `File exceeds ${MAX_SIZE_MB}MB limit` });
        return;
      }

      const imageId = randomUUID();
      const ext = contentType.includes('png')
        ? 'png'
        : contentType.includes('webp')
          ? 'webp'
          : 'jpg';
      const fileName = `${imageId}.${ext}`;
      const filePath = join(UPLOAD_DIR, fileName);

      await writeFile(filePath, buffer);

      res.json({
        imageId,
        url: `/uploads/${fileName}`,
        width: 0, // Would need image processing lib to detect
        height: 0,
      });
      return;
    }

    res.status(400).json({ error: 'Unsupported content type. Send image as binary or multipart.' });
  } catch (err) {
    next(err);
  }
});

export default router;
