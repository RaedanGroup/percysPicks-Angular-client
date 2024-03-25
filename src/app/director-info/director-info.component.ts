// ./src/app/director-info/director-info.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying information about a movie director.
 * 
 * This component is designed to be used as a dialog that presents detailed information about a director,
 * including their name, biography, birth date, and death date (if applicable).
 */
@Component({
  selector: 'app-director-info',
  templateUrl: './director-info.component.html',
  styleUrls: ['./director-info.component.scss'] // Note: Corrected property name from styleUrl to styleUrls
})
export class DirectorInfoComponent {
  /**
   * Creates an instance of `DirectorInfoComponent`.
   * 
   * @param data An object containing the director's information. This data is injected into the component
   *             by Angular Material's dialog service.
   * @param data.Name The name of the director.
   * @param data.Bio A brief biography of the director.
   * @param data.Birth The birth date of the director.
   * @param data.Death The death date of the director, if applicable.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Bio: string,
      Birth: string,
      Death: string | null // Adjusted to include | null to indicate Death may not be applicable
    }
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   */
  ngOnInit(): void {
    // Component initialization logic can go here
  }
}

