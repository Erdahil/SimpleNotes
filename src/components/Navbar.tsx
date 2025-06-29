import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.ts';
import type { User } from '@supabase/supabase-js';

type NavbarProps = {
  user: User | null;
};

export default function Navbar({ user }: NavbarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <header className="navbar">
      <div className="navbar-title">
        📝 SimpleNotes
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/" className="navbar-button">Strona główna</Link>
            <Link to="/profile" className="navbar-button">Profil</Link>
            <button onClick={handleLogout} className="navbar-button">Wyloguj się</button>
          </>
        ) : (
          <button onClick={handleLogin} className="navbar-button navbar-login">Zaloguj się przez Google</button>
        )}
      </div>
    </header>
  );
}
