import { createContext, ReactNode, useState, useEffect } from "react";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import Router from "next/router";
import { api } from "@/pages/services/apiClient";
import { idText } from "typescript";
import { toast } from "react-toastify";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signUp: (credentials: SignUnProps) => Promise<void>;
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

interface SignUnProps {
  name: string;
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

  useEffect(() => {
    const { "@nextauth.token": token } = parseCookies();
    if (token) {
      api
        .get("/me")
        .then((r) => {
          const { id, name, email } = r.data;
          setUser({
            id,
            name,
            email,
          });
        })
        .catch(() => signOut());
    }
  }, []);

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
      toast.success("Logado com sucesso!");
      //Redirecionar para o dashboard
      Router.push("/dashboard");
    } catch (error) {
      toast.error("ERRO ao cadastrar");
    }
  }

  async function signUp({ name, email, password }: SignUnProps) {
    try {
      await api.post("/users", { name, email, password });
      toast.success("Cadastrado com sucesso!");
      Router.push("/");
    } catch (error) {
      toast.error("Erro ao cadastrar");
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
