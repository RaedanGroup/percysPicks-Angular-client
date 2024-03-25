// ./src/app/user-profile/user-profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMoviesDetails: any[] = [];
  originalUsername: string = '';

  constructor(private fetchApiData: FetchApiDataService, public matDialog: MatDialog,) {}
  

  ngOnInit(): void {
    this.getUser();
    this.getAllMovies();
  }

  getUser(): void {
    // Assuming user data is stored in localStorage; adjust as necessary
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
          // Store the original username
      this.originalUsername = this.user.username;
    }
  }

  updateUser(): void {
    // Use the original username for the API call
    this.fetchApiData.updateUser(this.originalUsername, {
      // Include updated fields here
      email: this.user.email,
      birthday: this.user.birthday,
      // Assuming you allow changing the username, include the new username
      username: this.user.username,
      // Include other fields as necessary
    }).subscribe(response => {
      console.log("User updated successfully:", response);
      // Upon successful update, update the originalUsername in case the username was changed
      this.originalUsername = this.user.username;
      // Update localStorage or handle as needed
      localStorage.setItem('user', JSON.stringify(this.user));
      // Optionally, show a success message
    }, error => {
      console.error("Error updating user:", error);
      // Handle error
    });
  }

  getAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      this.movies = movies;
      this.filterFavoriteMovies();
    });
  }

  filterFavoriteMovies(): void {
    this.favoriteMoviesDetails = this.movies.filter(movie =>
      this.user.favoriteMovies.includes(movie._id)
    );
  }

  removeFavorite(movieId: string): void {
    const username = this.user.username;
    // Find the movie object to get its title
    const movie = this.movies.find(m => m._id === movieId);
    if (!movie) {
      console.error('Movie not found');
      return;
    }
    const movieTitle = movie.Title; // Get the title for the API call
  
    this.fetchApiData.removeFavoriteMovie(username, movieTitle).subscribe(response => {
      console.log("Removed from favorites:", response);
      // Remove the movie ID from the user's favorites
      const index = this.user.favoriteMovies.indexOf(movieId);
      if (index > -1) {
        this.user.favoriteMovies.splice(index, 1); // Update local favorites list
        localStorage.setItem('user', JSON.stringify(this.user)); // Persist the updated user data
        this.filterFavoriteMovies(); // Refresh the favorite movies list in the UI
      }
    }, error => {
      console.error('Failed to remove favorite:', error);
    });
  }
  
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

  getGenreInfo(name: string, description: string): void {
    this.matDialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description
      },
      width: '450px',
    });
  }

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
