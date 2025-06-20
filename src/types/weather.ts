export type MarineData = {
  current: {
    wave: number;
    swell: number;
    swellDir: number;
    timestamp: string;
  };
  wave: number[];
  swell: number[];
  swellDir: number[];
};

export type ForecastData = {
  current: {
    wind: number;
    rain: number;
    temp: number;
    visibility: number;
  };
  wind: number[];
  rain: number[];
  temp: number[];
  visibility: number[];
};
