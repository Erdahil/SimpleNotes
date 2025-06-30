import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase.ts';
import type { User } from '@supabase/supabase-js';
import './Navbar.css';
import LogoutButton from './LogoutButton.tsx';

type Props = {
  user: User | null;
};

export default function Navbar({ user }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /*const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };*/

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar">
  <div className="navbar-left">
    <Link to="/" className="logo">SimpleNotes</Link>
  </div>

  <div className="navbar-right">
    <button className="menu-button" onClick={toggleMenu} aria-haspopup="true" aria-expanded={menuOpen}>
      ☰ Menu
    </button>
    {menuOpen && (
      <ul className="dropdown-menu" ref={menuRef}>
        <li><Link to="/" onClick={() => setMenuOpen(false)}>Strona Główna</Link></li>
        
        <li className={!user ? 'disabled' : ''}>
          <Link 
            to={user ? "/notes" : "#"} 
            onClick={() => user && setMenuOpen(false)} 
            tabIndex={user ? 0 : -1}
            aria-disabled={!user}
          >
            Notatki
          </Link>
        </li>
        <li className={!user ? 'disabled' : ''}>
          <Link 
            to={user ? "/profile" : "#"} 
            onClick={() => user && setMenuOpen(false)} 
            tabIndex={user ? 0 : -1}
            aria-disabled={!user}
          >
            Profil
          </Link>
        </li>
        <li className={!user ? 'disabled' : ''}>
          <Link 
            to={user ? "/notes/new" : "#"} 
            onClick={() => user && setMenuOpen(false)} 
            tabIndex={user ? 0 : -1}
            aria-disabled={!user}
          >
            Nowa notatka
          </Link>
        </li>

        {user ? (
          <li>
            <LogoutButton onClick={() => {
              supabase.auth.signOut();
              setMenuOpen(false);
              navigate('/login');
            }} />
          </li>
        ) : (
          <li>
            <Link to="/login" onClick={() => setMenuOpen(false)}>Zaloguj</Link>
          </li>
        )}
      </ul>
    )}
  </div>
</nav>
  );
}
