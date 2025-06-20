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
}): { score: number; verdict: string; details: ScoreDetail[] } {
  let points = 0;
  const details: ScoreDetail[] = [];

  const windKnots = forecast.current.wind / 1.852;
  const windPass = windKnots >= 9.7 && windKnots <= 38.8;
  if (windPass) points++;
  details.push({ label: 'Wind', value: `${windKnots.toFixed(1)} knots`, passed: windPass });

  const wavePass = marine.current.wave < 1.5;
  details.push({
    label: 'Wave Height',
    value: `${marine.current.wave.toFixed(1)} metres`,
    passed: wavePass,
  });

  const swellPass = marine.current.swell < 1.5;
  details.push({
    label: 'Swell Height',
    value: `${marine.current.swell.toFixed(1)} metres`,
    passed: swellPass,
  });

  const rainPass = forecast.current.rain < 2;
  if (rainPass) points++;
  details.push({
    label: 'Rain',
    value: `${forecast.current.rain.toFixed(1)} mm/h`,
    passed: rainPass,
  });

  const tempPass = forecast.current.temp >= 8;
  if (tempPass) points++;
  details.push({
    label: 'Temperature',
    value: `${forecast.current.temp.toFixed(1)}°C`,
    passed: tempPass,
  });

  const visibilityPass = forecast.current.visibility >= 8;
  if (visibilityPass) points++;
  details.push({
    label: 'Visibility',
    value: `${forecast.current.visibility.toFixed(1)}metres`,
    passed: visibilityPass,
  });

  const verdict =
    points >= 5
      ? '🟢 Good sailing conditions.'
      : points >= 3
        ? '🟡 Caution: check details before going out.'
        : '🔴 Not safe to sail based on current forecast.';

  return { score: points, verdict, details };
}
