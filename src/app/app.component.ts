import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterOutlet } from '@angular/router';
import {AsyncPipe} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'AngularSolar';
   loading$: Observable<boolean>;

    constructor(private router: Router) {
      this.loading$ = this.router.events.pipe(
        map(event => {
          switch (true) {
            case event instanceof NavigationStart: {
              return true;
            }
            case event instanceof NavigationEnd:
            case event instanceof NavigationCancel:
            case event instanceof NavigationError: {
              return false;
            }
            default: {
              return false;
            }
          }
        })
      );
    }

}
