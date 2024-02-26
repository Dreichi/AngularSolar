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


// // src/app/app.component.ts
// import { Component, OnInit } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { SolarApiService } from './services/solar-api.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [HttpClientModule],
//   template: `
//     <h1>Solar Potential</h1>
//     <div ngIf="solarData">Imagery Date: {{solarData.imageryDate}}</div>
//   `,
//   styleUrls: ['./app.component.sass'],
//   providers: [SolarApiService]
// })
// export class AppComponent implements OnInit {
//   solarData: any;

//   constructor(private solarApi: SolarApiService) {}

//   ngOnInit() {
//     const apiKey = 'AIzaSyAP3zneVhOe5J0PfB0q6JIRO4Yoq8da86M'; 
//     const latitude = 50.4330200; 
//     const longitude = 2.8279100; 

//     this.solarApi.findClosestBuilding(latitude, longitude, apiKey)
//       .subscribe({
//         next: (data:any ) => {
//           console.log(data);
//           this.solarData = data;
//         },
//         error: (error:any ) => console.error('There was an error!', error)
//       });
//   }
// }
