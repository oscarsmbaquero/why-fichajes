import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../../core/models/project-model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, ButtonModule, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: Proyecto[] = [];
  visible = false;
  projectForm: FormGroup;
  tareaForm: FormGroup;
  expandedIndex: number | null = null;
  addTarea = false;
  projectSelected: any;

  constructor(private projectsService: ProjectsService, private fb: FormBuilder) { 
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      estimacion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getProjects();
  }



 getProjects() {
  this.projectsService.getProjects().subscribe(projects => {
    this.projects = projects;

    this.projects.forEach(project => {
      project.tareas = project.tareas || [];

      project.tareas.forEach((tarea: any) => {
        tarea.esVerde = tarea.estimacion > tarea.horas;
      });
    });

    console.log(this.projects);
  });
}


  onSubmit() {
    if (this.projectForm.valid) {
      const newProject = this.projectForm.value;
      console.log('Proyecto enviado:', newProject);
      this.projectsService.addProject(newProject).subscribe(response => {
        console.log('Proyecto añadido:', response);
        this.getProjects(); 
      }, error => {
        console.error('Error al añadir el proyecto:', error);
      });
      this.visible = false;
      this.projectForm.reset();
    }
  }

  toggleExpand(index: number): void {
  this.expandedIndex = this.expandedIndex === index ? null : index;
}

agregarTarea(tarea:any){
  console.log(tarea);
  this.addTarea = true;
  this.projectSelected = tarea;
}

onSubmitTarea(){  
  if (this.tareaForm.valid) {
    const newTarea = this.tareaForm.value;
    console.log('Tarea enviada:', newTarea);
    this.projectsService.addTarea(this.projectSelected._id, newTarea).subscribe(response => {
      console.log('Tarea añadida:', response);
      this.getProjects(); 
    }, error => {
      console.error('Error al añadir la tarea:', error);
    });
    this.addTarea = false;
    this.tareaForm.reset();
}
}
}
