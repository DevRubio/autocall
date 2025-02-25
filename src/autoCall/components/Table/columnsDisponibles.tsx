"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { Disponible } from "@/autoCall/components/Interfaces/Disponible"
import { Button } from "@/components/ui/button"
import { SorterIcon } from "./utils"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserX } from "lucide-react";
import { deleteData } from "@/api/apiCrud";
import { toast } from "sonner"

function formatCell(cellPhone:number){
    const formatted = cellPhone
    ? cellPhone
          .toString()
          .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") 
    : cellPhone;
    
    return formatted
}



export const columnsDisponibles = (fetchData: () => Promise<void>) => {
  const onDelete = async (data:Disponible)=>{
  
    const promiseDeleteUser = new Promise(async (resolve, reject)=>{
      try {
        const response = await deleteData('disponibles', data.PartitionKey, data.RowKey)        
        await fetchData();
        resolve(response)
      } catch (error) {
        console.log("Error ",error)
        reject(error)
      }
    })
  
    toast.promise(promiseDeleteUser,{
      loading: "Eliminando Disponible..",
      success: () =>{
        return `Disponible ${data.nombre_disponible} eliminado`
      },
      error: (error)=>{
        return  `${error}`
      }
    })
  }

  return[
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
    header: "Acciones",    
    cell: ({ row }) => {
      const disponible = row.original;
      return (
        <Dialog>
        <DialogTrigger><UserX/></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Estás completamente seguro?</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Eliminará permanentemente su usuario.
            </DialogDescription>
          </DialogHeader>
        <DialogFooter>          
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={()=>onDelete(disponible)}>Aceptar</Button>
          </DialogClose>
        </DialogFooter>
        </DialogContent>
      </Dialog>      
      );
    },
  },
] as ColumnDef<Disponible>[]
}
