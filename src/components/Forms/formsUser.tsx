"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addData } from "@/api/apiCrud";

const formSchema = z.object({
  RowKey: z.string().min(2, { message: "El usuario es requerido" }),
  PartitionKey: z.string(),
  client: z.string().min(2, { message: "El cliente es requerido" }),
  torre: z.string().min(2, { message: "La torre es requerida" }),
  rol: z.string().min(2, { message: "Por favor seleccione un Rol" }),
  name: z.string().min(5, { message: "El nombre es requerido" }),
  password: z
    .string()
    .min(5, { message: "La contraseña debe tener minimo 5 caracteres" }),
});

interface TowerData {
    PartitionKey: string;
    RowKey: string;
  }
  
  interface props {
    data: TowerData[];
  }

export function FormsUser({ data }: props) {
  const [formUserOpen, setformUserOpen] = useState(false);


  const groupedData = data.reduce((acc: Record<string, string[]>, item) => {
    if (!acc[item.PartitionKey]) {
      acc[item.PartitionKey] = [];
    }
    acc[item.PartitionKey].push(item.RowKey);
    return acc;
  }, {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      PartitionKey: "Usuarios",
      RowKey: "",
      client: "",
      torre: "",
      name: "",
      rol: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setformUserOpen(false);
    form.reset();
    const PromiseAdduser = new Promise(async (resolve, reject) => {
      try {
        const response = await addData('Usuarios',values);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(PromiseAdduser, {
      loading: "Guardando usuario..",
      success: () => {
        return "Usuario guardado correctamente";
      },
      error: "Error al guadar el usuario",
    });
  };

  return (
    <Dialog open={formUserOpen} onOpenChange={setformUserOpen}>
      <Button className="mr-2" onClick={() => setformUserOpen(true)}>
        Agregar Usuario
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Agregar Usuario</DialogTitle>
          <DialogDescription>
            Ingresa los datos del usuario aquí. Haz Click en guardar cuando
            hayas terminado
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            {/* Tower Select */}
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value); // Actualiza el campo PartitionKey
                      form.resetField("torre"); // Resetea el campo RowKey (Torre)
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un cliente" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(groupedData).map((partitionKey) => (
                        <SelectItem key={partitionKey} value={partitionKey}>
                          {partitionKey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Segundo Select para mostrar los RowKey basados en el PartitionKey seleccionado */}
            <FormField
              control={form.control}
              name="torre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Torre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione una torre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(groupedData[form.watch("client")] || []).map(
                        (rowKey) => (
                          <SelectItem key={rowKey} value={rowKey}>
                            {rowKey}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            {/*Usuario */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el nombre" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/*Usuario */}
            <FormField
              control={form.control}
              name="RowKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingrese el usurio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            {/*Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Ingrese la contraseña"
                      {...field}
                      autoComplete="false"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            {/*Rol */}
            <FormField
              control={form.control}
              name="rol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BackendUser">BackendUser</SelectItem>
                      <SelectItem value="FrontEndUser">FrontEndUser</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-center">
              <Button type="submit">Guardar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
