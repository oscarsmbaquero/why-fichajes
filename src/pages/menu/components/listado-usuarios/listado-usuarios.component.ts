import { Component, inject, OnInit } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { UsersService } from '../../../../core/services/users/users.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'listado-usuarios',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './listado-usuarios.component.html',
  styleUrl: './listado-usuarios.component.css'
})
export class ListadoUsuariosComponent implements OnInit {

  fichajesService = inject (FichajesService);
  usersService = inject (UsersService);

  usuarios: any;
  loading = false;


ngOnInit(): void {
  this.loading = true;
  this.usersService.getUsers().subscribe((element) =>{
    console.log(element);
    this.usuarios = element;    
  });
  this.loading = false;
}

}
