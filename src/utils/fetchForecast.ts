import { fetchWeatherApi } from 'openmeteo';
import { ForecastData } from '@/types/weather';

export async function fetchForecastData(
  latitude: number,
  longitude: number,
  hoursToCheck: number,
): Promise<ForecastData> {
  const params = {
    latitude,
    longitude,
    hourly: ['wind_speed_10m', 'precipitation', 'temperature_2m', 'visibility'],
    timezone: 'auto',
  };

  const response = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
  const data = response[0];
  const hourly = data.hourly()!;

  const timestamps = Array.from(hourly.time()! as unknown as string[]);
  const now = Date.now();
  let latestIndex = 0;

  for (let i = 0; i < timestamps.length; i++) {
    const ts = new Date(timestamps[i]).getTime();
    if (ts <= now) latestIndex = i;
    else break;
  }

  return {
    current: {
      wind: hourly.variables(0)!.valuesArray()![latestIndex], // wind_speed_10m
      rain: hourly.variables(1)!.valuesArray()![latestIndex], // precipitation
      temp: hourly.variables(2)!.valuesArray()![latestIndex], // temperature_2m
      visibility: hourly.variables(2)!.valuesArray()![latestIndex], // visibility
    },
    wind: Array.from(hourly.variables(0)!.valuesArray()!).slice(0, hoursToCheck),
    rain: Array.from(hourly.variables(1)!.valuesArray()!).slice(0, hoursToCheck),
    temp: Array.from(hourly.variables(2)!.valuesArray()!).slice(0, hoursToCheck),
    visbility: Array.from(hourly.variables(2)!.valuesArray()!).slice(0, hoursToCheck),
  };
}
