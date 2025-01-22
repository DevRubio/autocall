import { getDisponibles } from "@/api/apiDisponible"
import { FormsDiponible } from "@/components/Forms/formsDisponible"
import { columnsDisponibles } from "@/components/Table/columnsDisponibles"
import { DataTable } from "@/components/Table/data-table"
import { useEffect, useState } from "react"

export const Availables = () => {
  const [data, setData] = useState([])
  const clientes = [
    {
      PartitionKey: "Maria",
      RowKey: "Maria"
    }
  ]

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const data = await getDisponibles() 
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])
  
  return(
      <div>
          <FormsDiponible data={clientes}/>
          <DataTable columns={columnsDisponibles} data={data} filter='PartitionKey'/>
      </div>
  )
}
