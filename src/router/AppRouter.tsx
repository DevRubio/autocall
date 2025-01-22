import RootLayout from "@/layout";
import { Availables, Clients, Home, LogsCalls, Users } from "@/pages";
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
