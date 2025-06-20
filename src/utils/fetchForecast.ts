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
    hourly: ['wind_speed_10m', 'precipitation', 'temperature_2m'],
    current: ['wind_speed_10m', 'precipitation', 'temperature_2m'],
  };

  const response = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
  const data = response[0];

  const hourly = data.hourly()!;
  const current = data.current()!;

  return {
    current: {
      wind: current.variables(0)!.value(),
      rain: current.variables(1)!.value(),
      temp: current.variables(2)!.value(),
    },
    wind: Array.from(hourly.variables(0)!.valuesArray()!).slice(0, hoursToCheck),
    rain: Array.from(hourly.variables(1)!.valuesArray()!).slice(0, hoursToCheck),
    temp: Array.from(hourly.variables(2)!.valuesArray()!).slice(0, hoursToCheck),
  };
}
