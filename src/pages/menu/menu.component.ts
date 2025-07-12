import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

   menu =[
    {
      id:1,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1751656539/icono_fichar_miht5m.jpg',
      description: 'Fichaje Personal',
      link: ['/fichaje-personal'],
      badge: true,
      disabled : false
    },
    {
      id:2,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1751886783/trabajadores_ehp77i.png',
      description: 'Listado empleados',
      link: ['/listado-usuarios'],
      badge: true,
      disabled : false
    },
    {
      id:3,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489553/abogado_hkxqwk.jpg',
      description: 'Abogado',
      link: ['/chat', 'abogado'],
      badge: true,
      disabled : true
    },
    {
      id:4,
      imageUrl:
        'https://res.cloudinary.com/dcfk8yjwr/image/upload/v1742489553/tecnico_d99vup.jpg',
      description: 'Técnico',
      link: ['/chat', 'tecnico'],
      badge: true,
      disabled : true
    }
  
]

}
