import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SolarApiService } from '../../services/solar-api.service';
import { environment } from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { google } from 'google-maps';
import { createPalette, rgbToColor } from '../../services/visualization.service';
import { panelsPalette } from '../../colors';


declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit, AfterViewInit {
  @ViewChild('googleMap', { static: false }) mapElement: ElementRef | undefined;
  private map: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private solarApiService: SolarApiService,
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleMapsApi().then(() => {
        this.initMap();
      });
    }
  }

  private async loadGoogleMapsApi(): Promise<void> {
    return new Promise((resolve) => {
      if ((window as any)['google'] && (window as any)['google'].maps) {
        resolve();
        return;
      }
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&callback=initMap&libraries=geometry`;
      script.async = true;
      script.defer = true;
      (window as any)['initMap'] = () => { resolve(); };
      document.head.appendChild(script);
    });
  }

  private initMap(): void {
    if (this.mapElement && this.mapElement.nativeElement) {
        const mapOptions: google.maps.MapOptions = {
            center: new google.maps.LatLng(50.433020, 2.8279100),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
        };

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.map.addListener('click', (event: { latLng: { lat: () => number; lng: () => number; }; }) => {
            const latLng = { latitude: event.latLng.lat(), longitude: event.latLng.lng() };
            this.solarApiService.findClosestBuilding(latLng).subscribe(buildingInsights => {
              console.log('Building insights:', buildingInsights);
                const solarPotential = buildingInsights.solarPotential;
                    const palette = createPalette(panelsPalette).map(rgbToColor); 
                    const minEnergy = solarPotential.solarPanels.slice(-1)[0].yearlyEnergyDcKwh;
                    const maxEnergy = solarPotential.solarPanels[0].yearlyEnergyDcKwh;
                    const solarPanels = solarPotential.solarPanels.map(panel => {
                        const [w, h] = [solarPotential.panelWidthMeters / 2, solarPotential.panelHeightMeters / 2];
                        const points = [
                            { x: +w, y: +h },
                            { x: +w, y: -h },
                            { x: -w, y: -h },
                            { x: -w, y: +h },
                            { x: +w, y: +h },
                        ];

                        const orientation = panel.orientation === 'PORTRAIT' ? 90 : 0;
                        const azimuth = solarPotential.roofSegmentStats[panel.segmentIndex].azimuthDegrees;
                        const colorIndex = Math.round((panel.yearlyEnergyDcKwh - minEnergy) / (maxEnergy - minEnergy) * (palette.length - 1));
                        return new google.maps.Polygon({
                          paths: points.map(({ x, y }) =>
                          google.maps.geometry.spherical.computeOffset(
                            new google.maps.LatLng(panel.center.latitude, panel.center.longitude),
                            Math.sqrt(x ** 2 + y ** 2),
                            Math.atan2(y, x) * (180 / Math.PI) + orientation + azimuth
                            )
                            ),
                            strokeColor: '#B0BEC5',
                            strokeOpacity: 0.9,
                            strokeWeight: 1,
                            fillColor: palette[colorIndex],
                            fillOpacity: 0.9,
                          });
                        });
                        
                    solarPanels.forEach(panel => panel.setMap(this.map));
                }, error => {
                    console.error('Error fetching solar potential:', error);
                });
            });
        }
    }
    }