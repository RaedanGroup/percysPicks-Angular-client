// src/app/movie-card/movie-card.component.ts
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
      console.log(this.movies);
      console.log('username:' + localStorage['username'] + ' favorite movies: ' + this.favoriteMovies);
      return this.movies;
    });
  }

  getFavoriteMovies(): void { 
    this.user = this.fetchApiData.getUser(this.userData.username);
    this.userData.favoriteMovies = this.user.FavoriteMovies;
    this.favoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.favoriteMovies); 
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
