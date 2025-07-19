import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects/projects.service';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [DialogModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];
  visible = false;
    projectForm: FormGroup;

  constructor(private projectsService: ProjectsService, private fb: FormBuilder) { 
    this.projectForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getProjects();
  }



  getProjects() {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
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

}
