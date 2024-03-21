import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://percys-picks-a2286948842a.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for the user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // Making the api call for All Movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call for a single movie
  public getMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call for a single director
  public getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/directors/${name}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call for a single genre
  public getGenre(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genres/${name}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call for a user
  public getUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call for a user's favorite movies
  public getFavoriteMovies(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/favorite`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call to add a movie to a user's favorites
  public addFavoriteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}/favorite/${movieId}`, {}, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call to remove a movie from a user's favorites
  public removeFavoriteMovie(username: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call to update a user's information
  public updateUser(username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Making the api call to delete a user
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
    headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
    }),
    }).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
    );
  }

  // Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

// Error handling
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}