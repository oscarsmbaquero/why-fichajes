import { Component } from '@angular/core';
import { FichajeDiario } from '../../../../core/models/fichaje-models';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-anadir-fichejes',
  standalone: true,
  imports: [ButtonModule, MessageModule, TooltipModule],
  templateUrl: './anadir-fichejes.component.html',
  styleUrl: './anadir-fichejes.component.css',
})
export class AnadirFichejesComponent {
  horaEntrada: string | null = null;
  horaSalida: string | null = null;
  hourTransform = '';
  minuteTransform = '';
  secondTransform = '';
  existeFichajeHoy = false;
  fichajeRegistradoOk = false;
  private intervalId: any;
  user: any;
  tienda!: string;
  idUsuario!: number;
  relojCard: any;
  disabledSalidaFichaje = true;
  fichajeSalidaOk = false;
  registro: FichajeDiario = {
    idUsuario: 0,
    dia: '',
    entrada: {
      hora: '',
      lat: 0,
      lng: 0,
    },
    salida: {
      hora: '',
      lat: 0,
      lng: 0,
    },
  };

  constructor(private fichajesService: FichajesService) {}

  ngOnInit() {
    this.actualizarReloj();
    this.intervalId = setInterval(() => this.actualizarReloj(), 1000);
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.tienda = usuario.data.tienda;
    this.idUsuario = usuario.data.idUsuario;
    this.obtenerFichajesByUserAndDay();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString('es-ES', { hour12: false });
  }

  ficharEntrada(): void {
    this.obtenerUbicacion()
      .then((ubicacion) => {
        this.horaEntrada = this.obtenerHoraActual();
        this.registro.idUsuario = this.idUsuario;
        this.registro.dia = this.relojCard.split(' ')[0];
        this.registro.entrada.hora = this.horaEntrada;
        this.registro.entrada.lat = ubicacion.lat;
        this.registro.entrada.lng = ubicacion.lng;
        this.fichajesService
          .setFichajeEntrada(this.registro)
          .subscribe((response) => {
            console.log('Fichaje de entrada registrado:', response);
            this.fichajeRegistradoOk = true;
            setTimeout(() => {
              this.fichajeRegistradoOk = false;
            }, 2500);
          });
        this.existeFichajeHoy = true;
        this.fichajeSalidaOk = true;
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación para entrada:', error);
      });
  }

  ficharSalida(): void {
    this.obtenerUbicacion()
      .then((ubicacion) => {
        this.horaEntrada = this.obtenerHoraActual();
        this.registro.idUsuario = this.idUsuario;
        this.registro.dia = this.relojCard.split(' ')[0];
        this.registro.salida.hora = this.horaEntrada;
        this.registro.salida.lat = ubicacion.lat;
        this.registro.salida.lng = ubicacion.lng;
        this.fichajesService
          .setFichajeSalida(this.registro)
          .subscribe((response) => {
            console.log('Fichaje de salida registrado:', response);
          });
        this.fichajeRegistradoOk = true;
        this.obtenerFichajesByUserAndDay();
            setTimeout(() => {
              this.fichajeRegistradoOk = false;
            }, 2500);
            this.fichajeSalidaOk = false;
      })
      .catch((error) => {
        console.error('Error al obtener la ubicación para entrada:', error);
      });
  }

  private actualizarReloj(): void {
    const ahora = new Date();
    const seg = ahora.getSeconds();
    const min = ahora.getMinutes();
    const hora = ahora.getHours();

    this.secondTransform = `rotate(${seg * 6}deg)`;
    this.minuteTransform = `rotate(${min * 6 + seg * 0.1}deg)`;
    this.hourTransform = `rotate(${(hora % 12) * 30 + min * 0.5}deg)`;
    const year = ahora.getFullYear();
    const month = (ahora.getMonth() + 1).toString().padStart(2, '0');
    const day = ahora.getDate().toString().padStart(2, '0');
    const horaStr = hora.toString().padStart(2, '0');
    const minStr = min.toString().padStart(2, '0');
    const segStr = seg.toString().padStart(2, '0');
    this.relojCard = `${year}-${month}-${day} ${horaStr}:${minStr}:${segStr}`;
  }

  obtenerUbicacion(): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject('La geolocalización no está soportada por este navegador.');
      }
    });
  }

  obtenerFichajesByUserAndDay() {
    this.fichajesService.getFichajesByUserAndDay(this.idUsuario, new Date().toISOString().split('T')[0]).subscribe(
      (response: any[]) => {
        this.existeFichajeHoy = response.length > 0;
        if (this.existeFichajeHoy) {
          const horaFichajeEntrada = response[0].entrada.hora;
          this.horaEntrada = horaFichajeEntrada;
          this.disabledSalidaFichaje = false
          const horaFichajeSalida = response[0].salida.hora;
          if (horaFichajeSalida) {
            this.horaSalida = horaFichajeSalida;
          } else {
            this.horaSalida = null;
          }
        }
      },
      (error) => {
        console.error('Error al obtener los fichajes:', error);
      }
    );
}
}
