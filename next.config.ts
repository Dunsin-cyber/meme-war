import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: false,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  experimental: {
    esmExternals: true, // Enable ESM support for dependencies
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_GATEWAY_URL: process.env.NEXT_PUBLIC_GATEWAY_URL,
    NEXT_PUBLIC_ENABLE_TESTNETS: process.env.NEXT_PUBLIC_ENABLE_TESTNETS,
    // NEXT_PUBLIC_PINATA_JWT: process.env.NEXT_PUBLIC_PINATA_JWT,
  },
  transpilePackages: [
    "antd",
    "@ant-design/plots",
    "@ant-design/icons",
    "@ant-design/icons-svg",
    "@ant-design/pro-components",
    "@ant-design/pro-layout",
    "@ant-design/pro-list",
    "@ant-design/pro-descriptions",
    "@ant-design/pro-form",
    "@ant-design/pro-skeleton",
    "@ant-design/pro-field",
    "@ant-design/pro-utils",
    "@ant-design/pro-provider",
    "@ant-design/pro-card",
    "@ant-design/pro-table",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip",
    "rc-input",
  ],
  images: {
    domains: [""],
  },
};

export default nextConfig;
