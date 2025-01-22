export const getCliente = async()=>{
    try {
        const response = await fetch("api/clientes/read")
        if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}

export const addClient = async(data:object)=>{    
    try {
        const response = await fetch(`api/clientes/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error('Failed add client')
        }
        return response.json()
    } catch (error) {
        console.error(`Failed add client ${error}`)
    }
}