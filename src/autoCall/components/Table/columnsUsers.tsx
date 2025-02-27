"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/autoCall/components/Interfaces/User";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { SorterIcon } from "./utils";
import { UserX } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { deleteUser } from "@/api/apiUser";
import { usePermissions } from "@/auth/Permissions/usePermissions";

export const columnsUsers = (fetchData: () => Promise<void>) => {
  const { hasPermission } = usePermissions()
  const onDelete = async (data: User) => {
    const promiseDeleteUser = new Promise(async (resolve, reject) => {
      try {
        const response = await deleteUser(data.user_id)
        await fetchData(); // Actualizamos los datos después de eliminar
        resolve(response)
      } catch (error) {
        await fetchData();
        console.log("Error ", error)
        reject(error)
      }
    })

    toast.promise(promiseDeleteUser, {
      loading: "Eliminando usuario..",
      success: () => {
        return `Usuario con id ${data.user_id} eliminado`
      },
      error: (error)=>{
        return  `${error}`
      }
    })
  }

  return [
    {
      accessorKey: "user_id",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User
            <SorterIcon isSorted={column.getIsSorted()} />
          </Button>
        );
      },
    },
    {
      accessorKey: "client",
      header: "Cliente",
    },
    {
      accessorKey: "Torre_Cliente",
      header: "Torre Cliente",
    },
    {
      accessorKey: "Rol",
      header: "Rol",
    },
    {
      id: "actions",
      header: hasPermission('users', 'delete') ? "Acciones" : '',
      cell: ({ row }) => {
        if(hasPermission('users', 'delete')){
          const user = row.original;
          return (
            <Dialog>
              <DialogTrigger><UserX /></DialogTrigger>
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
                    <Button type="button" onClick={() => onDelete(user)}>Aceptar</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          );
        }
      },
    },
  ] as ColumnDef<User>[]
}