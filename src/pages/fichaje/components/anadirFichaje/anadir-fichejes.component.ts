import { Component } from '@angular/core';
import { FichajeDiario } from '../../../../core/models/fichaje-models';
import { FichajesService } from '../../../../core/services/fichajes/fichajes.service';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-fichejes',
  standalone: true,
  imports: [ButtonModule, MessageModule, FormsModule],
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
  departamento!: string;
  idUsuario!: number;
  relojCard: any;
  disabledSalidaFichaje = false;
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
    project: '',
  };
  opcionSeleccionada = '';
  opciones: any[] = [];

  constructor(
    private fichajesService: FichajesService,
    private projectsService: ProjectsService
  ) {}

  ngOnInit() {
    this.actualizarReloj();
    this.intervalId = setInterval(() => this.actualizarReloj(), 1000);
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = usuario.data.user;
    this.departamento = usuario.data.departamento;
    this.idUsuario = usuario.data.idUsuario;
    this.obtenerFichajesByUserAndDay();
    this.obtenerProjects();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private obtenerHoraActual(): string {
    const ahora = new Date();
    return ahora.toLocaleTimeString('es-ES', { hour12: false });
  }

  ficharEntrada(): void {
  this.obtenerUbicacion().then((ubicacion) => {
    this.horaEntrada = this.obtenerHoraActual();
    this.registro = {
      idUsuario: this.idUsuario,
      dia: this.relojCard.split(' ')[0],
      entrada: {
        hora: this.horaEntrada,
        lat: ubicacion.lat,
        lng: ubicacion.lng
      },
      project: this.opcionSeleccionada
    };

    this.fichajesService.setFichajeEntrada(this.registro).subscribe((response) => {
      console.log('Fichaje de entrada registrado:', response);
      this.fichajeRegistradoOk = true;
      setTimeout(() => {
        this.fichajeRegistradoOk = false;
        this.obtenerFichajesByUserAndDay();
      }, 2500);
    });
  });
}

  ficharSalida(): void {
  this.obtenerUbicacion().then((ubicacion) => {
    this.horaEntrada = this.obtenerHoraActual();
    const salida = {
      hora: this.horaEntrada,
      lat: ubicacion.lat,
      lng: ubicacion.lng
    };

    const payload = {
      idUsuario: this.idUsuario,
      dia: this.relojCard.split(' ')[0],
      salida,
      project: this.opcionSeleccionada
    };

    this.fichajesService.setFichajeSalida(payload).subscribe((response) => {
      console.log('Fichaje de salida registrado:', response);
      this.fichajeRegistradoOk = true;
      setTimeout(() => {
        this.fichajeRegistradoOk = false;
        this.obtenerFichajesByUserAndDay();
      }, 2500);
    });
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
  const today = new Date().toISOString().split('T')[0];

  this.fichajesService.getFichajesByUserAndDay(this.idUsuario, today).subscribe(
    (response: any[]) => {
      this.existeFichajeHoy = response.length > 0;

      if (!this.existeFichajeHoy) {
        this.horaEntrada = null;
        this.horaSalida = null;
        this.disabledSalidaFichaje = true;
        return;
      }

      // Ordenar por hora de entrada descendente
      const fichajesOrdenados = [...response].sort((a, b) => {
        return new Date(b.entrada.hora).getTime() - new Date(a.entrada.hora).getTime();
      });
      const fichajeAbierto = fichajesOrdenados.find(f => !f.salida?.hora);

      if (fichajeAbierto) {
        console.log('Entrada registrada, falta salida');
        this.horaEntrada = fichajeAbierto.entrada?.hora || null;
        this.horaSalida = null;
        this.disabledSalidaFichaje = false;
        this.fichajeSalidaOk = true;
      } else {
        console.log('Todos los fichajes tienen salida');
        this.horaEntrada = null;
        this.horaSalida = null;
        this.disabledSalidaFichaje = true;
        this.fichajeSalidaOk = false;
        this.existeFichajeHoy = false;
      }
    },
    (error) => {
      console.error('Error al obtener los fichajes:', error);
    }
  );
}



obtenerProjects() {
  this.projectsService.getProjects().subscribe(
    (response) => {
      this.opciones = response;
      console.log('Proyectos obtenidos:', this.opciones);
    },
    (error) => {
      console.error('Error al obtener los proyectos:', error);
    }
  );
}

}
