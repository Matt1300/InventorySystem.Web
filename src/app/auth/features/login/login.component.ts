import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Interfaces/user';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  errorMessage: string = '';

  authService = inject(AuthService);
  fb = inject(FormBuilder);
  router = inject(Router)

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
