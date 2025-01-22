import { getLogCalls } from "@/api/apiLogCalls"
import { columnsLogsCalls } from "@/components/Table/columnsLogsCalls"
import { DataTable } from "@/components/Table/data-table"
import { useEffect, useState } from "react"


export const LogsCalls = () => {
  const [dataLogCalls, setDataLogCalls] = useState([])

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const dataLogCalls = await getLogCalls() 
        setDataLogCalls(dataLogCalls)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  },[])

  return (
    <div>
       <DataTable columns={columnsLogsCalls} data={dataLogCalls} filter='PartitionKey'/>
    </div>
  )
}
