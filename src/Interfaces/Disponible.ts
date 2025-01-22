export type Disponible = {
    RowKey: string
    PartitionKey: string
    celular: number
    celular_respaldo: number
    nombre_disponible: string     
    correo: string
    inicioDispo: Date
    finDispo: Date
    excluir: string | null
  }