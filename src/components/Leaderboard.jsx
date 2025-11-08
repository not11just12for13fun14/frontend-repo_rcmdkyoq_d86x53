import { useMemo } from 'react';
import { Trophy } from 'lucide-react';

const sampleSubmissions = [
  { user: 'Ava', score: 300 },
  { user: 'Noah', score: 240 },
  { user: 'Mia', score: 200 },
  { user: 'Liam', score: 180 },
  { user: 'Zoe', score: 120 },
];

export default function Leaderboard() {
  const sorted = useMemo(() => [...sampleSubmissions].sort((a, b) => b.score - a.score), []);

  return (
    <section id="leaderboard" className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="text-amber-500" />
        <h2 className="text-xl font-semibold">Leaderboard</h2>
      </div>

      <ol className="space-y-2">
        {sorted.map((s, i) => (
          <li key={s.user} className="flex items-center justify-between rounded-lg border p-3 bg-white">
            <div className="flex items-center gap-3">
              <span className="w-8 text-center font-semibold">{i + 1}</span>
              <span className="font-medium">{s.user}</span>
            </div>
            <span className="text-indigo-600 font-semibold">{s.score} pts</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
