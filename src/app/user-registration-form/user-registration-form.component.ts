// ./src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Component for rendering and handling the user registration form.
 * 
 * Captures user input for username, password, email, and birthday, and communicates with the backend
 * to register a new user. Upon successful registration, it closes the registration form dialog and
 * displays a success notification. If registration fails, an error notification is shown.
 */
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  /**
   * User data model for the registration form, bound to form input fields.
   * 
   * Includes fields for username, password, email, and birthday to be filled out by the user.
   */
  @Input() userData = { username: '', password: '', email: '', birthday: '' };

  /**
   * Constructs the UserRegistrationFormComponent with injected dependencies.
   * 
   * @param fetchApiData Service for API calls, used here to communicate user registration details to the backend.
   * @param dialogRef Reference to the dialog that contains this component, used for closing the dialog on successful registration.
   * @param snackBar Service for displaying snack bar notifications.
   */
  constructor(
      public fetchApiData: FetchApiDataService,
      public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
      public snackBar: MatSnackBar) { }

  /**
   * A lifecycle hook that is called after Angular has initialized the component.
   */
  ngOnInit(): void {
  }

  /**
   * Registers a new user using the details provided in the registration form.
   * 
   * Upon successful registration, closes the registration form dialog and displays a success notification.
   * If registration fails, displays an error notification with the received error message.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
      // Closes the registration form dialog
      this.dialogRef.close();
      // Displays a success notification
      this.snackBar.open('user registerd successfully!', 'OK', {
        duration: 2000
      });
    }, (result) => {
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

}