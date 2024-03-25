// ./src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';
import { MovieInfoComponent } from '../movie-info/movie-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  favoriteMovies: any[] = [];
  user: any = {};
  userData = { username: "", favoriteMovies: []};
  isFavMovie: boolean = false;


  constructor(public fetchApiData: FetchApiDataService,
    public matDialog: MatDialog,
    public snackBar: MatSnackBar,
    ) { }

    ngOnInit(): void {
      this.getMovies();
      this.getFavoriteMovies();
    }
    
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
    
    isFavoriteMovie(movieId: string): boolean {
      const userItem = localStorage.getItem('user');
      if (userItem) {
        const user = JSON.parse(userItem);
        // Check against IDs in the user's favoriteMovies list
        return user.favoriteMovies.includes(movieId);
      }
      return false;
    }    
    
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
