import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass'], 
})
export class AutocompleteComponent implements AfterViewInit {
  @ViewChild('addressInput') addressInput!: ElementRef;
  @Output() coordinatesSelected = new EventEmitter<{lat: number, lng: number}>();


  async ngAfterViewInit() {
    await this.loadGoogleMapsApi();

    if (typeof google !== 'undefined' && google.maps) {
      console.log("Google Maps API est chargé.");
      const autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement, {
        componentRestrictions: { country: ['fr'] },
        fields: ['address_components', 'geometry'],
        types: ['address'],
      });

      autocomplete.addListener("place_changed", () => this.fillInAddress(autocomplete));
    } else {
      console.error("Google Maps API n'est pas chargé.");
    }
  }

  private async loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any)['google'] && (window as any)['google'].maps) {
        resolve();
        return;
      }
  
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(); 
      document.head.appendChild(script); 
    });
  }

  private fillInAddress(autocomplete: google.maps.places.Autocomplete) {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      this.coordinatesSelected.emit({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  }
}