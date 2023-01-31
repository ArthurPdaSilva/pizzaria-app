import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/pages/services/apiClient";
import { idText } from "typescript";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut(): void;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    // Limpar o cookie
    destroyCookie(undefined, "@nextauth.token");
    // Mandar para a tela de login
    Router.push("/");
  } catch {
    console.log("Error ao deslogar");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", { email, password });
      const { id, name, token } = response.data;
      setCookie(undefined, "@nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, //Expirar em 1 mês
        path: "/", //Quais caminhos terão acessos ao cookie
      });

      setUser({
        id,
        name,
        email,
      });

      //Passar para as próximas requisições o cookie
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      //Redirecionar para o dashboard
      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
