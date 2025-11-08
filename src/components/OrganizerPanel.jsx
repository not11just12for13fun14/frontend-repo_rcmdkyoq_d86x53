import { useState } from 'react';
import { PlusCircle, Eye, Send } from 'lucide-react';

export default function OrganizerPanel() {
  const [problems, setProblems] = useState([]);
  const [title, setTitle] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [desc, setDesc] = useState('');

  const addProblem = () => {
    if (!title.trim()) return;
    setProblems((prev) => [
      ...prev,
      { id: title.toLowerCase().replace(/\s+/g, '-'), title, difficulty, desc, published: false },
    ]);
    setTitle('');
    setDesc('');
    setDifficulty('Easy');
  };

  const togglePublish = (id) => {
    setProblems((prev) => prev.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  };

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold">Organizer Controls</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 space-y-3 rounded-lg border p-4 bg-white">
          <h3 className="font-medium">Create Problem</h3>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full rounded-md border p-2" />
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full rounded-md border p-2">
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full rounded-md border p-2 h-24" />
          <button onClick={addProblem} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700">
            <PlusCircle size={16} /> Add Problem
          </button>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h3 className="font-medium">Drafts & Published</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {problems.length === 0 && (
              <div className="text-gray-500 text-sm">No problems yet. Add one using the form.</div>
            )}
            {problems.map((p) => (
              <div key={p.id} className="rounded-lg border p-3 bg-white">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-xs text-gray-500">{p.difficulty}</div>
                    <p className="text-sm text-gray-700 mt-2 line-clamp-3">{p.desc}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 text-sm rounded-md border flex items-center gap-1"><Eye size={14} /> Preview</button>
                    <button onClick={() => togglePublish(p.id)} className={`px-2 py-1 text-sm rounded-md border flex items-center gap-1 ${p.published ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : ''}`}>
                      <Send size={14} /> {p.published ? 'Unpublish' : 'Publish'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
