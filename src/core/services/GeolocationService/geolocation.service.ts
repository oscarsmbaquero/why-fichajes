// geolocation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private apiUrl = 'https://nominatim.openstreetmap.org/reverse';

  constructor(private http: HttpClient) {}

 getLocalidadFromCoordinates(lat: number, lon: number): Observable<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    // 'User-Agent': 'angular-app/1.0 (tucorreo@example.com)'
  });

  return this.http.get<any>(url, { headers }).pipe(
    map(response => {
      const address = response?.address;

      // Busca en este orden porque a veces es city, otras town o village
      return (
        address?.city ||
        address?.town ||
        address?.village ||
        'Localidad no encontrada'
      );
    }),
    catchError(err => {
      console.error('Error al obtener localidad:', err);
      return of(null);
    })
  );
}
}
