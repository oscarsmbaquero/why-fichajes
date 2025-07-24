import { Routes } from '@angular/router';
import { FichajeComponent } from '../pages/fichaje/fichaje.component';
import { LoginComponent } from '../core/components/login/login.component';
import { MenuComponent } from '../pages/menu/menu.component';
import { FichajePersonalComponent } from '../pages/menu/components/fichaje-personal/fichaje-personal.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { ListadoUsuariosComponent } from '../pages/menu/components/listado-usuarios/listado-usuarios.component';
import { ProjectsComponent } from '../pages/menu/components/projects/projects.component';

export const routes: Routes = [
  {
    path: "login",
    pathMatch: 'full',
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
    pathMatch: 'full',
    component: MenuComponent
  },
   {
    path: "fichaje-personal",
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: FichajePersonalComponent
  },
  {
    path: "listado-usuarios",
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: ListadoUsuariosComponent
  },
  {
    path: "projects",
    canActivate: [AuthGuard],
    pathMatch: 'full',
    component: ProjectsComponent
  },
  {
    path: "",
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
