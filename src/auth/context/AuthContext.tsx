import { createContext } from "react";

interface User {
  Rol: string;
  user: string;
}

interface AuthContextProps {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user?: User | null;
  token?: string | null;
  logged: boolean;

}

// Contexto de autenticación
export const AuthContext = createContext<AuthContextProps>({
  login: async () => {
    return false;
  },
  logout: () => {},
  user: null,
  token: null,
  logged: false
});
