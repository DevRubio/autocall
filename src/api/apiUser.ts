import { User } from "@/autoCall/components/Interfaces/User";
import Cookies from 'js-cookie';

const URL_API = import.meta.env.VITE_API_URL;

if(!URL_API){
  console.log("Error", "No se ha encontrado la URL de la API")
  throw new Error("No se ha encontrado la URL de la API")
}

export const authUser = async (user: string, pass: string) => {
  try {
    const response = await fetch(
      `${URL_API}/auth?code=oscar6frw45`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",         
        },
        body: JSON.stringify({ user_id: user, password: pass }),
      }
    );
    if (!response.ok) {
      throw new Error("Usuario o Contraseña incorrecta");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed autenticate user ${error}`);
  }
};

export const addUser = async (user: User) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(
      `${URL_API}/registro?code=oscar6frw45`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ...user }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed add user ${error}`);
  }
};

export const getUsers = async () => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(
      `${URL_API}/get?code=oscar6frw45`,
      {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to get data Users ${error}`);
  }
};

export const getUserById = async(user:string)=>{
  const token = Cookies.get('token');
  try {
    const response = await fetch(`${URL_API}/get?code=oscar6frw45`,
      {
        headers: {
          "Content-Type" : "application/json",
          authorization: `Bearer ${token}`
        },
        body: JSON.stringify({user_id: user})
      }      
    )
    if (!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const result = await response.json()
    return result
  } catch (error) {
    console.log("Error", `Failed to get user ${error}`);
    throw new Error(`Failed to get user ${error}`);
  }
}

export const deleteUser = async (user: string) => {
  const token = Cookies.get('token');  
  try {
    const response = await fetch(
      `${URL_API}/delete?code=oscar6frw45`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",          
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: user}),
      }
    );
    if (!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed delete user ${error}`);
  }
};
