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
        const response = await fetch(`/api/disponible/read`)
        if(!response.ok){
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        const result = await response.json()
        setData(result)
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
