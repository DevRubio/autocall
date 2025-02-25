import FormLogin from "@/components/login/login-form";

export function Login() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center md:p-10">
      <div className="w-full max-w-sm">      
        <FormLogin />
      </div>
    </div>
  );
}
