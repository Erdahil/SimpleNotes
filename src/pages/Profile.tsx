import type { User } from '@supabase/supabase-js';
import './Editor.css'

type ProfileProps = {
  user: User | null;
};

export default function Profile({ user }: ProfileProps) {
  if (!user) {
    return (
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-title">Proszę się zalogować</h1>
          <p className="description">
            Żeby zobaczyć swój profil, musisz być zalogowany. Przejdź do logowania.
          </p>
          <button
            className="login-button"
            onClick={() => window.location.assign('/login')}
          >
            Przejdź do logowania
          </button>
        </div>
      </div>
    );
  }

  const createdAt = user.created_at ? new Date(user.created_at).toLocaleDateString('pl-PL') : 'Brak danych';
  const provider = user.identities?.[0]?.provider || 'Email/Hasło';

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Twój profil</h1>
        <p className="welcome-text">Zalogowany jako <strong>{user.email}</strong></p>
        <p className="description"><strong>Data rejestracji:</strong> {createdAt}</p>
        <p className="description"><strong>Metoda logowania:</strong> {provider}</p>
      </div>
    </div>
  );
}
