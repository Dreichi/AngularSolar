import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { Loader } from '@googlemaps/js-api-loader';
import { environment } from "../../../environments/environment";
import { PlaceAutocompleteComponent } from '../../google-places/google-places.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    NgxGpAutocompleteModule,
    PlaceAutocompleteComponent,
  ],
  providers: [
    {
    provide: Loader,
      useValue: new Loader({
        apiKey: environment.googleMapsApiKey,
        libraries: ['places']
      })
    },
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent {
  title = 'Accueil';

}
