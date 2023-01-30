import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthContext";

// Renderiza todos as paginas
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
