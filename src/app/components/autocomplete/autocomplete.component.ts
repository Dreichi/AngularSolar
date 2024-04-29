import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps'; // Assurez-vous que cette importation est correcte
import { environment } from '../../../environments/environment'; // Pour la clé API

@Component({
  standalone: true,
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass'], // Modifiez selon votre structure
})
export class AutocompleteComponent implements AfterViewInit {
  @ViewChild('addressInput') addressInput!: ElementRef;

  async ngAfterViewInit() {
    await this.loadGoogleMapsApi(); // Attendez que le script soit chargé

    if (typeof google !== 'undefined' && google.maps) {
      console.log("Google Maps API est chargé.");
      const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, {
        componentRestrictions: { country: ['fr'] },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      });

      autocomplete.addListener("place_changed", this.fillInAddress.bind(this));
    } else {
      console.error("Google Maps API n'est pas chargé.");
    }
  }

  private async loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any)['google'] && (window as any)['google'].maps) {
        resolve(); // Google Maps API est déjà chargé
        return;
      }
  
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(); // Résout la promesse lorsque le script est chargé
      document.head.appendChild(script); // Ajoute le script au document
    });
  }

  private fillInAddress() {
    // Implémentation de la fonction de remplissage d'adresse
  }
}