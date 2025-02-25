"use client"

import { ColumnDef } from "@tanstack/react-table"
import { NewDataLogCalls } from "@/autoCall/components/Interfaces/LogCalls"
import { Button } from "@/components/ui/button"
import { SorterIcon } from './utils'

export const columnsLogsCalls: ColumnDef<NewDataLogCalls>[] = [
  {
    accessorKey: "Torre",
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
    accessorKey: "Fecha",
    header: ({column})=>{
      return(
        <Button
          variant="ghost"
          onClick={()=>column.toggleSorting(column.getIsSorted() ==="asc")}
        >
          Fecha
          <SorterIcon isSorted={column.getIsSorted()}/>
        </Button>
      )
    }
  },
  {
    accessorKey: "LogContent",
    header: "Log Content"
  },
  {
    accessorKey: "Disponible",
    header: "Disponible"
  },
  {
    accessorKey: "Reason",
    header: "Reason"
  },
  {
    accessorKey: "Estado",
    header:"Estado"
  }
]
