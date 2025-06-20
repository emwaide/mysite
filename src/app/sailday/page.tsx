'use client';

import { useState } from 'react';
import SailingForm from '@/components/sailday/SailingForm';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';

export default function SaildayPage() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [reason, setReason] = useState<string | null>(null);
  const [details, setDetails] = useState<ScoreDetail[] | null>(null);
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const icons: Record<string, string> = {
    Temperature: '🌡️',
    Rainfall: '🌧️',
    Wind: '💨',
    'Wave Height': '🌊',
    'Swell Height': '📈',
  };

  return (
    <main role="main" className="min-h-screen lg:snap-start flex items-center px-6" id="about">
      <div className="max-w-5xl mx-auto w-full space-y-12 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          {/* Left panel: Form and Map */}
          <div className="md:col-span-2 text-base text-gray-700 space-y-4">
            <header>
              <div className="text-center">
                <h1 className="text-7xl font-extrabold text-primary tracking-wide uppercase">
                  SAILDAY
                </h1>
                <h2 className="text-2xl text-accent tracking-widest font-mono border-b-2 border-primary pb-2 w-fit">
                  Your first mate for fair-weather sailing.
                </h2>
              </div>
            </header>

            <div
              className="grid grid-cols-1 gap-6 px-8 py-10 bg-white rounded-xl shadow"
              role="form"
              aria-labelledby="sailing-form-heading"
            >
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

              {/* <div
                className="h-64 lg:h-full rounded-md bg-aqua flex items-center justify-center"
                role="img"
                aria-label="Map placeholder"
              >
                <span className="text-xl font-semibold text-[#07004D]">MAP</span>
              </div> */}
            </div>
          </div>

          {/* Right panel: Results */}
          <div className="md:col-span-3 flex items-start h-full">
            <div className="relative w-full h-full space-y-12">
              {/* Current Conditions */}
              <section
                className="px-8 py-10 bg-primary-600 rounded-xl transition-all duration-500 ease-in-out"
                aria-labelledby="conditions-heading"
              >
                <h2 id="conditions-heading" className="text-xl font-bold mb-6 text-white">
                  Current Conditions
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
                  {!lat || !lon ? (
                    <p className="text-sm text-gray-600 col-span-full">
                      Enter latitude and longitude to check conditions.
                    </p>
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
                          className="bg-white rounded-xl shadow p-4 flex flex-wrap items-start justify-between gap-4 sm:items-center hover:outline hover:outline-2 hover:outline-primary"
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
              </section>

              {/* Verdict Panel */}
              <section
                className="px-8 py-10 bg-primary text-center rounded-xl shadow"
                aria-labelledby="verdict-heading"
                aria-live="polite"
              >
                <h2 id="verdict-heading" className="text-xl font-bold mb-4 text-white">
                  Sail Verdict
                </h2>
                <div className="inline-block px-6 py-4 border border-white rounded-xl min-h-[88px] w-full bg-white/30 text-white font-semibold whitespace-pre-wrap">
                  {loading ? 'Checking conditions...' : reason || 'No data yet.'}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Attribution */}
        <footer className="w-full flex justify-center mt-12">
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:text-rose transition"
          >
            Created with{' '}
            <span className="font-semibold" aria-label="Open Meteo website">
              Open‑Meteo
            </span>
          </a>
        </footer>
      </div>
    </main>
  );
}
