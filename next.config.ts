import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin({
  requestConfig: "./src/i18n/request.ts",
  // Next.js 16.3.3's build-time type runner misreads arbitrary-extension
  // declarations. Development still generates exact ICU argument types; the
  // independent `pnpm typecheck` gate validates the production source.
  experimental: process.env.NODE_ENV === "production"
    ? undefined
    : {createMessagesDeclaration: "./messages/es.json"}
});

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  // The CLI checker can return an empty captured `--showConfig` stream in
  // constrained build environments. Next.js 16.3.3 documents the compiler API
  // as the supported opt-out for TypeScript 5/6 projects.
  experimental: {useTypeScriptCli: false}
};

export default withNextIntl(nextConfig);
