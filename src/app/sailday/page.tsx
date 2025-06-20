'use client';

import { useState } from 'react';
import SailingForm from '@/components/SailingForm';
import SailingResults from '@/components/SailingResults';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';

export default function Home() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [verdict, setVerdict] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState<ScoreDetail[] | null>(null);
  const [loading, setLoading] = useState(false);

  const checkConditions = async (latitude: number, longitude: number) => {
    setVerdict(null);
    setScore(null);
    setReason(null);
    setLoading(true);
    setDetails(null);

    try {
      const hoursToCheck = 6;

      const [marineData, forecastData] = await Promise.all([
        fetchMarineData(latitude, longitude, hoursToCheck),
        fetchForecastData(latitude, longitude, hoursToCheck),
      ]);

      const result = scoreSailingConditions({
        marine: marineData,
        forecast: forecastData,
      });

      setScore(result.score);
      setVerdict(result.verdict);
      setReason(
        result.details
          .filter(d => !d.passed)
          .map(d => `❌ ${d.label}: ${d.value}`)
          .join('\n') || 'Conditions look good!',
      );
      setDetails(result.details);
    } catch (err) {
      console.error(err);
      setVerdict('❌ Could not fetch forecast data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Can I Sail Today?</h1>

      <SailingForm
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
        loading={loading}
        onSubmit={checkConditions}
      />

      {verdict && (
        <SailingResults verdict={verdict} score={score} reason={reason} details={details} />
      )}

      <a
        href="https://open-meteo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-sm text-gray-500 hover:text-gray-700 transition"
      >
        Created with{' '}
        <span className="font-semibold" aria-label="Open Meteo website">
          Open‑Meteo
        </span>
      </a>
    </main>
  );
}
