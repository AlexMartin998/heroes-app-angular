import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// // // Auth Guard NEW Implementation for Angular v16+

//
const checkAuthStatus = (): boolean | Observable<boolean> => {
  // inject authService and router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuth().pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) router.navigateByUrl('/auth/login');
    })
  );
};

// se ejecuta la verificacion con cada ruta q haga match
export const canMatchAuthGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  console.log(' ========= canMatchGuard ========= ');
  console.log({ route, segments });

  return checkAuthStatus();
};

// se ejecuta 1 unica vez
export const canActivateAuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  console.log(' ========= CanActivate ========= ');
  console.log({ route, state });

  return checkAuthStatus();
};
