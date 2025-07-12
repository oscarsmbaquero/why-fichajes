import { Routes } from '@angular/router';
import { FichajeComponent } from '../pages/fichaje/fichaje.component';
import { LoginComponent } from '../core/components/login/login.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { FichajePersonalComponent } from '../pages/menu/components/fichaje-personal/fichaje-personal.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ListadoUsuariosComponent } from '../pages/menu/components/listado-usuarios/listado-usuarios.component';

export const routes: Routes = [
  {
    path: "login",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: LoginComponent
  },
  {
    path: "fichaje",
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: FichajeComponent
  },
  {
    path: "menu",
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' },
    pathMatch: 'full',//coincida nombre exacto
    component: MenuComponent
  },
   {
    path: "fichaje-personal",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: FichajePersonalComponent
  },
   {
    path: "listado-usuarios",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: ListadoUsuariosComponent
  },
  {
    path: "",//raiz de la app
    pathMatch: 'full',//coincida nombre exacto
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
