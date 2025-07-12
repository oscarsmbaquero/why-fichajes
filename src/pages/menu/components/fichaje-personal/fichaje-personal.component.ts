import { Component, inject } from '@angular/core';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../core/services/users/users.service';
//primeng
import { SelectModule } from 'primeng/select';
import { GeolocationService } from '../../../../core/services/GeolocationService/geolocation.service';

@Component({
  selector: 'app-fichaje-personal',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './fichaje-personal.component.html',
  styleUrl: './fichaje-personal.component.css',
})
export class FichajePersonalComponent {
  fichajesService = inject(FichajesService);
  userService = inject(UsersService);
  opciones: any;
  registros: any;

  opcionSeleccionada: string = '';

  constructor(private geolocationService: GeolocationService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((element) => {
      console.log(element);
      this.opciones = element;
      console.log(this.opciones.idUsuario);
    });
  }

  onSelectChange(event: Event) {
    const idSeleccionado = (event.target as HTMLSelectElement).value;

    // Si necesitas el objeto completo del usuario:
    const usuario = this.opciones.find(
      (op: { idUsuario: string }) => op.idUsuario == idSeleccionado
    );
    this.fichajesService
      .getFichajesByUser(usuario.idUsuario)
      .subscribe((element) => {
        this.registros = element;
        this.registros = this.calcularTiempoTrabajado(this.registros);
        console.log(element);
      });
  }

  //TODO EXPORTAR A UTILS
  calcularTiempoTrabajado(fichajes: any[]) {
    const formatoHora = (hora: string): string => {
      if (!hora) return '00:00:00';
      const [h = '00', m = '00', s = '00'] = hora.split(':');
      return `${h.padStart(2, '0')}:${m.padStart(2, '0')}:${s.padStart(
        2,
        '0'
      )}`;
    };

    return fichajes.map((fichaje) => {
      const entradaHora = formatoHora(fichaje.entrada?.hora);
      const salidaHora = formatoHora(fichaje.salida?.hora);

      if (entradaHora && salidaHora) {
        const fecha = '1970-01-01';
        const entrada = new Date(`${fecha}T${entradaHora}`);
        const salida = new Date(`${fecha}T${salidaHora}`);

        if (isNaN(entrada.getTime()) || isNaN(salida.getTime())) {
          return { ...fichaje, tiempoTrabajado: null };
        }

        const diffMs = salida.getTime() - entrada.getTime();
        const totalSegundos = Math.floor(diffMs / 1000);

        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        const tiempoTrabajado = `${horas.toString().padStart(2, '0')}:${minutos
          .toString()
          .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        return { ...fichaje, tiempoTrabajado };
      }

      return { ...fichaje, tiempoTrabajado: null };
    });
  }

  mostrarLocalidad(registro: any, tipo: 'entrada' | 'salida'): void {
    const datosUbicacion = registro[tipo];

    if (datosUbicacion?.lat && datosUbicacion?.lng) {
      this.geolocationService
        .getLocalidadFromCoordinates(datosUbicacion.lat, datosUbicacion.lng)
        .subscribe((localidad: any) => {
          registro[`localidad${this.capitalize(tipo)}`] = localidad;
          registro[`localidad${this.capitalize(tipo)}Visible`] = true;
        });
    } else {
      registro[`localidad${this.capitalize(tipo)}`] = 'No disponible';
      registro[`localidad${this.capitalize(tipo)}Visible`] = true;
    }
    if (tipo === 'entrada') {
      this.registros.localidadEntradaVisible = true;
    } else {
      this.registros.localidadSalidaVisible = true;
    }
    // this.registros.localidadVisible = true;
  }

  capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
