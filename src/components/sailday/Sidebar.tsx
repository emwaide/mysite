import SailingForm from './SailingForm';

interface SidebarProps {
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

export default function Sidebar({
  lat,
  lon,
  setLat,
  setLon,
  loading,
  onSubmit,
  LocationMap,
  isMapLoading,
  hasMapLoaded,
}: SidebarProps) {
  const latNum = parseFloat(lat);
  const lonNum = parseFloat(lon);
  const memoisedMap =
    !isNaN(latNum) && !isNaN(lonNum) ? <LocationMap lat={latNum} lon={lonNum} /> : null;

  return (
    <aside className="hidden lg:block order-2 lg:order-1 space-y-6">
      <div className="bg-white text-black rounded-xl shadow px-6 py-8">
        <SailingForm
          lat={lat}
          lon={lon}
          setLat={setLat}
          setLon={setLon}
          loading={loading}
          onSubmit={onSubmit}
          idPrefix="sidebar"
        />
      </div>

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
  );
}
