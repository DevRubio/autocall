import RootLayout from "@/layout";
import { Availables } from "@/pages/availables";
import { Clients } from "@/pages/clients";
import { Home } from "@/pages/home";
import { LogsCalls } from "@/pages/logsCalls";
import { Users } from "@/pages/users";
import { Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="availables" element={<Availables />} />
          <Route path="logcalls" element={<LogsCalls />} />
          <Route path="users" element={<Users/>} />
          <Route path="clients" element={<Clients/>} />
        </Routes>
      </RootLayout>
    </>
  );
};
