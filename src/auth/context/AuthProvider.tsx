import { ReactNode, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { authUser, validateToken } from "@/api/apiUser";
import { generateToken } from '../../api/apiUser';

// Función para inicializar el estado
const init = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const token = localStorage.getItem("token") || null;
  
  return {
    logged: !!user,
    user: user,
    token: token
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    // Verificar si hay un token válido al recargar la app
    if (authState.token) {
      validateToken(authState.token)
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          logout();
        }
      })
      .catch(() => logout());
    }
  }, [authState.token]);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    try {      
      const dataUser = await authUser(username, password);      

      if (!dataUser) {
        throw new Error("Credenciales incorrectas");
      }
      
      const user = {        
        user: dataUser.user,
        Rol: dataUser.Rol 
      };

      const token = await generateToken()

      localStorage.setItem("user", JSON.stringify(dataUser.user));
      localStorage.setItem("token", token);
     

      dispatch({ type: types.login, payload: { user, token } });

      return true;
    } catch (error) {
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    dispatch({ type: types.logout });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
