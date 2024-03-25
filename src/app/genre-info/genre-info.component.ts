// ./src/app/genre-info/genre-info.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying information about a movie genre.
 * 
 * This component is utilized to present a dialog containing details about a specific genre,
 * including its name and a description.
 */
@Component({
  selector: 'app-genre-info',
  templateUrl: './genre-info.component.html',
  styleUrls: ['./genre-info.component.scss'] // Corrected property name from styleUrl to styleUrls
})
export class GenreInfoComponent {
  /**
   * Constructs an instance of the `GenreInfoComponent`.
   * 
   * @param data An object containing the genre's information. This data is injected into the component
   *             by Angular Material's dialog service.
   * @param data.Name The name of the genre.
   * @param data.Description A description of the genre, detailing its defining characteristics and themes.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      Name: string,
      Description: string
    }
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This is where initialization logic for the component can be placed.
   */
  ngOnInit(): void {
    // Initialization logic for the component can go here.
  }
}
