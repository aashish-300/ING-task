import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private service: AuthService) {}

  userRole!: string | undefined;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const allowedRoles = route.data['allowedRoles'];
    this.userRole = this.getUserRole();
    if (allowedRoles.includes(this.userRole)) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
  getUserRole(): string | undefined {
    this.service.getUserRole().subscribe({
      next: (rol: string | undefined) => {
        return (this.userRole = rol);
      },
    });
    return this.userRole;
  }
}
