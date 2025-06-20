'use client';

type Props = {
  lat: string;
  lon: string;
  setLat: (val: string) => void;
  setLon: (val: string) => void;
  loading: boolean;
  onSubmit: (lat: number, lon: number) => void;
};

export default function SailingForm({ lat, lon, setLat, setLon, loading, onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
      <div>
        <label
          htmlFor="latitude"
          className="block text-sm font-medium text-left text-gray-700 mb-1"
        >
          Latitude
        </label>
        <input
          id="latitude"
          name="latitude"
          type="number"
          step="any"
          min="-90"
          max="90"
          value={lat}
          onChange={e => setLat(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label
          htmlFor="longitude"
          className="block text-sm font-medium text-left text-gray-700 mb-1"
        >
          Longitude
        </label>
        <input
          id="longitude"
          name="longitude"
          type="number"
          step="any"
          min="-180"
          max="180"
          value={lon}
          onChange={e => setLon(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <button
        type="button"
        onClick={useMyLocation}
        className="w-full bg-gray-200 hover:bg-gray-300 p-2 rounded text-sm"
      >
        📍 Use My Location
      </button>

      <button
        type="submit"
        disabled={loading || !lat || !lon}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Checking...' : 'Check Conditions'}
      </button>
    </form>
  );
}
