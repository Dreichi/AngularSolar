export interface DataLayersResponse {
    imageryDate: Date;
    imageryProcessedDate: Date;
    dsmUrl: string;
    rgbUrl: string;
    maskUrl: string;
    annualFluxUrl: string;
    monthlyFluxUrl: string;
    hourlyShadeUrls: string[];
    imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  }
  
  export interface Bounds {
    north: number;
    south: number;
    east: number;
    west: number;
  }
  
  export interface BuildingInsightsResponse {
    name: string;
    center: LatLng;
    boundingBox: LatLngBox;
    imageryDate: Date;
    imageryProcessedDate: Date;
    postalCode: string;
    administrativeArea: string;
    statisticalArea: string;
    regionCode: string;
    solarPotential: SolarPotential;
    imageryQuality: 'HIGH' | 'MEDIUM' | 'LOW';
  }
  
  export interface SolarPotential {
    maxArrayPanelsCount: number;
    panelCapacityWatts: number;
    panelHeightMeters: number;
    panelWidthMeters: number;
    panelLifetimeYears: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: SizeAndSunshineStats;
    buildingStats: SizeAndSunshineStats;
    roofSegmentStats: RoofSegmentSizeAndSunshineStats[];
    solarPanels: SolarPanel[];
    solarPanelConfigs: SolarPanelConfig[];
    financialAnalyses: object; // Vous pouvez détailler cet objet si vous avez une structure spécifique en tête
  }
  
  export interface SizeAndSunshineStats {
    areaMeters2: number;
    sunshineQuantiles: number[];
    groundAreaMeters2: number;
  }
  
  export interface RoofSegmentSizeAndSunshineStats extends SizeAndSunshineStats {
    segmentId: any;
    index: number;
    pitchDegrees: number;
    azimuthDegrees: number;
    center: LatLng;
    boundingBox: LatLngBox;
    planeHeightAtCenterMeters: number;
  }
  
  export interface SolarPanel {
    panelHeightMeters: number;
    panelWidthMeters: number;
    center: LatLng;
    orientation: 'LANDSCAPE' | 'PORTRAIT';
    segmentIndex: number;
    yearlyEnergyDcKwh: number;
  }
  
  export interface SolarPanelConfig {
    panelsCount: number;
    yearlyEnergyDcKwh: number;
    roofSegmentSummaries: RoofSegmentSummary[];
  }
  
  export interface RoofSegmentSummary {
    pitchDegrees: number;
    azimuthDegrees: number;
    panelsCount: number;
    yearlyEnergyDcKwh: number;
    segmentIndex: number;
  }
  
  export interface LatLng {
    latitude: number;
    longitude: number;
  }
  
  export interface LatLngBox {
    sw: LatLng;
    ne: LatLng;
  }
  
  export interface GeoTiff {
    width: number;
    height: number;
    rasters: Array<number>[];
    bounds: Bounds;
  }
  
  export interface RequestError {
    error: {
      code: number;
      message: string;
      status: string;
    };
  }
  
  export type LayerId = 'mask' | 'dsm' | 'rgb' | 'annualFlux' | 'monthlyFlux' | 'hourlyShade';
  