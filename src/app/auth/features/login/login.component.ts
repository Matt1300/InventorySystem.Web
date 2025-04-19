import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Interfaces/user';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string = '';

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router)
  matSnackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  onSubmit() {
    this.errorMessage = '';

    if (this.loginForm.invalid) return;
    const data: User = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }

    this.authService.login(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          })
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Credenciales incorrectas.';
      }
    })
  }

}
