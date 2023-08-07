import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';

import { AuthService } from '../services/auth.service';

const checkAuthStatus = (): boolean | Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap((isAuth) => {
      if (isAuth) router.navigateByUrl('/heroes/list');
    }),
    // como service retorna 1 false, no deja pasar en el router, y en este caso, SI queremos q le deje pasar para q pueda ver las paginas de login/register. X eso cambiamos el value
    map((isAuth) => !isAuth)
  );
};

export const canActivatePublicGuard: CanActivateFn = (route, state) => {
  return checkAuthStatus();
};

export const canMatchPublicGuard: CanMatchFn = (route, segments) => {
  return checkAuthStatus();
};
