import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../enviroment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(private httpClient: HttpClient) { }
  
  addProject(project: any): Observable<any> {
    const endpoint = `${environment.apiUrl}projects`;
    return this.httpClient.post<any>(endpoint, project).pipe(
      map(response => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Error al añadir el proyecto:', error);
        return throwError(() => error);
      })
    );
  }


   getProjects(): Observable<any[]> {
    const endpoint = `${environment.apiUrl}projects`;
    return this.httpClient.get<any[]>(endpoint).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener los proyectos:', error);
        return throwError(() => error);
      })
    );
  }
}
