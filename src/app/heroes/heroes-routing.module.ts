import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroLayoutComponent } from './layouts/hero-layout/hero-layout.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

const routes: Routes = [
  {
    path: '',
    component: HeroLayoutComponent,
    children: [
      { path: 'new-hero', component: NewPageComponent },
      { path: 'search', component: SearchPageComponent },
      { path: 'edit/:id', component: NewPageComponent },
      { path: 'list', component: ListPageComponent },

      // at the end, 'cause it matches all routes
      { path: ':id', component: HeroPageComponent }, // domain.tld/heroes/:id
      { path: '**', redirectTo: 'list' }, //   domain.tld/heroes -> /list
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
