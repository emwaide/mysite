import { icons, normaliseLabel } from '@/utils/constants';
import { WeatherVariableKey } from '@/types/weather';

type Detail = {
  label: string;
  value: string;
  passed: boolean;
};

type Props = {
  details: Detail[] | null;
  loading: boolean;
  selectedVariable: WeatherVariableKey | null;
  setSelectedVariable: (v: WeatherVariableKey) => void;
};

export default function ForecastSummary({
  details,
  loading,
  selectedVariable,
  setSelectedVariable,
}: Props) {
  return (
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
        <p className="col-span-full text-gray-400 italic text-center">No data to display.</p>
      )}
    </section>
  );
}
