"use client"

import { ColumnDef } from "@tanstack/react-table"
import { LogCalls } from "@/Interfaces/LogCalls"
import { Button } from "@/components/ui/button"
import { SorterIcon } from './utils'

export const columnsLogsCalls: ColumnDef<LogCalls>[] = [
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
    accessorKey: "Date",
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
    accessorKey: "Name",
    header: "Disponible"
  },
  {
    accessorKey: "Reason",
    header: "Rason"
  },
  {
    accessorKey: "status",
    header:"Estado"
  }
]
