import "../styles/globals.scss";
import type { AppProps } from "next/app";

// Renderiza todos as paginas
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
