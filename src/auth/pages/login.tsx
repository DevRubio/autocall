/* import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context"; */
import FormLogin from "@/components/login/login-form";

export function Login() {
/*   const { login } = useContext(AuthContext);
  const navigate = useNavigate(); */

/*   const OnLogin = () => {
    login("Usuarios", "ofrubio1@gmail.com");
    navigate("/", {
      replace: true,
    });
  }; */
  return (
    <div className="flex min-h-svh w-full items-center justify-center md:p-10">
      <div className="w-full max-w-sm">      
        <FormLogin />
      </div>
    </div>
  );
}
