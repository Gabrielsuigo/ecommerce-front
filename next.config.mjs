/** @type {import('next').NextConfig} */
const nextConfig = {
      eslint: {
    // ❗ Esto hace que los warnings no frenen el build en Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
