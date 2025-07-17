import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../../core/services/projects/projects.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {

  projects: any[] = [];

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
    this.getProjects();
  }



  getProjects() {
    this.projectsService.getProjects().subscribe(projects => {
      this.projects = projects;
      console.log(projects);
    });
  }

}
