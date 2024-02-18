import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SolarApiService {
  constructor(private http: HttpClient) {}

  findClosestBuilding(latitude: number, longitude: number, apiKey: string) {
    const params = {
      'location.latitude': latitude.toFixed(5),
      'location.longitude': longitude.toFixed(5),
      key: apiKey,
    };
    return this.http.get(`https://solar.googleapis.com/v1/buildingInsights:findClosest`, { params });
  }
}
