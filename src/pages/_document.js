import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
      </Head>
      <body className="min-h-dvh max-h-dvh">
        <Main />
        <NextScript />
        <script src="https://unpkg.com/@googlemaps/js-api-loader@1.x/dist/index.min.js"></script>
      </body>
    </Html>
  );
}
