"use client"

import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns";
import { NewDataDisponible } from "@/autoCall/components/Interfaces/Disponible"
import { Button } from "@/components/ui/button"
import { SorterIcon } from "./utils"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserX } from "lucide-react";
import { deleteData } from "@/api/apiCrud";
import { toast } from "sonner"
import { usePermissions } from "@/auth/Permissions/usePermissions";

function formatCell(cellPhone:number){
    const formatted = cellPhone
    ? cellPhone
          .toString()
          .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3") 
    : cellPhone;
    
    return formatted
}



export const columnsDisponibles = (fetchData: () => Promise<void>) => {
  const { hasPermission } = usePermissions()


  const onDelete = async (data:NewDataDisponible)=>{  
    const promiseDeleteUser = new Promise(async (resolve, reject)=>{
      try {
        const response = await deleteData('disponibles', data.Torre, data.RowKey)        
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
    accessorKey: "Alertas_Excluidas",
    header:"Alertas Excluidas"
  },
  {
    accessorKey: "Inicio_Disponibilidad",
    header:"Inicio Disponibilidad",
    cell: ({ row }) => {
        const date = row.getValue("Inicio_Disponibilidad");
        return <div>{format(date as Date, "dd/MM/yyyy")}</div>;
    }
  },
  {
    accessorKey: "Fin_Disponibilidad",
    header:"Fin Disponibilidad",
    cell: ({row})=>{
      const date = row.getValue("Fin_Disponibilidad");
      return <div>{format(date as Date, "dd/MM/yyy")}</div>
    }
  },

  {
    id: "actions",
    header: hasPermission('availables', 'delete') ? "Acciones" : '',
    cell: ({ row }) => {
      const disponible = row.original;
      if(hasPermission('availables', 'delete')){
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
      }
    },
  },
] as ColumnDef<NewDataDisponible>[]
}
