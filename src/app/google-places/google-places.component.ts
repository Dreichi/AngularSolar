import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { environment } from "../../environments/environment";
import { isPlatformBrowser } from '@angular/common';

export interface PlaceSearchResult {
  address: string;
  location?: google.maps.LatLng;
  imageUrl?: string;
  iconUrl?: string;
  name?: string;
}

@Component({
  selector: 'app-place-autocomplete',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './google-places.component.html',
  styleUrl: './google-places.component.sass'
})
export class PlaceAutocompleteComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef;
  @Input() placeholder = 'Enter address...';
  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();
  autocomplete: google.maps.places.Autocomplete | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private ngZone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

    this.loadGoogleMapsApi().then(() => {
      this.initAutocomplete();
    }).catch(error => console.error('Error loading Google Maps API', error));
  }
  }

  private initAutocomplete() {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement,
      { types: ['geocode'] }
    );

    this.autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = this.autocomplete?.getPlace();
        if (!place?.geometry) {
          console.error('Autocomplete\'s returned place contains no geometry');
          return;
        }
        const result: PlaceSearchResult = {
          address: this.inputField.nativeElement.value,
          location: place.geometry.location,
          imageUrl: this.getPhotoUrl(place),
          iconUrl: place.icon,
          name: place.name,
        };

        this.placeChanged.emit(result);
      });
    });
  }

  private getPhotoUrl(place: google.maps.places.PlaceResult | undefined): string | undefined {
    return place?.photos && place?.photos.length > 0
      ? place.photos[0].getUrl({ maxWidth: 500 })
      : undefined;
  }

  private async loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any)['google'] && (window as any)['google'].maps) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=initMap&libraries=places`;
      script.async = true;
      script.defer = true;
      (window as any)['initMap'] = () => { resolve(); };
      document.head.appendChild(script);
    });
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      google.maps.event.clearInstanceListeners(this.autocomplete);
    }
  }
}
