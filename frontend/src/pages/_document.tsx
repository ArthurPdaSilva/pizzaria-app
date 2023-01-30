import { Html, Head, Main, NextScript } from "next/document";

// É basicamente o public, pode trocar o icon e tudo
export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="shortcut icon" href="logo.svg" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
