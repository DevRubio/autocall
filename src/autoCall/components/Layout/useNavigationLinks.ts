import { usePermissions } from '@/auth/Permissions/usePermissions';
import { Home, Logs, TowerControl, User, Users } from "lucide-react";
import { RouteType } from '../Interfaces/RouteType';

export const useNavigationLinks = () => {
  const { canAccessRoute } = usePermissions();
 
  const allLinks = [
    {
      name: "Inicio",
      href: "../",
      icon: Home,
      alwaysShow: true // Mostrar siempre el inicio
    },
    {
      name: "Disponibles",
      href: "/availables",
      icon: TowerControl,
      requiredRoute: "availables"
    },
    {
      name: "Llamadas",
      href: "/logcalls",
      icon: Logs,
      requiredRoute: "logcalls"
    },
    {
      name: "Usuarios",
      href: "/users",
      icon: User,
      requiredRoute: "users"
    },
    {
      name: "Clientes",
      href: "/clients",
      icon: Users,
      requiredRoute: "clients"
    },
  ];

  // Filtrar enlaces según permisos
  const filteredLinks = allLinks.filter(link => {
    if (link.alwaysShow) return true;
    return link.requiredRoute ? canAccessRoute(link.requiredRoute as RouteType) : false;
  });

  return filteredLinks;
};