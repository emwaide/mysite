'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import SailingForm from '@/components/sailday/SailingForm';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';
import ForecastGraph from '@/components/sailday/ForecastGraph';
import Icon from '@/components/icons/Icon';
import { ForecastData, MarineData, WeatherVariableKey } from '@/types/weather';
import 'leaflet/dist/leaflet.css';

export default function SaildayPage() {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [details, setDetails] = useState<ScoreDetail[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedVariable, setSelectedVariable] = useState<WeatherVariableKey | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [marineData, setMarineData] = useState<MarineData | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const combinedData = {
    ...(forecastData ?? {}),
    ...(marineData ?? {}),
  };

  const checkConditions = async (latitude: number, longitude: number) => {
    setLoading(true);
    setDetails(null);

    try {
      const hoursToCheck = 24;

      const [marineData, forecastData] = await Promise.all([
        fetchMarineData(latitude, longitude, hoursToCheck),
        fetchForecastData(latitude, longitude, hoursToCheck),
      ]);

      const result = scoreSailingConditions({ marine: marineData, forecast: forecastData });

      setDetails(result.details);
      setForecastData(forecastData);
      setMarineData(marineData);
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

  const normaliseLabel = (label: string) => label.toLowerCase().replace(/\s+/g, '');
  const LocationMap = dynamic(() => import('@/components/sailday/LocationMap'), { ssr: false });

  return (
    <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-primary text-white overscroll-none">
      {/* Hero Section */}
      <section className="min-h-screen snap-start flex flex-col justify-center text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest uppercase mb-4">
              SAILDAY
            </h1>
            <p className="text-xl sm:text-2xl text-stone-300 tracking-widest font-mono border-b-2 border-white pb-4 inline-block">
              Your first mate for fair-weather sailing.
            </p>
          </div>
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow px-8 py-10">
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
      {/* Results Section */}
      {hasSubmitted && (
        <section
          ref={resultsRef}
          className="min-h-screen snap-start w-full overflow-y-auto flex flex-col items-center justify-center px-6 py-12 bg-primary text-white"
          aria-labelledby="conditions-heading"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-white text-black rounded-xl shadow px-6 py-8">
                <SailingForm
                  lat={lat}
                  lon={lon}
                  setLat={setLat}
                  setLon={setLon}
                  loading={loading}
                  onSubmit={checkConditions}
                />
              </div>
              {lat && lon && (
                <div className="h-64 rounded-md overflow-hidden shadow" aria-hidden="true">
                  <LocationMap lat={lat} lon={lon} />
                </div>
              )}
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              <header className="flex flex-wrap justify-between items-end gap-4">
                <div>
                  <h2
                    id="conditions-heading"
                    className="text-3xl sm:text-4xl font-bold tracking-widest uppercase"
                  >
                    SAILDAY
                  </h2>
                  <p className="text-lg sm:text-xl font-mono tracking-widest">
                    Your first mate for fair-weather sailing.
                  </p>
                </div>
                <button
                  type="button"
                  className="h-10 text-white hover:text-aqua focus-visible:outline-aqua focus-visible:ring-4 focus-visible:ring-aqua"
                  aria-label="Adjust settings"
                >
                  <Icon name="Settings" />
                </button>
              </header>

              {/* Forecast Summary Cards */}
              <section
                role="region"
                aria-labelledby="forecast-section"
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <h3 id="forecast-section" className="sr-only">
                  Forecast Conditions
                </h3>
                {loading ? (
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
                    const key = normaliseLabel(label) as WeatherVariableKey;
                    const isSelected = selectedVariable === key;

                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedVariable(key)}
                        className={`w-full text-left bg-white rounded-xl shadow p-4 flex flex-wrap items-start justify-between gap-4 sm:items-center hover:outline-4 hover:outline-aqua hover:bg-stone-100 focus-visible:ring-4 focus-visible:ring-aqua ${
                          isSelected ? 'ring-4 ring-aqua' : ''
                        }`}
                        role="button"
                        aria-pressed={isSelected}
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
                          {passed ? 'Set Sail' : 'Anchor'}
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <p className="col-span-full text-gray-400 italic text-center">
                    No data to display.
                  </p>
                )}
              </section>

              {/* Graph Section */}
              {/* <div className="pt-6"> */}
              {lat && lon && forecastData && selectedVariable ? (
                <div role="img" aria-labelledby="graph-desc">
                  <p id="graph-desc" className="sr-only">
                    Graph showing {selectedVariable} forecast for the next 12 hours.
                  </p>
                  <ForecastGraph
                    data={combinedData[selectedVariable] ?? []}
                    timestamps={forecastData?.timestamps ?? marineData?.timestamps ?? []}
                    label={selectedVariable ?? ''}
                  />
                </div>
              ) : (
                <p className="text-white italic text-center">
                  Please select a variable to view the forecast graph.
                </p>
              )}
              {/* </div> */}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
