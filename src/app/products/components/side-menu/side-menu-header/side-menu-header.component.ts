import { Component, inject } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'side-menu-header',
  imports: [],
  templateUrl: './side-menu-header.component.html',
})
export class SideMenuHeaderComponent {
  envs = environment;
  authService = inject(AuthService);
  isLoggedIn = this.authService.isLoggedIn();
  username = this.authService.fullName() || 'Usuario';
}
