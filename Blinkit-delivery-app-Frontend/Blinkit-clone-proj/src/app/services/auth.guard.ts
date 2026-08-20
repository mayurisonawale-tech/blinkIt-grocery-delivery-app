import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';

/**
 * Blocks the shopping routes for signed-out visitors and sends them to the
 * login page, remembering where they were headed so they can be returned
 * there afterwards.
 *
 * localStorage is the source of truth rather than the login BehaviorSubject,
 * because the subject resets to false on a page reload and the guard runs
 * before AppComponent has restored it.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    if (localStorage.getItem('user')) {
      return true;
    }

    return this.router.createUrlTree(['/user/login'], {
      queryParams: { returnUrl: state.url }
    });
  }
}
