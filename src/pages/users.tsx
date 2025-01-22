import { getCliente } from "@/api/apiClient"
import { getUser } from "@/api/apiUser"
import { FormsUser } from "@/components/Forms/formsUser"
import { columnsUsers } from "@/components/Table/columnsUsers"
import { DataTable } from "@/components/Table/data-table"
import { useEffect, useState } from "react"

export const Users = () => {
  const [user, setUser] = useState([])
  const [clients, setClients] = useState([])

  useEffect(()=>{
    const fetData = async()=>{
      try {
        const data = await getUser()
        const dataClients = await getCliente()
        setUser(data)
        setClients(dataClients)
      } catch (error) {
        console.log(error)
      }
    }
    fetData()
  },[])
  return (
    <div>
      <FormsUser data={clients}/>           
      <DataTable columns={columnsUsers} data={user} filter='user_id'/>
    </div>
  )
}
