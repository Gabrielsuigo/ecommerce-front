
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "store.storeimages.cdn-apple.com",
      "images.unsplash.com",
      "i.imgur.com",
      "res.cloudinary.com",
      // agregá los dominios de donde vengan tus productos
    ],
  },
    eslint: {
    ignoreDuringBuilds: true, // 🔥 evita que el build falle por warnings
  },
};
export default nextConfig;
