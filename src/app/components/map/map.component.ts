import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  standalone: true,
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      import('leaflet').then(L => {
        import('esri-leaflet').then(esri => {
          this.initMap(L, esri);
        });
      });
    }
  }

  private initMap(L: any, esri: any): void {
    const map = L.map('map').setView([51.505, -0.09], 13);

    esri.basemapLayer('Imagery').addTo(map);
    esri.basemapLayer('ImageryLabels').addTo(map);

    const marker = L.marker([51.505, -0.09]).addTo(map);
    marker.bindPopup('Un exemple de marqueur.').openPopup();
  }
}
