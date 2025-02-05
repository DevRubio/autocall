import { AuthContext } from "@/auth"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

export const PrivateRoute = ({children}: Readonly<{children: React.ReactNode}>) => {
    const { user } = useContext(AuthContext)

  return (user) ? children : <Navigate to={"/login"} />
}
