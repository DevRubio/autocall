"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { v4 as uuidV4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../../../components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { addData } from "@/api/apiCrud";

const formSchema = z.object({
  PartitionKey: z
    .string()
    .min(2, { message: "El nombre de la cliente es requerido" }),
  RowKey: z.string().optional(),
  tower: z
    .string()
    .min(2, { message: "El nombre de la torre es requerido" })
    .max(20),
  nombre_disponible: z
    .string()
    .min(2, { message: "El nombre del disponible es requerido" })
    .max(30),
  celular: z
    .string()
    .min(10, {
      message: "El número de teléfono debe tener exactamente 10 dígitos.",
    })
    .max(10, {
      message: "El número de teléfono debe tener exactamente 10 dígitos.",
    }),
  celular_respaldo: z.string(),
  correo: z.string().email({ message: "Correo invalido" }),
  inicioDispo: z.date({ message: "Fecha inicio es requerida" }),
  finDispo: z.date({ message: "Fecha fin es requerida" }),
  excluir: z.string(),
});

interface TowerData {
  PartitionKey: string;
  RowKey: string;
}

interface props {
  data: TowerData[];
}

export function FormsDiponible({ data }: props) {
  const [dialogOpen, setDialogOpen] = useState(false);

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
      PartitionKey: "",
      tower: "",
      nombre_disponible: "",
      celular: "",
      celular_respaldo: "",
      correo: "",
      excluir: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { ...newvalues } = values;
    newvalues.PartitionKey = `${values.PartitionKey}_${values.tower}`;
    newvalues.RowKey = uuidV4();
    setDialogOpen(false);
    form.reset();
    const PromiseAddTower = new Promise(async (resolve, reject) => {
      try {
        const response = await addData('Disponibles',newvalues);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(PromiseAddTower, {
      loading: "Guardando Disponible..",
      success: () => {
        return "Disponible guardado correctamente";
      },
      error: "Error al guadar el disponible",
    });
  }
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <Button className="mr-2" onClick={() => setDialogOpen(true)}>
        Agregar Disponible
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Agregar Disponible</DialogTitle>
          <DialogDescription>
            Ingresa los datos del disponible aquí. Haz clic en Guardar cuando
            hayas terminado.
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
              name="PartitionKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cliente</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value); // Actualiza el campo PartitionKey
                      form.resetField("tower"); // Resetea el campo RowKey (Torre)
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
              name="tower"
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
                      {(groupedData[form.watch("PartitionKey")] || []).map(
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

            {/* Name */}
            <FormField
              control={form.control}
              name="nombre_disponible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Disponible</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa el nombre del disponible"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* celular */}
            <FormField
              control={form.control}
              name="celular"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Ingresa el numero de celular"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* celular_respaldo */}
            <FormField
              control={form.control}
              name="celular_respaldo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular de Respaldo</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa el celular de respaldo"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* correo */}
            <FormField
              control={form.control}
              name="correo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>correo</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Ingresa el correo electronico"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* inicioDispo */}
            <FormField
              control={form.control}
              name="inicioDispo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Inicio Disponibilidad</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[222px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* finDispo */}
            <FormField
              control={form.control}
              name="finDispo"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fin Disponibilidad</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[222px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
                          ) : (
                            <span>Seleccione una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* excluir */}
            <FormField
              control={form.control}
              name="excluir"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alertas Excluidas</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ingresa las alertas excluidas"
                      {...field}
                    />
                  </FormControl>
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
