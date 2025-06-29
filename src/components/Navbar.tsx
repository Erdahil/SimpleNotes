import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase.ts';

export default function Navbar() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Strona główna</Link>
        <Link to="/profile" className="hover:underline">Profil</Link>
      </div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded">
        Wyloguj się
      </button>
    </nav>
  );
}