import ForecastGraph from './ForecastGraph';
import { ForecastData, MarineData, WeatherVariableKey } from '@/types/weather';

type Props = {
  selectedVariable: WeatherVariableKey | null;
  forecastData: ForecastData | null;
  marineData: MarineData | null;
};

export default function ForecastChartSection({
  selectedVariable,
  forecastData,
  marineData,
}: Props) {
  const combined = {
    ...(forecastData ?? {}),
    ...(marineData ?? {}),
  };

  return selectedVariable && forecastData ? (
    <section className="pb-24 sm:pb-12" aria-labelledby="graph-desc" role="img">
      <h2 id="graph-desc" className="sr-only">
        Graph showing {selectedVariable} forecast for the next 12 hours
      </h2>
      <ForecastGraph
        data={combined[selectedVariable] ?? []}
        timestamps={forecastData?.timestamps ?? marineData?.timestamps ?? []}
        label={selectedVariable ?? ''}
      />
    </section>
  ) : (
    <section className="pb-24 sm:pb-12">
      <div className="flex justify-center h-80 items-center bg-accent-200 bg-center bg-cover text-center text-white text-sm sm:text-base font-mono italic px-4">
        Select weather item to show graph
      </div>
    </section>
  );
}
