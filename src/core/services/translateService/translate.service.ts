import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private defaultLang = 'es';
  private currentLangSubject: BehaviorSubject<string>;

  constructor(private translateService: TranslateService) {
    // Inicializa el BehaviorSubject con el idioma por defecto
    this.currentLangSubject = new BehaviorSubject<string>(this.defaultLang);
  }

  // Método para cambiar el idioma
  changeLanguage(language: string): void {
    this.translateService.use(language);
    this.currentLangSubject.next(language); // Emitir el nuevo idioma
  }

  // Método para obtener el idioma actual como un Observable
  getCurrentLanguage(): Observable<string> {
    return this.currentLangSubject.asObservable();
  }
}

