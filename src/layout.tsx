import { Aside } from "./autoCall/components/Layout/Aside";
import { Navbar } from "./autoCall/components/Layout/Navbar";
//import "./globals.css";
import { Toaster as SonnerToaster} from "@/components/ui/sonner"



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <div>
        <Navbar />
        <div className="flex overflow-hidden bg-white pt-16">
          <Aside />
          <div
            id="main-content"
            className="h-full w-full bg-gray-50 relative overflow-y-auto ml-64"
          >
            <main>
              <div className="pt-6 px-4">
                <div className="w-full min-h-[calc(100vh-230px)]">
                  <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                    {children}
                    <SonnerToaster/>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

  );
}
