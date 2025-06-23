import SailingForm from './SailingForm';

interface HeroSectionProps {
  lat: string;
  lon: string;
  setLat: (lat: string) => void;
  setLon: (lon: string) => void;
  loading: boolean;
  onSubmit: () => void;
  LocationMap: React.FC<{ lat: number; lon: number }>;
  isMapLoading: boolean;
  hasMapLoaded: boolean;
}

export default function HeroSection({
  lat,
  lon,
  setLat,
  setLon,
  loading,
  onSubmit,
  LocationMap,
  isMapLoading,
  hasMapLoaded,
}: HeroSectionProps) {
  const parsedLat = parseFloat(lat);
  const parsedLon = parseFloat(lon);
  const memoisedMap =
    !isNaN(parsedLat) && !isNaN(parsedLon) ? <LocationMap lat={parsedLat} lon={parsedLon} /> : null;

  return (
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
            onSubmit={onSubmit}
            idPrefix="hero"
          />
        </div>
      </div>
    </section>
  );
}
