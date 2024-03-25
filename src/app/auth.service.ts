// ./src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

/**
 * Service responsible for determining if a user can activate a route.
 * Implements the `CanActivate` interface from Angular's router module to guard routes based on authentication status.
 * 
 * This service is provided at the root level and can be injected into components and other services.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  /**
   * Constructs the authentication service.
   * 
   * @param router The Angular Router for navigating to different routes.
   */
  constructor(private router: Router) {}

  /**
   * Determines if a route can be activated based on the presence of a 'token' in local storage.
   * This method is intended to be used as a route guard to protect routes that require authentication.
   * 
   * If no token is found in local storage, the user is redirected to the welcome page, and the route activation is denied.
   * 
   * @returns A boolean value indicating whether the route can be activated.
   *          Returns `true` if the token is present, otherwise `false`.
   */
  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/welcome']); // Redirect to welcome page if token is missing
      return false;
    }
    return true;
  }
}

