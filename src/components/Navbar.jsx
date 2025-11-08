import { Code, Trophy, User } from 'lucide-react';

export default function Navbar({ role }) {
  return (
    <header className="w-full border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 grid place-items-center rounded-md bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
            <Code size={20} />
          </div>
          <span className="font-semibold text-lg">CodeArena</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a className="hover:text-gray-900 transition" href="#problems">Problems</a>
          <a className="hover:text-gray-900 transition" href="#playground">Playground</a>
          <a className="hover:text-gray-900 transition flex items-center gap-1" href="#leaderboard">
            <Trophy size={16} /> Leaderboard
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-xs uppercase tracking-wide text-gray-500">Role</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
            <User size={16} /> {role === 'organizer' ? 'Organizer' : 'Participant'}
          </span>
        </div>
      </div>
    </header>
  );
}
