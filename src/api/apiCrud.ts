export const getData = async (Table_Name: string) => {
  const url = "/api/read";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ TableName: Table_Name }),
    });
    if (!response.ok) {
      throw new Error(`Failed to get data ${Table_Name}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error", `Failed to get data ${Table_Name} ${error}`);
    throw new Error(`Failed to get data ${Table_Name} ${error}`);
  }
};

export const getDataByFilter = async (Table_Name: string, Partion_key: string, Row_key:string) => {
  const url = "/api/read";
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({TableName: Table_Name, PartitionKey: Partion_key, RowKey: Row_key }),
    });
    if (!response.ok) {
      throw new Error(`Failed to get data ${Table_Name}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("Error", `Failed to get data ${Table_Name} ${error}`);
    throw new Error(`Failed to get data ${Table_Name} ${error}`);
  }
};

export const addData = async (Table_Name: string, data: object) => {
  try {
    const response = await fetch(`api/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ TableName: Table_Name, Entity: data }),
    });
    if (!response.ok) {
      throw new Error(`Failed to add data ${Table_Name}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to add data ${Table_Name} ${error}`);
    throw new Error(`Failed to add data ${Table_Name} ${error}`);
  }
};

export const updateData = async (Table_Name: string, data: object) => {
  try {
    const response = await fetch(`api/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ TableName: Table_Name, data: data }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update data ${Table_Name}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Failed to update data ${Table_Name} ${error}`);
    throw new Error(`Failed to update data ${Table_Name} ${error}`);
  }
};

export const deleteData = async (
  Table_Name: string,
  partitionKey: string,
  rowKey: string
) => {
  const url = "api/delete";
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        TableName: Table_Name,
        PartitionKey: partitionKey,
        RowKey: rowKey,
      }),
    });
    if (!response.ok) {
      throw new Error(`Failed to delete data ${Table_Name}`);
    }
    return response;
  } catch (error) {
    console.log(`Failed to delete data ${Table_Name} ${error}`);
    throw new Error(`Failed to delete data ${Table_Name} ${error}`);
  }
};
