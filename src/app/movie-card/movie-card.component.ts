// ./src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

/**
 * Component responsible for displaying a collection of movie cards.
 * 
 * Each card presents information about a movie, including its title and available actions like
 * viewing genre, director, and synopsis information, and toggling the movie as a favorite.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  /**
   * Array of movies fetched from the API.
   */
  movies: any[] = [];
  /**
   * Array of user's favorite movies.
   */
  favoriteMovies: any[] = [];
    /**
   * User information, potentially including favorite movies.
   */
  user: any = {};
    /**
   * Object holding user data including username and favoriteMovies array.
   */
  userData = { username: "", favoriteMovies: []};
    /**
   * Indicates if the current movie is marked as a favorite.
   */
  isFavMovie: boolean = false;

  /**
   * Constructs the MovieCardComponent with necessary dependencies.
   * 
   * @param fetchApiData Service for fetching data from the backend API.
   * @param matDialog Service for opening Material dialogs.
   * @param snackBar Service for displaying snack bar notifications.
   */
  constructor(public fetchApiData: FetchApiDataService,
    public matDialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

  /**
   * Lifecycle hook that is called after Angular has initialized the component.
   * Fetches the list of movies and user's favorite movies.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  
  /**
   * Fetches the list of all movies from the backend.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      // Check if localStorage item exists before parsing
      const userItem = localStorage.getItem('user');
      if (userItem) {
        const user = JSON.parse(userItem);
        console.log('username: ' + user.username + ' favorite movies: ' + user.favoriteMovies.join(', '));
      } else {
        console.log('User not found in localStorage.');
      }
      return this.movies;
    });
  }
  
  /**
   * Fetches the list of favorite movies for the current user.
   */
  getFavoriteMovies(): void {
    // Check if localStorage item exists before parsing
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const user = JSON.parse(userItem);
      if (user.favoriteMovies && user.favoriteMovies.length) {
        // Directly use favoriteMovies from the user object stored in localStorage
        this.favoriteMovies = user.favoriteMovies;
        console.log('Fav Movies in getFavMovie', this.favoriteMovies);
      } else {
        console.log('No favorite movies found or user is not logged in.');
      }
    } else {
      console.log('User not found in localStorage for favorite movies.');
    }
  }
  
  /**
   * Checks if a movie is marked as a favorite by the current user.
   * 
   * @param movieId The ID of the movie to check.
   * @returns A boolean value indicating whether the movie is marked as a favorite.
   */
  isFavoriteMovie(movieId: string): boolean {
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const user = JSON.parse(userItem);
      // Check against IDs in the user's favoriteMovies list
      return user.favoriteMovies.includes(movieId);
    }
    return false;
  }    
  
  /**
   * Toggles the favorite status of a movie.
   * 
   * @param movieId The ID of the movie to toggle as a favorite.
   */
  toggleFavorite(movieId: string): void {
    const userItem = localStorage.getItem('user');
    if (userItem) {
      const user = JSON.parse(userItem);
      const username = user.username; 
      const movie = this.movies.find(m => m._id === movieId);
      if (!movie) {
        console.error('Movie not found');
        return;
      }
      const movieTitle = movie.Title; // Now you have the title for API calls
      const isFavorite = user.favoriteMovies.includes(movieId);
  
      if (isFavorite) {
        // Remove from favorites using the title
        this.fetchApiData.removeFavoriteMovie(username, movieTitle).subscribe(response => {
          console.log("Removed from favorites:", response);
          const index = user.favoriteMovies.indexOf(movieId);
          if (index > -1) {
            user.favoriteMovies.splice(index, 1); // Update local favorites list
            localStorage.setItem('user', JSON.stringify(user));
          }
        }, error => console.error(error));
      } else {
        // Add to favorites using the title
        this.fetchApiData.addFavoriteMovie(username, movieTitle).subscribe(response => {
          console.log("Added to favorites:", response);
          user.favoriteMovies.push(movieId); // Update local favorites list
          localStorage.setItem('user', JSON.stringify(user));
        }, error => console.error(error));
      }
    }
  }

  /**
   * Opens a dialog displaying detailed information about a movie director.
   * 
   * @param name The name of the director.
   * @param bio A brief biography of the director.
   * @param birth The birth date of the director.
   * @param death The death date of the director, if applicable.
   */
  getDirectorInfo(name: string, bio: string, birth: string, death: string): void {
    this.matDialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog displaying detailed information about a movie genre.
   * 
   * @param name The name of the genre.
   * @param description A description of the genre.
   */
  getGenreInfo(name: string, description: string): void {
    this.matDialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '450px',
    });
  }

  /**
   * Opens a dialog displaying detailed information about a movie.
   * 
   * @param name The title of the movie.
   * @param description A description of the movie.
   */
  getMovieInfo(name: string, description: string ): void {
    this.matDialog.open(MovieInfoComponent, {
      data: {
        Title: name,
        Description: description,
      },
      width: '450px',
    });
  }

}
