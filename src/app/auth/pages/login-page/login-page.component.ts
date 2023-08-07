import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login('alex@seo.com', '123123').subscribe((user) => {
      this.router.navigateByUrl('/');
    });
  }
}
