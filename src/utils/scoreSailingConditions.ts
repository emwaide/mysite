import { MarineData, ForecastData } from '@/types/weather';

export type ScoreDetail = {
  label: string;
  value: string;
  passed: boolean;
};

export function scoreSailingConditions({
  marine,
  forecast,
}: {
  marine: MarineData;
  forecast: ForecastData;
}): { score: number; details: ScoreDetail[] } {
  let points = 0;
  const details: ScoreDetail[] = [];

  const windPass = forecast.current.wind >= 9.7 && forecast.current.wind <= 38.8;
  if (windPass) points++;
  details.push({
    label: 'Wind',
    value: `${forecast.current.wind.toFixed(1)} knots`,
    passed: windPass,
  });

  const wavePass = marine.current.waveheight < 1.5;
  details.push({
    label: 'Wave Height',
    value: `${marine.current.waveheight.toFixed(1)} metres`,
    passed: wavePass,
  });

  const swellPass = marine.current.swellheight < 1.5;
  details.push({
    label: 'Swell Height',
    value: `${marine.current.swellheight.toFixed(1)} metres`,
    passed: swellPass,
  });

  const rainPass = forecast.current.rain < 2;
  if (rainPass) points++;
  details.push({
    label: 'Rain',
    value: `${forecast.current.rain.toFixed(1)} mm/h`,
    passed: rainPass,
  });

  const tempPass = forecast.current.temperature >= 8;
  if (tempPass) points++;
  details.push({
    label: 'Temperature',
    value: `${forecast.current.temperature.toFixed(1)}°C`,
    passed: tempPass,
  });

  const visibilityPass = forecast.current.visibility >= 8;
  if (visibilityPass) points++;
  details.push({
    label: 'Visibility',
    value: `${forecast.current.visibility.toFixed(1)} miles`,
    passed: visibilityPass,
  });

  return { score: points, details };
}
