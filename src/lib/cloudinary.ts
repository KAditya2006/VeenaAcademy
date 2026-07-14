export function cloudinaryImage(src: string | undefined, options: { width?: number; height?: number; crop?: string; quality?: string } = {}) {
  if (!src || !src.includes("res.cloudinary.com") || !src.includes("/upload/")) return src;
  const transforms = [`f_auto`, `q_${options.quality ?? "auto"}`];
  if (options.width) transforms.push(`w_${options.width}`);
  if (options.height) transforms.push(`h_${options.height}`);
  if (options.crop) transforms.push(`c_${options.crop}`);
  return src.replace("/upload/", `/upload/${transforms.join(",")}/`);
}
