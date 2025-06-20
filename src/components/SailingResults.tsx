import type { ScoreDetail } from '../utils/scoreSailingConditions';

type Props = {
  verdict: string | null;
  score: number | null;
  reason: string | null;
  details?: ScoreDetail[];
};

export default function SailingResults({ verdict, score, reason, details }: Props) {
  return (
    <div className="mt-6 text-left w-full max-w-sm space-y-3" aria-live="polite" role="status">
      <p className="text-lg font-semibold">{verdict}</p>
      {score !== null && <p className="text-sm text-gray-600">Sailability Score: {score} / 5</p>}
      {details && (
        <div className="space-y-1">
          {details.map(({ label, value, passed }, i) => (
            <div key={i} className={`text-sm ${passed ? 'text-green-700' : 'text-red-700'}`}>
              {passed ? '✅' : '❌'} {label}: {value}
            </div>
          ))}
        </div>
      )}
      {reason && (
        <pre className="whitespace-pre-wrap text-sm text-gray-700 bg-white p-3 rounded border border-gray-200">
          {reason}
        </pre>
      )}
    </div>
  );
}
