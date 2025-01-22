export const getUser = async()=>{
    try {
        const response = await fetch("api/usuarios/read")
        if(!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        return result
    } catch (error) {
        console.log(error)
    }
}