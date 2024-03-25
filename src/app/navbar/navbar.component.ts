// ./src/app/navbar/navbar.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for rendering the navigation bar of the application.
 * 
 * Provides navigation options that allow the user to move between the movies view, their profile,
 * and to log out of the application. Logging out clears user information from local storage and
 * redirects to the welcome page.
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  /**
   * Constructs the NavbarComponent with injected dependencies.
   * 
   * @param router Angular Router for navigation between views.
   * @param snackBar Service for displaying snack bar notifications.
   */
  constructor(
  public router: Router,
  public snackBar: MatSnackBar
  ) {}
  
  /**
   * A lifecycle hook that is called after Angular has initialized the component.
   * This is where component initialization logic can be placed.
   */
  ngOnInit(): void {}

  /**
   * Navigates to the movies view.
   */
  public openMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile view.
   */
  public openProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out the current user.
   * 
   * Clears the user and token information from local storage, navigates to the welcome page,
   * and displays a logout success notification.
   */
  public logoutUser(): void {
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logout successful', 'OK', {
      duration: 2000
    })
  }
}