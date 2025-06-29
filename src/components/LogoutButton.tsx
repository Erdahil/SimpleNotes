import { supabase } from '../services/supabase.ts';
import './Navbar.css'

export default function LogoutButton() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Wylogowanie nie powiodło się:', error.message);
    } else {
      console.log('Wylogowano pomyślnie');
      window.location.reload();
    }
  };

  return <button onClick={handleLogout}>Wyloguj</button>;
}