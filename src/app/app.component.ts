import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
//COMPONENTS
import { NavbarComponent } from '../core/components/navbar/navbar.component';
import { FooterComponent } from '../core/components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[
  ]
})
export class AppComponent  {
  title = 'little-details';
}
