import { FormsDiponible } from "@/components/Forms/formsDisponible"
import { columnsDisponibles } from "@/components/Table/columnsDisponibles"
import { DataTable } from "@/components/Table/data-table"

export const Availables = () => {
  //const clientes = await getClients()
  const datos = [{
    "PartitionKey": "ECOPETROL_Monitoreo",
    "RowKey": "02ba8c13-bb91-40d4-8b77-665b9a75e395",
    "tower": "Monitoreo",
    "nombre_disponible": "Juan",
    "celular": 3104845200,
    "celular_respaldo": 0,
    "correo": "ofrubio0@gmail.com",
    "inicioDispo": new Date("2025-01-01T05:00:00.000Z"),
    "finDispo": new Date("2025-01-01T05:00:00.000Z"),
    "excluir": ""
  }]
  const clientes = [
    {
      PartitionKey: "Maria",
      RowKey: "Maria"
    }
  ]
  //const datos = await getDisponibles()
  
  return(
      <div>
          <FormsDiponible data={clientes}/>
          <DataTable columns={columnsDisponibles} data={datos} filter='PartitionKey'/>
      </div>
  )
}
