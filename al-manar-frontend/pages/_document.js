import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* ✅ Custom Title for all pages */}
        <title>Al Manar School</title>

        {/* ✅ SEO Meta Tags */}
        <meta
          name="description"
          content="Welcome to Al Manar School - Quality Education for All"
        />

        {/* ✅ Custom Favicon */}
        <link rel="icon" href="/assets/LOGO.png" />

        {/* Optional: Apple Touch Icon for iOS */}
        <link rel="apple-touch-icon" href="/assets/LOGO.png" />

        {/* Optional: Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#00594F" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
