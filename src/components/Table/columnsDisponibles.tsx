"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { Disponible } from "@/Interfaces/Disponible"
import { Button } from "@/components/ui/button"
import { SorterIcon } from "./utils"

function formatCell(cellPhone:number){
    const formatted = cellPhone
    ? cellPhone
          .toString()
          .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") 
    : cellPhone;
    
    return formatted
}


export const columnsDisponibles: ColumnDef<Disponible>[] = [
  {
    accessorKey: "PartitionKey",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Torre
            <SorterIcon isSorted={column.getIsSorted()}/>
          </Button>
        )
      },
  },
  {
    accessorKey: "nombre_disponible",
    header: "Nombre"
  },
  {
    accessorKey: "celular",
    header: "Celular",
    cell: ({ row }) => {
        const cellPhone = row.getValue("celular");   
        return <div>{formatCell(cellPhone as number)}</div>;
    }
  },
  {
    accessorKey: "celular_respaldo",
    header: "Celular 2",
    cell: ({ row }) => {
        const cellPhone = row.getValue("celular_respaldo");   
        return <div>{formatCell(cellPhone as number)}</div>;
    }
  },
  {
    accessorKey: "correo",
    header: "Correo"
  },
  {
    accessorKey: "excluir",
    header:"Alertas Excluidas"
  },
  {
    accessorKey: "inicioDispo",
    header:"Inicio Disponibilidad",
    cell: ({ row }) => {
        const date = row.getValue("inicioDispo");
        return <div>{format(date as Date, "dd/MM/yyyy")}</div>;
    }
  },
  {
    accessorKey: "finDispo",
    header:"Fin Disponibilidad",
    cell: ({row})=>{
      const date = row.getValue("finDispo");
      return <div>{format(date as Date, "dd/MM/yyy")}</div>
    }
  },
  {
    id: "actions",
    header:"Acciones"
  }
]
