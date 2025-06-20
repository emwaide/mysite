'use client';

import { useState, useRef } from 'react';
import SailingForm from '@/components/sailday/SailingForm';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';

export default function SaildayPage() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [details, setDetails] = useState<ScoreDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const checkConditions = async (latitude: number, longitude: number) => {
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

      setReason(
        result.details
          .filter(d => !d.passed)
          .map(d => `❌ ${d.label}: ${d.value}`)
          .join('\n') || 'Conditions look good!',
      );
      setDetails(result.details);
      setHasSubmitted(true);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const icons: Record<string, string> = {
    Temperature: '🌡️',
    Rain: '🌧',
    Wind: '💨',
    'Wave Height': '🌊',
    'Swell Height': '📈',
    Visibility: '👓',
  };

  const LocationMap = dynamic(() => import('@/components/sailday/LocationMap'), { ssr: false });

  return (
    <main role="main" className="snap-y snap-mandatory overflow-y-scroll h-screen bg-primary">
      <section className="h-screen snap-start flex items-center justify-center px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl w-full items-center">
          <div className="text-left">
            <h1 className="text-7xl font-bold text-white tracking-widest uppercase mb-4">
              SAILDAY
            </h1>
            <p className="text-2xl text-stone-300 tracking-widest font-mono border-b-2 border-white pb-6 inline-block">
              Your first mate for fair-weather sailing.
            </p>
          </div>
          <div className="w-full max-w-md bg-white rounded-xl shadow px-8 py-10">
            <h2 id="sailing-form-heading" className="sr-only">
              Enter location to check sailing conditions
            </h2>
            <SailingForm
              lat={lat}
              lon={lon}
              setLat={setLat}
              setLon={setLon}
              loading={loading}
              onSubmit={checkConditions}
            />
          </div>
        </div>
      </section>
      {hasSubmitted && (
        <section
          ref={resultsRef}
          className="min-h-screen snap-start w-full overflow-y-auto flex flex-col items-center justify-center px-6 py-12"
        >
          <div className="grid grid-cols-4 gap-6 w-full max-w-7xl">
            <div className="lg:col-span-1 space-y-4">
              <div className="w-full bg-white rounded-xl shadow px-8 py-10 flex flex-col">
                <h2 id="sailing-form-heading" className="sr-only">
                  Enter location to check sailing conditions
                </h2>
                <SailingForm
                  lat={lat}
                  lon={lon}
                  setLat={setLat}
                  setLon={setLon}
                  loading={loading}
                  onSubmit={checkConditions}
                />
                <a
                  href="https://open-meteo.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 text-sm text-primary text-center hover:text-rose transition"
                >
                  Created with <span className="font-semibold">Open‑Meteo</span>
                </a>
              </div>

              <div className="h-64 rounded-md overflow-hidden shadow">
                {lat && lon && <LocationMap lat={lat} lon={lon} />}
              </div>
            </div>

            {/* Right side: Conditions */}
            <div
              className="lg:col-span-3 space-y-4 text-base text-gray-700"
              aria-labelledby="conditions-heading"
            >
              <div className="flex space-x-4 items-end p-2">
                <h2 className="text-4xl font-bold text-white tracking-widest uppercase">SAILDAY</h2>
                <p className="text-xl font-mono text-white tracking-widest">
                  Your first mate for fair-weather sailing.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 min-h-[300px]">
                {!lat || !lon ? (
                  <div className="col-span-full flex items-center justify-center min-h-[300px]">
                    <p className="text-xl text-white text-center">
                      Enter latitude and longitude to check conditions.
                    </p>
                  </div>
                ) : loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="animate-pulse bg-white rounded-xl shadow p-4 h-24"
                      aria-hidden="true"
                    >
                      <div className="flex space-x-4">
                        <div className="w-10 h-10 bg-gray-200 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4" />
                          <div className="h-3 bg-gray-200 rounded w-1/2" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : details ? (
                  details.map(({ label, value, passed }) => {
                    const icon = icons[label] || '🌤️';
                    return (
                      <div
                        key={label}
                        className="bg-white rounded-xl shadow p-4 flex flex-wrap items-start justify-between gap-4 sm:items-center hover:outline hover:outline-2 hover:outline-aqua hover:bg-stone-100"
                        role="group"
                        aria-label={`${label}: ${value}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-3xl" aria-hidden="true">
                            {icon}
                          </div>
                          <div>
                            <p className="font-semibold text-primary">{label}</p>
                            <p className="text-sm text-gray-600">{value}</p>
                          </div>
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium whitespace-nowrap ${
                            passed ? 'bg-green-200 text-primary' : 'bg-red-200 text-primary'
                          }`}
                        >
                          {passed ? 'Set Sail' : 'Keep at Anchor'}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full h-24 flex items-center justify-center text-gray-400 italic">
                    No data to display.
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
