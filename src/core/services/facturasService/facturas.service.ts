import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../enviroment/environment';
import { map } from 'rxjs/operators';
import {  IFactura } from '../../models/facturas-model';
import { IMage } from '../../models/cars-models';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  private favoriteCars: string[] = [];
  private favoriteCarsSubject = new BehaviorSubject<string[]>([]);


  constructor(private httpClient: HttpClient) { }

  public getfacturas():Observable<IFactura[]> {
    return this.httpClient.get<IFactura[]>(`${environment.apiUrl}facturas`);
  }

  filters(proveedor: any) {
    const payload = {
      proveedor: 'Hostinger International Ltd.',
      cif: '44406297J',
      fechaDesde: '2024-01-01',
      fechaHasta: '2024-11-14',
      totalMin: 8.44,
      totalMax: 8.46
    };
    return this.httpClient.post<any>(
      `${environment.apiUrl}facturas/filter`,
      payload
    );
  }

  public addFacturas(body: IMage): Observable<IMage> {    
    const formData = new FormData();
    formData.append('imagen', body.imagen);    
    //formData.append('tipo', body.tipo);
    return this.httpClient.post<IMage>(
      `${environment.apiUrl}facturas`,
      formData
    );
  } 

  public getFacturasErroneas():Observable<IFactura[]>{
    return this.httpClient.get<IFactura[]>(`${environment.apiUrl}facturas/erroneas`);

  }
  
}
