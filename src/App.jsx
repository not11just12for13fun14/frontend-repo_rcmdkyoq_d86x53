import { useState } from 'react';
import Navbar from './components/Navbar';
import ProblemList from './components/ProblemList';
import CodeEditor from './components/CodeEditor';
import Leaderboard from './components/Leaderboard';
import OrganizerPanel from './components/OrganizerPanel';

export default function App() {
  const [role, setRole] = useState('participant');
  const [selectedProblem, setSelectedProblem] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900">
      <Navbar role={role} />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Competitive Coding Platform</h1>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Switch Role:</span>
            <button
              onClick={() => setRole('participant')}
              className={`px-3 py-1 rounded-md border ${role === 'participant' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white'}`}
            >
              Participant
            </button>
            <button
              onClick={() => setRole('organizer')}
              className={`px-3 py-1 rounded-md border ${role === 'organizer' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white'}`}
            >
              Organizer
            </button>
          </div>
        </div>

        {role === 'participant' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <ProblemList onSelect={(p) => setSelectedProblem(p)} />
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-lg border p-4 bg-white min-h-[120px]">
                <h2 className="text-xl font-semibold">{selectedProblem ? selectedProblem.title : 'Select a problem to view details'}</h2>
                {selectedProblem ? (
                  <div className="mt-2 text-sm text-gray-700">
                    <p>Difficulty: <span className="font-medium">{selectedProblem.difficulty}</span></p>
                    <p className="mt-1">Tags: {selectedProblem.tags.join(', ')}</p>
                    <p className="mt-3">Solve the problem in the editor below and run your code. In a full build, submissions would be evaluated against test cases and stored for leaderboard ranking.</p>
                  </div>
                ) : (
                  <p className="mt-2 text-gray-600">Browse the list and pick a problem to start coding.</p>
                )}
              </div>
              <div className="rounded-lg border p-4 bg-white">
                <CodeEditor language="python" />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <OrganizerPanel />
          </div>
        )}

        <div className="rounded-lg border p-4 bg-white">
          <Leaderboard />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">Built with ❤️ for coding competitions</footer>
    </div>
  );
}
