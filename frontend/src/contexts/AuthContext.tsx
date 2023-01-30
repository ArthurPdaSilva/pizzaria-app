import { createContext, ReactNode, useState } from "react";

interface AuthContextData {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
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

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const isAuthenticated = !!user;

  async function signIn() {
    alert("Clicou");
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
