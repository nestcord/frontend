/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    // Generar el ID de compilación utilizando el hash de Git
    const buildId = process.env.GIT_HASH || 'default-build-id'; // Valor predeterminado si no se define GIT_HASH

    // Hacer un console.log del buildId
    console.log(`Generated Build ID: ${buildId}`);

    return buildId;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cewdbasydlltpsvtnuvr.supabase.co',
        port: '',
        pathname: '/**'
      }
    ]
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
