import { getData } from "@/api/apiCrud"
import { getUsers } from "@/api/apiUser"
import { AuthContext } from "@/auth"
import { FormsUser } from "@/autoCall/components/Forms/formsUser"
import { columnsUsers } from "@/autoCall/components/Table/columnsUsers"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useCallback, useContext, useEffect, useState } from "react"


export const Users = () => {
  const [user, setUser] = useState([])
  const [clients, setClients] = useState([])
  const { logout } = useContext(AuthContext);  

  const fetchData = useCallback(async () => {
    try {
      const dataUser = await getUsers()
      const dataClients = await getData('Clientes')
      setUser(dataUser)
      setClients(dataClients)
    } catch (error) {
      console.log(error)
      logout()
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div>
      <FormsUser data={clients} onSuccess={fetchData}/>
      {/* Pasamos fetchData a las columnas */}
      <DataTable columns={columnsUsers(fetchData)} data={user} filter='user_id'/>
    </div>
  )
}