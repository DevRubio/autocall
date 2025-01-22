import { PhoneCall } from "lucide-react"

export const Nav = () => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a
                href="#"
                className="text-xl font-bold flex items-center ml-2.5"
              >
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
              <div className="bg-black text-white font-bold p-2 rounded-full w-12 h-12 flex items-center justify-center">
                SWO
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}
