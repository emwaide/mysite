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
    hourly: ['wind_speed_10m', 'precipitation', 'temperature_80m', 'visibility'],
    timezone: 'auto',
  };

  const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', params);
  const response = responses[0];
  const hourly = response.hourly();
  const utcOffsetSeconds = response.utcOffsetSeconds();

  if (!hourly) throw new Error('No hourly data found.');

  const start = Number(hourly.time());
  const end = Number(hourly.timeEnd());
  const interval = hourly.interval();

  // Generate all timestamps adjusted for local timezone
  const timestampsRaw = Array.from(
    { length: Math.floor((end - start) / interval) },
    (_, i) => new Date((start + i * interval + utcOffsetSeconds) * 1000),
  );

  // Find index closest to "now"
  const now = Date.now();
  let currentIndex = 0;
  for (let i = 0; i < timestampsRaw.length; i++) {
    if (timestampsRaw[i].getTime() <= now) {
      currentIndex = i;
    } else {
      break;
    }
  }

  // Slice timestamps from current time forward
  const timestamps = timestampsRaw
    .slice(currentIndex, currentIndex + hoursToCheck)
    .map(t => t.toISOString());

  const getValues = (index: number): number[] => {
    const variable = hourly.variables(index);
    if (!variable) {
      throw new Error(`Variable at index ${index} is missing.`);
    }
    const values = variable.valuesArray?.();
    if (!values) {
      throw new Error(`valuesArray is null for variable at index ${index}.`);
    }
    return Array.from(values).slice(currentIndex, currentIndex + hoursToCheck);
  };

  // Convert units
  const convertToKnots = (kmh: number[]) => kmh.map(v => v * 0.539957);
  const convertToMiles = (metres: number[]) => metres.map(v => v * 0.000621371);

  const rawWind = getValues(0);
  const rawRain = getValues(1);
  const rawTemp = getValues(2);
  const rawVisibility = getValues(3);

  const wind = convertToKnots(rawWind);
  const rain = rawRain;
  const temperature = rawTemp;
  const visibility = convertToMiles(rawVisibility);

  return {
    current: {
      wind: wind[0],
      rain: rain[0],
      temperature: temperature[0],
      visibility: visibility[0],
    },
    wind,
    rain,
    temperature,
    visibility,
    timestamps,
  };
}
