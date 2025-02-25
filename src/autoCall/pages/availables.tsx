import { getData } from "@/api/apiCrud"
import { AuthContext } from "@/auth"
import { FormsDiponible } from "@/autoCall/components/Forms/formsDisponible"
import { columnsDisponibles } from "@/autoCall/components/Table/columnsDisponibles"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useCallback, useContext, useEffect, useState } from "react"
import { Disponible } from "../components/Interfaces/Disponible"
import { usePermissions } from "@/auth/Permissions/usePermissions"

export const Availables = () => {
  const [data, setData] = useState([])
  const [dataClients, setDataclients] = useState([])
  const { logout } = useContext(AuthContext);  
  const {hasPermission} = usePermissions()

  const fetchData = useCallback(async ()=>{
    try {
      const dataDisponible = await getData('disponibles') 
      const newData = dataDisponible.map(({ PartitionKey: Torre, RowKey, celular, celular_respaldo, correo, excluir: Alertas_Excluidas, finDispo: Fin_Disponibilidad, inicioDispo:Inicio_Disponibilidad, nombre_disponible }: Disponible) => {
        return { Torre, RowKey, celular, celular_respaldo, correo, Alertas_Excluidas, Fin_Disponibilidad, Inicio_Disponibilidad, nombre_disponible }
      })
      setData(newData)
      if(hasPermission('availables', 'create')) {
        const dataClient = await getData('Clientes')
        setDataclients(dataClient)        
      }
    } catch (error) {
      console.log(error)
      logout()
    }  
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  return(
      <div>
          
        {hasPermission('availables', 'create') && (
          <FormsDiponible 
            data={dataClients} 
            onSuccess={fetchData}
          />
        )}
          <DataTable columns={columnsDisponibles(fetchData)} data={data} filter='Torre'/>
      </div>
  )
}
