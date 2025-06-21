'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import SailingForm from '@/components/sailday/SailingForm';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';
import ForecastGraph from '@/components/sailday/ForecastGraph';
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
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  const [hasMapLoaded, setHasMapLoaded] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(false);

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
        scrollAnchorRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        scrollAnchorRef.current?.focus({ preventScroll: true });
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
  const previousCoords = useRef({ lat: '', lon: '' });

  const memoisedMap = useMemo(() => {
    if (!lat || !lon) return null;
    return <LocationMap lat={lat} lon={lon} />;
  }, [lat, lon]);

  useEffect(() => {
    if (lat && lon && (lat !== previousCoords.current.lat || lon !== previousCoords.current.lon)) {
      previousCoords.current = { lat, lon };
      setIsMapLoading(true);
      const timeout = setTimeout(() => {
        setIsMapLoading(false);
        setHasMapLoaded(true);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [lat, lon]);

  return (
    <main className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory bg-primary text-white overscroll-none">
      {/* Hero Section */}
      <section className="min-h-screen snap-start flex flex-col justify-center text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-widest uppercase">
              SAILDAY
            </h1>
            <p className="text-xl sm:text-2xl text-stone-300 tracking-widest font-mono border-b-2 border-white pb-4 inline-block">
              Your first mate for fair-weather sailing.
            </p>
            <section
              aria-label="Sailing location map"
              className="rounded-md overflow-hidden shadow bg-stone-100 h-64 flex items-center justify-center"
            >
              {!lat || !lon ? (
                <div className="text-primary/60 text-center text-sm sm:text-base font-mono italic px-4">
                  Choose a location to preview the map
                </div>
              ) : isMapLoading && !hasMapLoaded ? (
                <div className="w-full h-full animate-pulse bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                  <span className="text-stone-400 font-mono">Loading map...</span>
                </div>
              ) : (
                memoisedMap
              )}
            </section>
          </div>
          <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow px-8 py-10">
            <SailingForm
              lat={lat}
              lon={lon}
              setLat={setLat}
              setLon={setLon}
              loading={loading}
              onSubmit={checkConditions}
              idPrefix="hero"
            />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSubmitted && (
        <section
          ref={scrollAnchorRef}
          tabIndex={-1}
          className="min-h-screen snap-start w-full overflow-y-auto flex flex-col items-center justify-center px-6 py-12 pb-12 bg-primary text-white"
          aria-labelledby="conditions-heading"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            {/* Sidebar: Form + Map */}
            <aside className="hidden lg:block order-2 lg:order-1 space-y-6">
              <section aria-labelledby="sidebar-form-heading">
                <div className="bg-white text-black rounded-xl shadow px-6 py-8">
                  <SailingForm
                    lat={lat}
                    lon={lon}
                    setLat={setLat}
                    setLon={setLon}
                    loading={loading}
                    onSubmit={checkConditions}
                    idPrefix="sidebar"
                  />
                </div>
              </section>
              <section
                aria-label="Sailing location map"
                className="rounded-md overflow-hidden shadow bg-stone-100 h-64 flex items-center justify-center"
              >
                {!lat || !lon ? (
                  <div className="text-primary/60 text-center text-sm sm:text-base font-mono italic px-4">
                    Choose a location to preview the map
                  </div>
                ) : isMapLoading && !hasMapLoaded ? (
                  <div className="w-full h-full animate-pulse bg-gradient-to-br from-stone-200 to-stone-300 flex items-center justify-center">
                    <span className="text-stone-400 font-mono">Loading map...</span>
                  </div>
                ) : (
                  memoisedMap
                )}
              </section>
            </aside>

            {/* Main Content: Heading, Forecast Cards, Graph */}
            <div className="order-3 lg:order-2 lg:col-span-3 space-y-8">
              {/* Heading */}
              <header>
                <h2
                  id="conditions-heading"
                  className="text-3xl sm:text-4xl font-bold tracking-widest uppercase"
                >
                  SAILDAY
                </h2>
                <p className="text-lg sm:text-xl font-mono tracking-widest">
                  Your first mate for fair-weather sailing.
                </p>
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
                          <div className="text-3xl text-black" aria-hidden="true">
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

              {/* Forecast Graph */}
              {lat && lon && forecastData && selectedVariable ? (
                <section className="pb-24 sm:pb-12" aria-labelledby="graph-desc" role="img">
                  <h2 id="graph-desc" className="sr-only">
                    Graph showing {selectedVariable} forecast for the next 12 hours
                  </h2>
                  <ForecastGraph
                    data={combinedData[selectedVariable] ?? []}
                    timestamps={forecastData?.timestamps ?? marineData?.timestamps ?? []}
                    label={selectedVariable ?? ''}
                  />
                </section>
              ) : (
                <section className="pb-24 sm:pb-12">
                  <div className="flex justify-center h-80 items-center bg-accent-200 bg-center bg-cover text-center text-white text-center text-sm sm:text-base font-mono italic px-4">
                    Select weather item to show graph
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
