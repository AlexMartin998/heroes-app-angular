import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { User } from 'src/app/auth/interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './hero-layout.component.html',
})
export class HeroLayoutComponent {
  public sidebarItems = [
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ];

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }
}
