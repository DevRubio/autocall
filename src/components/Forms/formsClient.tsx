'use client'

//import { addClient } from "../../../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
//import { toast } from "sonner";
import { z } from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";

const formSchema = z.object({
    PartitionKey: z.string().min(2, { message: "El cliente es requerido" }),
    RowKey: z.string().min(2, { message: "La torre es requerida" })
})

export function FormsClient(){
    const [formclient, setFormClient] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            PartitionKey: "",
            RowKey: ""
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>)=>{
        setFormClient(false)
        console.log("values", values)
        form.reset()
/*         const PromiseAddClient = new Promise(async(resolve, reject)=>{
            try {
                const response = await addClient(values)
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })

        toast.promise(PromiseAddClient,{
            loading: 'Agregando Cliente...',
            success:()=>{
                return "Cliente agregado con éxito"
            },
            error: 'Error al agregar el cliente'
        }) */
    }

    return(
        <Dialog open={formclient} onOpenChange={setFormClient}>
            <Button className="mr-2" onClick={()=> setFormClient(true)}>
                Agregar Cliente
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Agregar Cliente</DialogTitle>
                    <DialogDescription>
                        Ingresa los datos del cliente aquí. Haz Click en guardar cuando termines
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>

                        <FormField 
                            control={form.control}
                            name="PartitionKey"
                            render={({field})=>(
                                <FormItem>
                                    <FormLabel>Cliente</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ingrese el cliente" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField 
                            control={form.control}
                            name="RowKey"
                            render={({field})=>(
                                <FormItem>
                                   <FormLabel>Torre Cliente</FormLabel>
                                   <FormControl>
                                        <Input placeholder="Ingrese la torre" {...field}/>
                                    </FormControl> 
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <div className="flex justify-center m-2">
                            <Button type="submit">Guardar</Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )

}