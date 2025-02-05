import { getData } from "@/api/apiCrud"
import { getUsers } from "@/api/apiUser"
import { FormsUser } from "@/autoCall/components/Forms/formsUser"
import { columnsUsers } from "@/autoCall/components/Table/columnsUsers"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useEffect, useState } from "react"

export const Users = () => {
  const [user, setUser] = useState([])
  const [clients, setClients] = useState([])

  useEffect(()=>{
    const fetData = async()=>{
      try {
        const dataUser = await getUsers()
        const dataClients = await getData('Clientes')
        setUser(dataUser)
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
