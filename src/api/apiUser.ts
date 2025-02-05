export const authUser = async (user: string, pass: string) => {
  try {
    const response = await fetch(
      "/auth?code=tNvorc19isHdagBgo4lpyiDwg9bQdIuMo_tlEBJdD-UvAzFuCueW5g%3D%3D",
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

export const getUsers = async () => {
  try {
    const response = await fetch(
      "/get?code=tNvorc19isHdagBgo4lpyiDwg9bQdIuMo_tlEBJdD-UvAzFuCueW5g%3D%3D",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to get data Users`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error", `Failed to get data Users ${error}`);
    throw new Error(`Failed to get data Users ${error}`);
  }
};

export const deleteUser = async (user: string) => {
  const token = await generateToken()
  try {
    const response = await fetch(
      "/delete?code=tNvorc19isHdagBgo4lpyiDwg9bQdIuMo_tlEBJdD-UvAzFuCueW5g%3D%3D",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",          
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: user}),
      }
    );
    if (!response.ok) {
      throw new Error("Failed delete user");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Failed delete user ${error}`);
  }
};

export const generateToken = async () => {
  try {
    const response = await fetch("/token?code=teamdevautoCall", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: "EDWARQC3", password: "soyedwar1234" }),
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

export const validateToken = async (tokenValidate: string) => {
  try {
    const response = await fetch("/validToken?code=teamdevautoCall", {
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
