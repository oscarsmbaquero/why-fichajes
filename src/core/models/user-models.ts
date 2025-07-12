export interface IUser {
  id: string;
  mail: string;
  idUsuario: number;
  tienda: string;
  user: string;
}

export interface IUserResponse {
  status?: number;
  message?: string;
  data: IUser;
}