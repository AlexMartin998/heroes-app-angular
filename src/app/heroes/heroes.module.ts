import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';

import { CardComponent } from './components/card/card.component';
import { HeroLayoutComponent } from './layouts/hero-layout/hero-layout.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';

import { HeroImagePipe } from './pipes/hero-image.pipe';
import { ConfirmDialagComponent } from './components/confirm-dialag/confirm-dialag.component';

@NgModule({
  declarations: [
    HeroPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    HeroLayoutComponent,
    CardComponent,
    HeroImagePipe,
    ConfirmDialagComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeroesRoutingModule,
    MaterialModule,
  ],
})
export class HeroesModule {}
