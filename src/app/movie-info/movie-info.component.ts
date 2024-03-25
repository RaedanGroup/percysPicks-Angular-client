// ./src/app/movie-info/movie-info.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component for displaying detailed information about a movie.
 * 
 * This component is designed to present a dialog that shows detailed descriptions of a movie.
 * It is typically used to give users more in-depth insights into the plot or thematic elements of the movie,
 * enriching their browsing or viewing experience.
 */
@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss'] // Corrected property name from styleUrl to styleUrls
})
export class MovieInfoComponent {
  /**
   * Constructs an instance of `MovieInfoComponent`.
   * 
   * @param data An object containing the movie's detailed information.
   *             This data is injected into the component by Angular Material's dialog service.
   * @param data.Description The full description of the movie, providing an overview of its plot,
   *                         themes, and any other relevant information.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      Description: string
    }
  ) {}

  /**
   * A lifecycle hook that is called after Angular has initialized all data-bound properties of a directive.
   * This method can be used for any additional initialization the component may need.
   */
  ngOnInit(): void {
    // Component's initialization logic can go here.
  }
}
