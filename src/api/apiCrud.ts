import Cookies from 'js-cookie';

const URL_API = import.meta.env.VITE_API_URL;

if(!URL_API){
  console.log("Error", "No se ha encontrado la URL de la API")
  throw new Error("No se ha encontrado la URL de la API")
}

export const getData = async (Table_Name: string) => {

  const token = Cookies.get('token');  
  
  try {
    const response = await fetch(`${URL_API}/entity?code=oscar6frw45`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ table_name: Table_Name }),
    });
    if(!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to get data on table ${Table_Name} ${error}`);
  }
};

export const getDataByFilter = async (Table_Name: string, Partion_key: string, Row_key:string) => {
  const token = Cookies.get('token'); 
  try {
    const response = await fetch(`${URL_API}/read`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({TableName: Table_Name, PartitionKey: Partion_key, RowKey: Row_key }),
    });
    if(!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to get data on table ${Table_Name} ${error}`);
  }
};

export const addData = async (Table_Name: string, data: object) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(`${URL_API}/entity?code=oscar6frw45`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ table_name: Table_Name, entity: data }),
    });
    if(!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Failed to add data on table ${error}`);
  }
};

export const updateData = async (Table_Name: string, data: object) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(`${URL_API}/update?code=oscar6frw45`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ TableName: Table_Name, data: data }),
    });
    if(!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    return response.json();
  } catch (error) {
    throw new Error(`Failed to update data on table ${Table_Name} ${error}`);
  }
};

export const deleteData = async (
  Table_Name: string,
  partitionKey: string,
  rowKey: string
) => {
  const token = Cookies.get('token');
  
  try {
    const response = await fetch(`${URL_API}/entity?code=oscar6frw45`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        table_name: Table_Name,
        partition_key: partitionKey,
        row_key: rowKey,
      }),
    });
    if(!response.ok) {
      const errorData = await response.json()      
      throw new Error(`${errorData.message}`);
    }
    return response;
  } catch (error) {
    throw new Error(`Failed to delete data on table ${Table_Name} ${error}`);
  }
};
