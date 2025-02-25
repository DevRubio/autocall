import { getData } from "@/api/apiCrud"
import { AuthContext } from "@/auth"
import { columnsLogsCalls } from "@/autoCall/components/Table/columnsLogsCalls"
import { DataTable } from "@/autoCall/components/Table/data-table"
import { useContext, useEffect, useState } from "react"


export const LogsCalls = () => {
  const [dataLogCalls, setDataLogCalls] = useState([])
  const { logout } = useContext(AuthContext);  

  useEffect(()=>{
    const fetchData = async()=>{
      try {
        const dataLogCalls = await getData('RegistroLlamadas') 
        setDataLogCalls(dataLogCalls)
      } catch (error) {
        console.log(error)
        logout()
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
