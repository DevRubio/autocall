import { AuthContext } from '@/auth'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({children}: Readonly<{children: React.ReactNode}>) => {
    const {user} = useContext(AuthContext)
    return (!user) ? children : <Navigate to={"/home"}/>
  
}
