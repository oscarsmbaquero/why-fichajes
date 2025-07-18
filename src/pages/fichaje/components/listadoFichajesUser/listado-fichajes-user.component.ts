import { Component, OnInit } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
// import { GeolocationService } from '../../../../core/services/GeolocationService/geolocation.service';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-listado-fichajes-user',
  standalone: true,
  imports: [LoadingComponent],
  templateUrl: './listado-fichajes-user.component.html',
  styleUrl: './listado-fichajes-user.component.css',
})
export class ListadoFichajesUserComponent implements OnInit {
  user = '';
  tienda = '';
  idUsuario!: number;
  fichajes: any[] = [];
  direccion: string | null = null;
  loading = false;

  constructor(
    private fichajesService: FichajesService,
    //private geolocationService: GeolocationService
  ) {}

  ngOnInit() {
    this.loading = true;
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.tienda = usuario.data.tienda;
    this.idUsuario = usuario.data.idUsuario;

    this.fichajesService.getFichajesByUser(this.idUsuario).subscribe(
      (response: any[]) => {
        this.fichajes = response;
        if(this.fichajes)
         this.fichajes = this.calcularTiempoTrabajado(this.fichajes);
        console.log(this.fichajes);
        
        //TODO CALCULAR LA LOCALZACION
        // this.fichajes.forEach((fichaje, index) => {
        //   const { lat, lng } = fichaje.entrada;

        //   if (lat && lng) {
        //     this.geolocationService
        //       .getLocalidadFromCoordinates(lat, lng)
        //       .subscribe((localidad) => {
        //         this.fichajes[index].localidadEntrada = localidad;
        //         this.fichajes[index].localidadSalida = localidad;
        //       });
        //   } else {
        //     this.fichajes[index].localidadEntrada = 'No disponible';
        //   }
        // });
      },
      (error) => {
        console.error('Error al obtener los fichajes:', error);
      }
    );
    this.loading = false;
  }

//  calcularTiempoTrabajado(fichajes: any[]) {
//   const formatoHora = (hora: string): string => {
//     if (!hora) return '00:00:00';
//     const [h = '00', m = '00', s = '00'] = hora.split(':');
//     return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
//   };

//   return fichajes.map(fichaje => {
//     const entradaHora = formatoHora(fichaje.entrada?.hora);
//     const salidaHora = formatoHora(fichaje.salida?.hora);

//     if (entradaHora && salidaHora) {
//       const fecha = '1970-01-01';
//       const entrada = new Date(`${fecha}T${entradaHora}`);
//       const salida = new Date(`${fecha}T${salidaHora}`);

//       if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
//         return { ...fichaje, tiempoTrabajado: null };
//       }

//       const diffMs = salida.getTime() - entrada.getTime();
//       const totalSegundos = Math.floor(diffMs / 1000);

//       const horas = Math.floor(totalSegundos / 3600);
//       const minutos = Math.floor((totalSegundos % 3600) / 60);
//       const segundos = totalSegundos % 60;

//       const tiempoTrabajado = `${horas.toString().padStart(2, '0')}:${minutos
//         .toString()
//         .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

//       return { ...fichaje, tiempoTrabajado };
//     }

//     return { ...fichaje, tiempoTrabajado: null };
//   });
// }
calcularTiempoTrabajado(fichajes: any[]) {
  const formatoHora = (hora: string): string => {
    if (!hora) return '00:00:00';
    const [h = '00', m = '00', s = '00'] = hora.split(':');
    return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(2, '0')}`;
  };

  return fichajes.map(fichaje => {
    const entradaHora = formatoHora(fichaje.entrada?.hora);
    const salidaHora = formatoHora(fichaje.salida?.hora);

    if (entradaHora && salidaHora) {
      const fecha = '1970-01-01';
      const entrada = new Date(`${fecha}T${entradaHora}`);
      const salida = new Date(`${fecha}T${salidaHora}`);

      if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
        return { ...fichaje, tiempoTrabajado: null, horasDecimal: null };
      }

      const diffMs = salida.getTime() - entrada.getTime();
      const totalSegundos = Math.floor(diffMs / 1000);

      const horas = Math.floor(totalSegundos / 3600);
      const minutos = Math.floor((totalSegundos % 3600) / 60);
      const segundos = totalSegundos % 60;

      const tiempoTrabajado = `${horas.toString().padStart(2, '0')}:${minutos
        .toString()
        .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

      // Calcular horas decimales
      const horasDecimal = horas + minutos / 60 + segundos / 3600;

      return { ...fichaje, tiempoTrabajado, horasDecimal };
    }

    return { ...fichaje, tiempoTrabajado: null, horasDecimal: null };
  });
}


}
