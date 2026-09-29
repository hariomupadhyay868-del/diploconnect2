import { createClient } from './client';

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function uploadMediaFile(
  file: File,
  bucket: 'avatars' | 'banners' | 'post-media' | 'project-media' | 'certificates' | 'event-media'
): Promise<{ url: string | null; error: string | null }> {
  if (file.size > MAX_FILE_SIZE) {
    return { url: null, error: 'File size exceeds 5MB limit.' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { url: null, error: 'Invalid file format. Please upload JPG, PNG, WEBP, or GIF.' };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

  if (uploadError) {
    return { url: null, error: uploadError.message };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return { url: data.publicUrl, error: null };
}
