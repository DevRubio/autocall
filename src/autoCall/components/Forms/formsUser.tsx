"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { addUser } from "@/api/apiUser";

const formSchema = z.object({
  user_id: z.string({ required_error: "User is required" }).min(1, "User is required").email("User must be an email address."),
  client: z.string().min(2, { message: "El cliente es requerido" }),
  torre: z.string().min(2, { message: "La torre es requerida" }),
  rol: z.string().min(2, { message: "Por favor seleccione un Rol" }),
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
    onSuccess:()=>void
  }

export function FormsUser({ data, onSuccess }: props ) {
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
      client: "",
      user_id: "",
      torre: "",
      rol: "",
      password: ""
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setformUserOpen(false);
    form.reset();
    const PromiseAdduser = new Promise(async (resolve, reject) => {
      try {
        const response = await addUser(values);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(PromiseAdduser, {
      loading: "Guardando usuario..",
      success: () => {
        onSuccess()
        return "Usuario guardado correctamente";
      },
      error: (error) => {
        return `${error}`
      }
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
                      form.resetField("torre"); // Resetea el campo (Torre)
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

            
            
            {/*user_id */}
            <FormField
              control={form.control}
              name="user_id"
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
                      <SelectItem value="FullAccessUser">FullAccessUser</SelectItem>
                      <SelectItem value="AdminUser">AdminUser</SelectItem>
                      <SelectItem value="FrontEndUser">FrontendUser</SelectItem>
                      <SelectItem value="ReadOnlyFrontendUser">ReadOnlyFrontendUser</SelectItem>
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
