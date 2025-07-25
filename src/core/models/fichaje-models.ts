 export interface FichajeDiario {
  idUsuario: number;
  dia?: string; 
  entrada: {
    hora: string;     
    lat: number;
    lng: number;
  };
  salida?: {
    hora: string;     
    lat: number;
    lng: number;
  };
  project: string;
  tarea?: string;
}