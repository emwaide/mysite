export type MarineDataKey = {
  [K in keyof MarineData]: MarineData[K] extends number[] ? K : never;
}[keyof MarineData];

export type MarineData = {
  current: {
    waveheight: number;
    swellheight: number;
    swelldirection: number;
    timestamp: string;
  };
  waveheight: number[];
  swellheight: number[];
  swelldirection: number[];
  timestamps: string[];
};

export type ForecastDataKey = {
  [K in keyof ForecastData]: ForecastData[K] extends number[] ? K : never;
}[keyof ForecastData];

export type ForecastData = {
  current: {
    wind: number;
    rain: number;
    temperature: number;
    visibility: number;
  };
  wind: number[];
  rain: number[];
  temperature: number[];
  visibility: number[];
  timestamps: string[];
};

export type WeatherVariableKey = ForecastDataKey | MarineDataKey;
