// ./src/app/welcome-page/welcome-page.component.ts
import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

/**
 * Component serving as the entry point of the application, displaying the welcome page.
 * 
 * This component provides users with options to either log in or register through dialogs,
 * facilitating user access to the application's features. It leverages Angular Material dialogs
 * to present `UserLoginFormComponent` and `UserRegistrationFormComponent` for these purposes.
 */
@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {

  /**
   * Constructs the WelcomePageComponent with necessary dependencies.
   * 
   * @param dialog Service for opening Angular Material dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /**
   * A lifecycle hook that is called after Angular has initialized the component.
   * Can be used for component initialization logic.
   */
  ngOnInit(): void {
  }

  /**
   * Opens the user registration dialog.
   * 
   * This method triggers the display of the `UserRegistrationFormComponent` within a dialog,
   * allowing new users to register. The dialog width is set to 280px.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens the user login dialog.
   * 
   * This method triggers the display of the `UserLoginFormComponent` within a dialog,
   * allowing existing users to log in. The dialog width is set to 280px.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
