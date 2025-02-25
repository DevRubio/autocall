"use client";

import { z } from "zod";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AuthContext } from "@/auth";
import { useNavigate } from "react-router-dom";
import { LucidePhoneCall } from "lucide-react";

const FormLogin = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError('')
    setLoading(true);
    login(values.email, values.password).then((success) => {
      if (!success) {
        setError("Usuario o contraseña incorrecta");
        setLoading(false);
      } else {
        navigate("/", { replace: true });
      }
    });
  }
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      <Card>
        <CardHeader className="flex text-center">
          <CardTitle className="text-2xl">
            <div className="flex items-center justify-center gap-2 self-center font-semibold mb-4">
              <div className="flex h-8 w-8 hover:w-9 hover:h-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <LucidePhoneCall className="size-4 animate-pulse" />
              </div>
              AutoCall
            </div>
          </CardTitle>
          <CardDescription>
            Ingrese su correo electrónico a continuación para iniciar sesión en
            su cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />                    
                  </FormItem>
                )}
              />
              {error && (
                <div className="text-center font-semibold">
                  <FormMessage>{error}</FormMessage>
                </div>
              )}
              <div className="flex items-center justify-center">
                <Button className="mt-4" type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Iniciando Sesion
                    </>
                  ) : "Iniciar Sesion"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormLogin;
