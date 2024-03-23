import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrl: './movie-info.component.scss'
})

export class MovieInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)

  public data: {
    Description: string
  }
  ) {}
  ngOnInit(): void {
  }
}
