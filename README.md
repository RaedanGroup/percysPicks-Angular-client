# Percys Picks - Angular Client

> Currently hosted on [GitHub Pages](https://raedangroup.github.io/percysPicks-Angular-client/welcome).

"Percy's Picks" is a single-page application (SPA) developed with Angular, showcasing a catalog of movies. Users can view movie details, explore genres and directors, and curate a list of their favorite movies.

## Features

- User authentication (login and registration).
- View a list of movies.
- View movie details including the description, genre, and director.
- Add or remove movies from their favorites list.
- View user profile and update user information.

## Getting Started

To run "Percy's Picks" locally, follow these steps:

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://cli.angular.io/)

### Installation

1. Navigate to the project directory:

```
cd percysPicks-Angular-client
```

2. Install dependencies:

```
npm install
```

3. Start the development server:

```
ng serve
```

4. Open your browser and go to http://localhost:4200.

## Usage

  - Register / Login: Start by registering as a new user or logging in.
  - Explore Movies: Browse through the collection of movies.
  - Favorites: Add movies to your favorites list for easy access.
  - Profile: View and update your profile information.

## Built With

  - Angular - Web framework
  - Angular Material - UI component library
  - RxJS - Reactive Extensions Library for JavaScript

## Components

  - NavbarComponent - Navigation bar for navigating through the app.
  - WelcomePageComponent - Landing page with options to log in or register.
  - UserLoginFormComponent - Form for existing users to log in.
  - UserRegistrationFormComponent - Form for new users to register.
  - MovieCardComponent - Displays a list of movie cards.
  - MovieInfoComponent - Dialog to show detailed information about a movie.
  - GenreInfoComponent - Dialog to show information about a movie's genre.
  - DirectorInfoComponent - Dialog to show information about a movie's director.

## Services

  - FetchApiDataService - Service for handling all HTTP requests to the backend API.

## Development Notes

  - To document TypeScript code, I use TypeDoc.
  - SCSS files are used for styling components.
  - .spec.ts files contain unit tests for components and services.

# Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
