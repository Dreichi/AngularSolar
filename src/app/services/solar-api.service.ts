import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DataLayersResponse, BuildingInsightsResponse, LatLng, GeoTiff, Bounds } from '../models/solar.model';
import * as geotiff from 'geotiff';

@Injectable({
  providedIn: 'root'
})
export class SolarApiService {

  constructor(private http: HttpClient) {}

  private apiUrl = 'https://solar.googleapis.com/v1';

  findClosestBuilding(location: LatLng, apiKey: string = environment.apiKey): Observable<BuildingInsightsResponse> {
    const params = {
      'location.latitude': location.latitude.toFixed(5),
      'location.longitude': location.longitude.toFixed(5),
      requiredQuality: 'LOW',
      key: apiKey,
    };
    const searchParams = new URLSearchParams(params).toString();
    return this.http.get<BuildingInsightsResponse>(`${this.apiUrl}/buildingInsights:findClosest?${searchParams}`);
  }

  getDataLayerUrls(location: LatLng, radiusMeters: number, apiKey: string = environment.apiKey): Observable<DataLayersResponse> {
    const params = {
      'location.latitude': location.latitude.toFixed(5),
      'location.longitude': location.longitude.toFixed(5),
      'radius_meters': radiusMeters.toString(),
      'view': 'FULL_LAYERS',
      'required_quality': 'LOW',
      'pixelSizeMeters': '0.5',
      key: apiKey
    };
    const searchParams = new URLSearchParams(params).toString();
    return this.http.get<DataLayersResponse>(`${this.apiUrl}/dataLayers:get?${searchParams}`);
  }
}
