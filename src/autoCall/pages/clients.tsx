import { getData } from "@/api/apiCrud";
import { AuthContext } from "@/auth";
import { FormsClient } from "@/autoCall/components/Forms/formsClient";
import { columnsClients } from "@/autoCall/components/Table/columnsClients";
import { DataTable } from "@/autoCall/components/Table/data-table";
import { useCallback, useContext, useEffect, useState } from "react";

export const Clients = () => {
  const [dataClients, setDataclients] = useState([]);
  const { logout } = useContext(AuthContext);  

  const fetchData = useCallback(async () => {
    try {
      const dataClient = await getData("Clientes");
      setDataclients(dataClient);
    } catch (error) {
      console.log(error);
      logout()
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <FormsClient onSuccess={fetchData} />
      <DataTable
        columns={columnsClients(fetchData)}
        data={dataClients}
        filter="PartitionKey"
      />
    </div>
  );
};
