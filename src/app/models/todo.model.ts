import { Status } from "./status.enum";




export interface todo {
  id: string;
  name: string;
  priority: number;
  status: Status;
}

export interface todoNoId {
  name: string;
  priority: number;
  status: Status;
}
