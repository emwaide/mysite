'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { fetchMarineData } from '@/utils/fetchMarine';
import { fetchForecastData } from '@/utils/fetchForecast';
import { scoreSailingConditions, ScoreDetail } from '@/utils/scoreSailingConditions';
import { ForecastData, MarineData, WeatherVariableKey } from '@/types/weather';

import HeroSection from '@/components/sailday/HeroSection';
import Sidebar from '@/components/sailday/Sidebar';
import ForecastSummary from '@/components/sailday/ForecastSummary';
import ForecastChartSection from '@/components/sailday/ForecastChart';

const LocationMap = dynamic(() => import('@/components/sailday/LocationMap'), { ssr: false });

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

  const checkConditions = async (latitude: number, longitude: number) => {
    setLoading(true);
    setDetails(null);

    try {
      const hoursToCheck = 24;
      const [marine, forecast] = await Promise.all([
        fetchMarineData(latitude, longitude, hoursToCheck),
        fetchForecastData(latitude, longitude, hoursToCheck),
      ]);

      const result = scoreSailingConditions({ marine, forecast });

      setDetails(result.details);
      setForecastData(forecast);
      setMarineData(marine);
      setHasSubmitted(true);

      setTimeout(() => {
        scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        scrollAnchorRef.current?.focus({ preventScroll: true });
      }, 200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen overflow-y-scroll scroll-smooth snap-y snap-mandatory bg-primary text-white overscroll-none">
      <HeroSection
        lat={lat}
        lon={lon}
        setLat={setLat}
        setLon={setLon}
        loading={loading}
        onSubmit={checkConditions}
        LocationMap={LocationMap}
      />

      {hasSubmitted && (
        <section
          ref={scrollAnchorRef}
          tabIndex={-1}
          className="min-h-screen snap-start w-full overflow-y-auto flex flex-col items-center justify-center px-6 py-12 pb-12 bg-primary text-white"
          aria-labelledby="conditions-heading"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 w-full">
            <Sidebar
              lat={lat}
              lon={lon}
              setLat={setLat}
              setLon={setLon}
              loading={loading}
              onSubmit={checkConditions}
              LocationMap={LocationMap}
            />

            <div className="order-3 lg:order-2 lg:col-span-3 space-y-8">
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

              <ForecastSummary
                details={details}
                loading={loading}
                selectedVariable={selectedVariable}
                setSelectedVariable={setSelectedVariable}
              />

              <ForecastChartSection
                selectedVariable={selectedVariable}
                forecastData={forecastData}
                marineData={marineData}
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
