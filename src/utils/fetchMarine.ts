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
  const hourly = response[0].hourly();

  if (!hourly) {
    throw new Error('No hourly marine data found.');
  }

  const timestamps = Array.from(hourly.time()! as unknown as string[]);
  const waveValues = Array.from(hourly.variables(0)!.valuesArray()!);
  const swellValues = Array.from(hourly.variables(1)!.valuesArray()!);
  const swellDirValues = Array.from(hourly.variables(2)!.valuesArray()!);

  const now = Date.now();

  // Find the first timestamp *after* now
  const startIndex = timestamps.findIndex(ts => new Date(ts).getTime() > now);
  const safeIndex = Math.max(0, startIndex - 1); // in case no future timestamp is found

  const sliceStart = safeIndex;
  const sliceEnd = sliceStart + hoursToCheck;

  return {
    current: {
      waveheight: waveValues[safeIndex],
      swellheight: swellValues[safeIndex],
      swelldirection: swellDirValues[safeIndex],
      timestamp: timestamps[safeIndex],
    },
    waveheight: waveValues.slice(sliceStart, sliceEnd),
    swellheight: swellValues.slice(sliceStart, sliceEnd),
    swelldirection: swellDirValues.slice(sliceStart, sliceEnd),
    timestamps: timestamps.slice(sliceStart, sliceEnd),
  };
}
