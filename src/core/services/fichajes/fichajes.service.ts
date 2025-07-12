// fichajes.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root',
})
export class FichajesService {
  constructor(private http: HttpClient) {}

  setFichajeEntrada(registro: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}fichajes`, registro);
  }

    setFichajeSalida(registro: any): Observable<any> {
      console.log(registro);
      
    return this.http.post(`${environment.apiUrl}fichajes/salida`, registro);
  }

  getFichajesByUser(idUsuario: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}fichajes/${idUsuario}`);
  }

  getFichajesByUserAndDay(idUsuario: number, dia: string): Observable<any> {
    console.log(idUsuario, dia);
    
    return this.http.get(`${environment.apiUrl}fichajes/${idUsuario}/${dia}`);
  }
}
