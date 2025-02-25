export type BaseLogCalls= {
  RowKey: string
  Server: string
  LogContent: string 
  LogResult: string  
  Reason: string 
}

export type LogCalls = BaseLogCalls & {
    PartitionKey: string       
    Name: string   
    status: string
    Date: string
}

export type NewDataLogCalls = BaseLogCalls & {
  Torre: string,
  Fecha: string,
  Disponible: string,
  Estado: string,
}