'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { SorterIcon } from "./utils";
import { Client } from '../Interfaces/Clients';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { UserX } from "lucide-react";
import { deleteData } from "@/api/apiCrud";
import { toast } from "sonner"


export const columnsClients =(fetchData: () => Promise<void>) =>{
  
  const onDeleteUser = async (client: Client)=>{
      const promiseDeleteUser = new Promise(async (resolve, reject)=>{
        try {
          const response = await deleteData('Clientes', client.PartitionKey, client.RowKey)
          await fetchData()
          resolve(response)
        } catch (error) {
          console.log("Error ",error)
          reject(error)
        }
      })
    
      toast.promise(promiseDeleteUser,{
        loading: "Eliminando cliente..",
        success: () =>{
          return `Cliente con id ${client.PartitionKey} eliminado`
        },
        error: (err)=>{
          return  `${err}`
        }
      })
    }
  return [
    {
        accessorKey: "PartitionKey",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Cliente
                    <SorterIcon isSorted={column.getIsSorted()} />
                </Button>
            );
        }
    },
    {
        accessorKey : 'RowKey',
        header: 'Torre Cliente'
    },
    {
        id: "actions",
        header: "Acciones",    
        cell: ({ row }) => {
          const client = row.original;
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
                <Button type="button" onClick={()=>onDeleteUser(client)}>Aceptar</Button>
              </DialogClose>
            </DialogFooter>
            </DialogContent>
          </Dialog>      
          );
        },
      },
] as ColumnDef<Client>[]
}