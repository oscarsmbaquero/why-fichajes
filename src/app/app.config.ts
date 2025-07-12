import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpBackend, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import Lara from '@primeng/themes/lara';


export const provideTranslation = () => ({
  defaultLanguage: 'es',
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
});

export function HttpLoaderFactory(http: HttpClient) {
  return  new  TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule), 
    importProvidersFrom([TranslateModule.forRoot(provideTranslation())
  ]),
  providePrimeNG({ 
    theme: {
        preset: Aura
    }
})],
};