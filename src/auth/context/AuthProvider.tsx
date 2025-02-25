import { ReactNode, useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";
import { authUser } from "@/api/apiUser";
import { validateToken } from "@/api/apiToken";
import Cookies from 'js-cookie';

// Función para inicializar el estado
const init = () => {
  const dataCookie = JSON.parse(Cookies.get('user') || "null")
  const user = dataCookie?.user || null;
  const token = dataCookie?.token || null;
 

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
    }else{
      logout();
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
      Rol: dataUser.Rol,
      Token: dataUser.token
    };

    // Configurar cookies con opciones de seguridad
    Cookies.set('user', JSON.stringify(dataUser), {
      secure: true,
      sameSite: 'strict',
      expires: 1 // 1 día
    });

    Cookies.set('token', dataUser.token, {
      secure: true,
      sameSite: 'strict',
      expires: 1
    });
    

    dispatch({ type: types.login, payload: { user } });

    return true;
  } catch (error) {
    // Limpiar cookies en caso de error
    Cookies.remove('user');
    Cookies.remove('token');
    return false;
  }
};

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove('user');
    Cookies.remove('token');

    dispatch({ type: types.logout });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
