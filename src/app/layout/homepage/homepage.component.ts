import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FooterComponent } from '../../shared/footer/footer.component';
import AOS from 'aos';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    FooterComponent,
    AutocompleteComponent,
    RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent implements OnInit{
  title = 'Accueil';
lng: any;

selectedCoordinates: { lat: number, lng: number } | null = null;

constructor(private router: Router) {}



  ngOnInit() {
    AOS.init();
  }

  onCoordinatesSelected(coordinates: {lat: number, lng: number}) {
    this.selectedCoordinates = coordinates; 
  }

  navigateToMap() {
    if (this.selectedCoordinates) {
      const queryParams = {
        lat: this.selectedCoordinates.lat,
        lng: this.selectedCoordinates.lng
      };
      this.router.navigate(['/map'], { queryParams });
    }
  }
}
