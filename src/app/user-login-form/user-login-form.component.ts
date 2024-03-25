// ./src/app/user-login-form/user-login-form.component.ts
import { FetchApiDataService } from '../fetch-api-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

/**
 * Component responsible for rendering and handling the user login form.
 * 
 * It captures user input for username and password, communicates with the backend to authenticate the user,
 * and handles navigation based on the authentication result. Success leads to the movies view, while failure shows an error message.
 */
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /**
   * User data model for the login form, bound to form input fields.
   */
  @Input() userData = { username: '', password: '' };

  /**
   * Constructs the UserLoginFormComponent with injected dependencies.
   * 
   * @param FetchApiDataService The service for API calls, including user login.
   * @param dialogRef Reference to the dialog that contains this component, used for closing the dialog on successful login.
   * @param snackBar Service for displaying snack bar notifications.
   * @param router Angular Router for navigation.
   */
  constructor(
    public FetchApiDataService: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   */
  ngOnInit(): void {
    // Component initialization logic can go here.
  }

  /**
   * Authenticates the user using the provided username and password.
   * 
   * On successful authentication, stores user data and token in local storage, closes the login dialog,
   * shows a success notification, and navigates to the movies page. On failure, displays an error notification.
   */
  loginUser(): void {
    this.FetchApiDataService.userLogin(this.userData).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('token', result.token);
      this.dialogRef.close();
      this.snackBar.open('user logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.snackBar.open('login failed', 'OK', {
        duration: 2000
      });
    });
}
}