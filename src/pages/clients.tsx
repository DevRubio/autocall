import { getCliente } from "@/api/apiClient"
import { FormsClient } from "@/components/Forms/formsClient"
import { columnsClients } from "@/components/Table/columnsClients"
import { DataTable } from "@/components/Table/data-table"
import { useEffect, useState } from "react"


export const Clients = () => {
    const [dataClients, setDataclients] = useState([])
  
    useEffect(()=>{
      const fetchData = async()=>{
        try {
          const dataClient = await getCliente() 
          setDataclients(dataClient)
        } catch (error) {
          console.log(error)
        }
      }
      fetchData()
    },[])
  return (
    <div>
      <FormsClient/>
      <DataTable columns={columnsClients} data={dataClients} filter='PartitionKey'/>
</div>
  )
}
