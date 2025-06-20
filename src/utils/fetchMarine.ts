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
    timezone: 'auto',
  };

  const response = await fetchWeatherApi('https://marine-api.open-meteo.com/v1/marine', params);
  const data = response[0].hourly()!;

  const timestamps = Array.from(data.time()! as unknown as string[]);
  const waveValues = Array.from(data.variables(0)!.valuesArray()!);
  const swellValues = Array.from(data.variables(1)!.valuesArray()!);
  const swellDirValues = Array.from(data.variables(2)!.valuesArray()!);

  const now = Date.now();
  let latestIndex = 0;

  for (let i = 0; i < timestamps.length; i++) {
    const ts = new Date(timestamps[i]).getTime();
    if (ts <= now) latestIndex = i;
    else break;
  }

  return {
    current: {
      wave: waveValues[latestIndex],
      swell: swellValues[latestIndex],
      swellDir: swellDirValues[latestIndex],
      timestamp: timestamps[latestIndex],
    },
    wave: waveValues.slice(0, hoursToCheck),
    swell: swellValues.slice(0, hoursToCheck),
    swellDir: swellDirValues.slice(0, hoursToCheck),
  };
}
