import { Component } from '@angular/core';

@Component({
  templateUrl: './hero-layout.component.html',
})
export class HeroLayoutComponent {
  public sidebarItems = [
    { label: 'List', icon: 'label', url: './list' },
    { label: 'Add', icon: 'add', url: './new-hero' },
    { label: 'Search', icon: 'search', url: './search' },
  ];
}
