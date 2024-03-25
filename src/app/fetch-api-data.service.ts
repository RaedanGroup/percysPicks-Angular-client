// ./src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://percys-picks-a2286948842a.herokuapp.com/';

/**
 * Service to perform HTTP requests to the backend API for the Percy's Picks application.
 * 
 * This service includes methods for user authentication (login and registration), fetching movies,
 * managing favorite movies, and updating user information.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  /**
   * Initializes the service with the HttpClient injected.
   * @param http The Angular HttpClient for making API requests.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Registers a new user with the provided details.
   * @param userDetails An object containing the new user's details.
   * @returns An Observable of the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Logs in a user with the provided credentials.
   * @param userDetails An object containing the user's login credentials.
   * @returns An Observable of the API response, including the user token.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  /**
   * Fetches all available movies from the backend.
   * @returns An Observable array of movies.
   */
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

  /**
   * Fetches details of a single movie by title.
   * @param title The title of the movie.
   * @returns An Observable of the movie details.
   */
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

  /**
   * Fetches details of a director by name.
   * @param name The name of the director.
   * @returns An Observable of the director's details.
   */
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

  /**
   * Fetches details of a genre by name.
   * @param name The name of the genre.
   * @returns An Observable of the genre details.
   */
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
  
  /**
   * Adds a movie to a user's list of favorite movies.
   * @param username The username of the user.
   * @param movieTitle The title of the movie to add to favorites.
   * @returns An Observable of the API response.
   */
  public addFavoriteMovie(username: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}/favorite/${movieTitle}`, {}, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'  // Expect a text response
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from a user's list of favorite movies.
   * @param username The username of the user.
   * @param movieTitle The title of the movie to remove from favorites.
   * @returns An Observable of the API response.
   */
  public removeFavoriteMovie(username: string, movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/favorite/${movieTitle}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'  // Expect a text response
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Updates the information of a user.
   * @param username The username of the user to update.
   * @param userDetails An object containing the updated user details.
   * @returns An Observable of the API response.
   */
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

  /**
   * Deletes a user account.
   * @param username The username of the user to delete.
   * @returns An Observable of the API response.
   */
  public deleteUser(username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
      responseType: 'text'  // Expect a text response
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Extracts the data from the HTTP response.
   * @param res The HTTP response object.
   * @returns The body of the response or an empty object if there's no response body.
   */
  private extractResponseData(res: Object): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles errors from HTTP requests.
   * @param error The HttpErrorResponse received.
   * @returns An observable throwing an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
      return throwError('Something bad happened; please try again later.');
    } else if (error.status >= 200 && error.status < 300) {
      /** Treat successful responses differently.
       * Log or process successful responses with messages, if necessary.
       * Since the error object might actually contain a successful message,
       * you might need to parse or directly return this message.
       */
      console.log('Successful operation:', error.error);
      return throwError(error.error.text || 'Operation successful but no message returned.');
    } else {
      // The backend returned an unsuccessful response code.
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
      return throwError('Something bad happened; please try again later.');
    }
  }
}