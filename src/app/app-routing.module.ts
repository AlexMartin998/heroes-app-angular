import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { canActivateAuthGuard, canMatchAuthGuard } from './auth/guards/auth.guard';
import { canActivatePublicGuard } from './auth/guards/public.guard';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),

    // Public Routes
    canActivate: [canActivatePublicGuard],
    canMatch: [canActivatePublicGuard],
  },
  {
    path: 'heroes',
    loadChildren: () =>
      import('./heroes/heroes.module').then((m) => m.HeroesModule),

    // Auth
    canActivate: [canActivateAuthGuard], // podrian hacer +, ej: role | valida 1 unica vez | si elimino el token, como solo verifica 1 vez, me deja navegar (hasta 1 refresh)
    canMatch: [canMatchAuthGuard], // valida x ruta (match): si elimino el token, como valida x ruta, no lo deja navegar y lo saca
  },
  { path: '404', component: Error404PageComponent },

  // c/ tiene el path vacio, x eso debe ir full para q el match sea exacto
  { path: '', redirectTo: 'heroes', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
