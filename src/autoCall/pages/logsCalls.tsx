import { getData } from "@/api/apiCrud"
import { AuthContext } from "@/auth"
import { columnsLogsCalls } from "@/autoCall/components/Table/columnsLogsCalls"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useContext, useEffect, useState } from "react"
import { LogCalls } from '@/autoCall/components/Interfaces/LogCalls';


export const LogsCalls = () => {
  const [dataLogCalls, setDataLogCalls] = useState([])
  const { logout } = useContext(AuthContext);  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const dataLogCalls = await getData('RegistroLlamadas')
        const newData = dataLogCalls.map(({PartitionKey: Torre, Date: Fecha, LogContent, Name: Disponible, Reason, status: Estado}:LogCalls)=>{
          return {Torre, Fecha, LogContent, Disponible, Reason, Estado}
        })
        setDataLogCalls(newData)
      } catch (error) {
        console.log(error)
        logout()
      }
    }
    fetchData()
  },[])

  return (
    <div>
       <DataTable columns={columnsLogsCalls} data={dataLogCalls} filter='Torre'/>
    </div>
  )
}
