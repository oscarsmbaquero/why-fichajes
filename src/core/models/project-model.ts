export interface Tarea {
  _id: number;
  nombre: string;
  horas: number;
  estimacion: number;
  esVerde?: false
}

export interface Proyecto {
  _id: number;
  nombre: string;
  descripcion: string;
  horas: number;
  tareas: Tarea[];
}
