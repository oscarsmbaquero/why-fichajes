import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../enviroment/environment";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  constructor(private http: HttpClient) {}

  sendMessage(messages: any[], tipo: string): Observable<any> {
    return this.http.post<any>( `${environment.apiUrl}chat`, { messages, tipo });
  }
}
