import { AuthContext } from "@/auth";
import { PhoneCall } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login", {
      replace: true,
    });
  };
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <a href="#" className="text-xl font-bold flex items-center ml-2.5">
              {/* Logo */}
              <PhoneCall />
              <span className="self-center whitespace-nowrap ml-2">
                {" "}
                AutoCall
              </span>
            </a>
          </div>
          <div className="flex items-center">
            {/* User Avatar */}
            <div className="mr-2">
              {user?.user}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
                <div className="bg-black text-white font-bold p-2 rounded-full w-12 h-12 flex items-center justify-center">
                  SWO
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-2 w-11 mb-1">
                  <span className="text-sm ml-2 flex gap-2"><p className="font-semibold">User:</p> {JSON.parse(localStorage.getItem("user") || "null") }</span>
                  <span className="text-sm ml-2 flex gap-2"><p className="font-semibold">Profile:</p> {user?.Rol}</span>
                </div>
                <DropdownMenuItem onClick={onLogout} className="cursor-pointer">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
