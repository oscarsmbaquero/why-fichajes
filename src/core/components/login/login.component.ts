import { Component } from '@angular/core';
import { IUser } from '../../models/user-models';
import { ReactiveFormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users/users.service';
//primeng
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MessageModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginUser: FormGroup;
  public submitted: boolean = false;
  showPassword: boolean = false;
  loginError: boolean | null = null;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userServices: UsersService,
    private router: Router
  ) {
    this.loginUser = this.formBuilder.group({
      mail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    this.loginError = null;
    this.loading = true;
    if (this.loginUser.valid) {
      const user: any = {
        mail: this.loginUser.get('mail')?.value,
        password: this.loginUser.get('password')?.value,
      };

      this.userServices.login(user).subscribe(
        (response) => {
          this.loginError = false;
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['fichaje']);
          }, 1500);
        },
        (error) => {
          this.loginError = true;
          console.error('Error al enviar los datos', error);
          this.loading = false;
        }
      );
    }
  }

  /**
   * Método para el ojo del input de password
   * @param field
   */
  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    }
  }
}
