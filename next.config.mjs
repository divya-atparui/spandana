/** @type {import('next').NextConfig} */
const nextConfig = {
    // experimental: {
    //   // The experimental feature "experimental.dynamicIO" can only be enabled when using the latest canary version of Next.js
    //   // dynamicIO: true,
    //   staleTimes: {
    //     dynamic: 5000,
    //   },
    // },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    output: "standalone",
    env: {
      API_URL: process.env.API_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'spandana-api.atparui.com',
          port: '',
          pathname: '/images/**',
        },
        {
          protocol: 'https',
          hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8006',
          pathname: '/images/**',
        },
        {
          protocol : 'http',
          hostname: 'www.asaptech.ai',
          port: '',
          pathname: '/sh/images/**',
        },
        {
          protocol : 'https',
          hostname: "images.unsplash.com",
          port : "",
          pathname: "/**",
        }, 
        {
          protocol : 'https',
          hostname: "example.com",
          port : "",
          pathname: "/images/**",
        }
      ],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    compress:false,
   
    headers: async () => {
      return [
        {
          source: '/:path*',
          headers: [
            {
              key: 'x-forwarded-host',
              value: 'spandana.atparui.com',
            },
          ],
        },
      ];
    },
    // Existing commented out sections
    // async rewrites() {
    //   return [
    //     {
    //       source: "/departments/:id/:slug",
    //       destination: "/departments/:slug",
    //     },
    //   ];
    // },
    // typescript: {
    //   ignoreBuildErrors: true,
    // },
  };
  
  export default nextConfig;