export type MarineData = {
  wave: number[];
  swell: number[];
  swellDir: number[];
};

export type ForecastData = {
  current: {
    wind: number;
    rain: number;
    temp: number;
  };
  wind: number[];
  rain: number[];
  temp: number[];
};
