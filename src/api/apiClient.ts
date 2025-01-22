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