import { fetchWeatherApi } from 'openmeteo';
import { MarineData } from '@/types/weather';

export async function fetchMarineData(
  latitude: number,
  longitude: number,
  hoursToCheck: number,
): Promise<MarineData> {
  const params = {
    latitude,
    longitude,
    hourly: ['wave_height', 'swell_wave_height', 'swell_wave_direction'],
  };

  const response = await fetchWeatherApi('https://marine-api.open-meteo.com/v1/marine', params);
  const data = response[0].hourly()!;

  return {
    wave: Array.from(data.variables(0)!.valuesArray()!).slice(0, hoursToCheck),
    swell: Array.from(data.variables(1)!.valuesArray()!).slice(0, hoursToCheck),
    swellDir: Array.from(data.variables(2)!.valuesArray()!).slice(0, hoursToCheck),
  };
}
