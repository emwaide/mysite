'use client';

import Icon from '../icons/Icon';

type Props = {
  lat: string;
  lon: string;
  setLat: (val: string) => void;
  setLon: (val: string) => void;
  loading: boolean;
  onSubmit: (lat: number, lon: number) => void;
  idPrefix?: string; // optional ID prefix to prevent duplicate IDs
};

export default function SailingForm({
  lat,
  lon,
  setLat,
  setLon,
  loading,
  onSubmit,
  idPrefix = 'sailing', // fallback prefix
}: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);
    if (isNaN(parsedLat) || isNaN(parsedLon)) {
      alert('Please enter valid coordinates.');
      return;
    }
    e.preventDefault();
    onSubmit(parseFloat(lat), parseFloat(lon));
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        setLat(position.coords.latitude.toFixed(6));
        setLon(position.coords.longitude.toFixed(6));
      },
      error => {
        console.error(error);
        alert('Could not retrieve your location. Please allow location access.');
      },
    );
  };

  // Ensure unique IDs per form instance
  const latitudeId = `${idPrefix}-latitude`;
  const longitudeId = `${idPrefix}-longitude`;

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm space-y-4 text-primary"
      aria-labelledby={`${idPrefix}-form-heading`}
    >
      <h2 id={`${idPrefix}-form-heading`} className="sr-only">
        Check sailing conditions
      </h2>
      <div>
        <label htmlFor={latitudeId} className="block font-mono text-primary-800 mb-1">
          Latitude
        </label>
        <input
          id={latitudeId}
          name={latitudeId}
          type="number"
          step="any"
          min="-90"
          max="90"
          value={lat}
          onChange={e => setLat(e.target.value)}
          required
          className="w-full p-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
        />
      </div>

      <div>
        <label htmlFor={longitudeId} className="block font-medium font-mono text-primary-800 mb-1">
          Longitude
        </label>
        <input
          id={longitudeId}
          name={longitudeId}
          type="number"
          step="any"
          min="-180"
          max="180"
          value={lon}
          onChange={e => setLon(e.target.value)}
          required
          className="w-full p-2 border border-primary rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua"
        />
      </div>

      <button
        type="button"
        onClick={useMyLocation}
        aria-label="Use my current location"
        className="w-full flex items-center justify-center gap-2 mt-10 py-3 border-2 rounded font-semibold transition text-accent border-accent hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-aqua"
      >
        <Icon name="Navigation" />
        Use My Location
      </button>

      <button
        type="submit"
        disabled={loading || !lat || !lon}
        aria-disabled={loading || !lat || !lon}
        aria-label={
          !lat || !lon
            ? 'Cannot check conditions without location'
            : loading
              ? 'Checking conditions in progress'
              : 'Check sailing conditions'
        }
        className={`w-full flex items-center justify-center gap-2 mt-10 py-3 border-2 rounded font-semibold transition
          ${
            loading || !lat || !lon
              ? 'bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed'
              : 'text-accent border-accent hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-aqua'
          }
        `}
      >
        Check Conditions
      </button>

      <a
        href="https://open-meteo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="pt-4 block text-sm text-primary text-center hover:text-rose transition focus:outline-none focus:underline focus:ring-aqua"
      >
        Created with <span className="font-semibold">Open‑Meteo</span>
      </a>
    </form>
  );
}
