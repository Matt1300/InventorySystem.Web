import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { NewUser } from '../../Interfaces/user';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatSnackBarModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  errorMessage: string = '';
  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router)
  matSnackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    fullName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    const data: NewUser = {
      fullName: this.loginForm.value.fullName!,
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!
    }

    this.authService.register(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 2000,
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
          this.router.navigateByUrl('/login');
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al registrar el usuario.';
      }
    })
  }
}
