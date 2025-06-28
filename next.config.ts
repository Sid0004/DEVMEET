import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(
  {
    images: {
      domains: ['avatars.githubusercontent.com'],
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }
);

export default nextConfig;
