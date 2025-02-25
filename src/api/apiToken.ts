
export const generateToken = async (user:string, pass: string) => {
    try {
      const response = await fetch("/token?code=oscar6frw45", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user, password: pass }),
      });
      if (!response.ok) {
        throw new Error("Usuario o Contraseña incorrecta");
      }
      const { token } = await response.json();
      return token;
    } catch (error) {
      throw new Error(`Failed generateToken ${error}`);
    }
  };
  
  export const validateToken = async (tokenValidate: string | undefined) => {
    
    try {
      const response = await fetch("/validToken?code=oscar6frw45", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: tokenValidate }),
      });
      
      if (!response.ok) {
        throw new Error("Usuario o Contraseña incorrecta");
      }
  
      return response;
    } catch (error) {
      throw new Error(`Failed generateToken ${error}`);
    }
  };  