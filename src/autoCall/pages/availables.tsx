import { getData } from "@/api/apiCrud"
import { AuthContext } from "@/auth"
import { FormsDiponible } from "@/autoCall/components/Forms/formsDisponible"
import { columnsDisponibles } from "@/autoCall/components/Table/columnsDisponibles"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useCallback, useContext, useEffect, useState } from "react"

export const Availables = () => {
  const [data, setData] = useState([])
  const [dataClients, setDataclients] = useState([])
  const { logout } = useContext(AuthContext);  

  const fetchData = useCallback(async ()=>{
    try {
      const dataDisponible = await getData('disponibles') 
      setData(dataDisponible)
      const dataClient = await getData('Clientes')
      setDataclients(dataClient)
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
          <FormsDiponible data={dataClients} onSuccess={fetchData}/>
          <DataTable columns={columnsDisponibles(fetchData)} data={data} filter='PartitionKey'/>
      </div>
  )
}
