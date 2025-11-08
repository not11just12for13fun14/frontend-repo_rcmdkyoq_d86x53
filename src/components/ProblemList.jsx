import { useState } from 'react';
import { Search } from 'lucide-react';

const sampleProblems = [
  { id: 'two-sum', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash'] },
  { id: 'valid-parentheses', title: 'Valid Parentheses', difficulty: 'Easy', tags: ['Stack'] },
  { id: 'longest-substring', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['String', 'Sliding Window'] },
  { id: 'merge-k-lists', title: 'Merge K Sorted Lists', difficulty: 'Hard', tags: ['Heap', 'Linked List'] },
];

const difficultyColors = {
  Easy: 'text-emerald-600 bg-emerald-50',
  Medium: 'text-amber-600 bg-amber-50',
  Hard: 'text-rose-600 bg-rose-50',
};

export default function ProblemList({ onSelect }) {
  const [query, setQuery] = useState('');

  const filtered = sampleProblems.filter(
    (p) => p.title.toLowerCase().includes(query.toLowerCase()) || p.tags.join(' ').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="problems" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Problem List</h2>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems…"
            className="w-full pl-10 pr-3 py-2 rounded-md border bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50 text-left text-sm text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Difficulty</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{p.title}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${difficultyColors[p.difficulty]}`}>{p.difficulty}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{p.tags.join(', ')}</td>
                <td className="px-4 py-3">
                  <button onClick={() => onSelect(p)} className="px-3 py-1.5 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">Solve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
