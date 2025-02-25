export type BaseDisponible = {
  RowKey: string;
  celular: number;
  celular_respaldo: number;
  nombre_disponible: string;
  correo: string;
};

export type Disponible = BaseDisponible & {
  PartitionKey: string;
  inicioDispo: Date;
  finDispo: Date;
  excluir: string | null;
};

export type NewDataDisponible = BaseDisponible & {
  Torre: string;
  Inicio_Disponibilidad: Date;
  Fin_Disponibilidad: Date;
  Alertas_Excluidas: string | null;
};
