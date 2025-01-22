'use client'

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { SorterIcon } from "./utils";
import { Client } from '../../Interfaces/Clients';

export const columnsClients: ColumnDef<Client>[] = [
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
    }
]