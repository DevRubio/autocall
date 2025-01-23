
export const getDisponibles = async()=>{
    try {
        const response = await fetch(`/api/disponible/read`)
        if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const addDisponible = async (data: object) => {
    
    try {
      const response = await fetch(`api/disponible/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
  
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`Failed to add data: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      throw new Error(`Failed to add data ${error}`);
    }
  };