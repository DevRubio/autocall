import { getData } from "@/api/apiCrud"
import { FormsDiponible } from "@/components/Forms/formsDisponible"
import { columnsDisponibles } from "@/components/Table/columnsDisponibles"
import { DataTable } from "@/components/Table/data-table"
import { useEffect, useState } from "react"

export const Availables = () => {
  const [data, setData] = useState([])
  const [dataClients, setDataclients] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const dataDisponible = await getData('Disponibles') 
        setData(dataDisponible)
        const dataClient = await getData('Clientes')
        setDataclients(dataClient)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  return(
      <div>
          <FormsDiponible data={dataClients}/>
          <DataTable columns={columnsDisponibles} data={data} filter='PartitionKey'/>
      </div>
  )
}
