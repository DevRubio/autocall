import { Home, Logs, TowerControl, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

export const Aside = () => {
  const links = [
    {
      name: "Inicio",
      href: "../",
      icon: Home,
    },
    {
      name: "Disponibles",
      href: "./availables",
      icon: TowerControl,
    },
    {
      name: "Llamadas",
      href: "./logcalls",
      icon: Logs,
    },
    {
      name: "Usuarios",
      href: "./users",
      icon: User,
    },
    {
      name: "Clientes",
      href: "./clients",
      icon: Users,
    },
  ];

  return (
    <aside
      id="sidebar"
      className="fixed z-20 h-full top-0 left-0 pt-16 lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75"
      aria-label="Sidebar"
    >
      <div className="relative flex-1 flex flex-col min-h-0 borderR border-gray-200 bg-white pt-0">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex-1 px-3 bg-white divide-y space-y-1">
            <ul className="space-y-2 pb-2">
              {
                links.map((link, index) => (
                  <li key={index}>
                    <NavLink
                      className="capitalize text-gray-900 font-normal text-sm rounded-lg flex items-center p-1 hover:bg-gray-100 group"
                      to={link.href}
                    >
                      {link.icon && <link.icon className="w-5 h-5 mr-2" />}
                      {link.name}
                    </NavLink>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};
