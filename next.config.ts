import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@react-pdf/renderer", "unpdf"],
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
