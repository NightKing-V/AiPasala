import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// frontend/next.config.js
module.exports = {
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000,            // poll every second
      aggregateTimeout: 300, // debounce time
    };
    return config;
  },
};


export default nextConfig;
