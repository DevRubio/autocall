import { getData } from "@/api/apiCrud"
import { getUsers } from "@/api/apiUser"
import { AuthContext } from "@/auth"
import { usePermissions } from "@/auth/Permissions/usePermissions"
import { FormsUser } from "@/autoCall/components/Forms/formsUser"
import { columnsUsers } from "@/autoCall/components/Table/columnsUsers"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useCallback, useContext, useEffect, useState } from "react"


export const Users = () => {
  const [user, setUser] = useState([])
  const [clients, setClients] = useState([])
  const { logout } = useContext(AuthContext);
  const { hasPermission } = usePermissions()  

  const fetchData = useCallback(async () => {
    try {
      const dataUser = await getUsers()
      setUser(dataUser)
      if(hasPermission('users','create')){
        const dataClients = await getData('Clientes')
        setClients(dataClients)
      }
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
      {hasPermission('users','create')&&(
        <FormsUser data={clients} onSuccess={fetchData}/>
      )}      
      <DataTable columns={columnsUsers(fetchData)} data={user} filter='user_id'/>
    </div>
  )
}