import { getData } from "@/api/apiCrud"
import { FormsClient } from "@/autoCall/components/Forms/formsClient"
import { columnsClients } from "@/autoCall/components/Table/columnsClients"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useEffect, useState } from "react"


export const Clients = () => {
    const [dataClients, setDataclients] = useState([])
  
    useEffect(()=>{
      const fetchData = async()=>{
        try {
          const dataClient = await getData('Clientes') 
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
