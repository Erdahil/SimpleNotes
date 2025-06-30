import type { User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import './Editor.css'

export default function Editor({ user }: { user: User | null }) {
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="home-container">
        <div className="home-card">
          <h1 className="home-title">Witaj w SimpleNotes</h1>
          <p className="description">
            Żeby korzystać z tworzenia, edytowania i przeglądania własnych notatek, musisz się zalogować. Kliknij poniżej, by przejśc do strony logowania.
          </p>
          <button
            className="login-button"
            onClick={() => navigate('/login')}
          >
            Przejdź do logowania
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Witaj w SimpleNotes</h1>
        <p className="welcome-text">Zalogowany jako <strong>{user.email}</strong></p>
        <p className="description">
          Możesz tu tworzyć i edytować swoje notatki.
        </p>
        <button
          className="new-note-button"
          onClick={() => navigate('/notes/new')}
          title="Utwórz nową notatkę"
        >
          Nowa notatka
        </button>
        <button
          className="my-notes-button"
          onClick={() => navigate('/notes')}
          title="Przejdź do listy notatek"
        >
          Moje notatki
        </button>
      </div>
    </div>
  );
}