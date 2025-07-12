import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
//components
import { AnadirFichejesComponent } from './components/anadirFichaje/anadir-fichejes.component';
import { ListadoFichajesUserComponent } from './components/listadoFichajesUser/listado-fichajes-user.component';


@Component({
  selector: 'app-fichaje',
  standalone: true,
  imports: [TabsModule, AnadirFichejesComponent, ListadoFichajesUserComponent],
  templateUrl: './fichaje.component.html',
  styleUrl: './fichaje.component.css',
})
export class FichajeComponent  {
  activeTab = 0;
}
