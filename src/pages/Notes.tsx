import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import { Link } from 'react-router-dom';
import './Notes.css';

type Note = {
  id: string;
  title: string;
  image_path: string;
};

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) {
      alert('Zaloguj się, aby zobaczyć notatki.');
      return;
    }

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Błąd ładowania notatek:', error.message);
      return;
    }

    setNotes(data || []);

    const urlMap: Record<string, string> = {};
    for (const note of data || []) {
      const { data: signed } = await supabase.storage
        .from('notes')
        .createSignedUrl(note.image_path, 60);
      if (signed?.signedUrl) {
        urlMap[note.id] = signed.signedUrl;
      }
    }

    setImageUrls(urlMap);
    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (note: Note) => {
    if (!confirm(`Na pewno chcesz usunąć notatkę "${note.title}"?`)) return;

    await supabase.storage.from('notes').remove([note.image_path]);
    await supabase.from('notes').delete().eq('id', note.id);
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  return (
    <div className="notes-page">
      <h1>Twoje notatki</h1>
      <Link to="/notes/new">
        <button className="add-note-button">➕ Dodaj nową notatkę</button>
      </Link>

      {loading ? (
        <p>Ładowanie notatek...</p>
      ) : notes.length === 0 ? (
        <p>Brak notatek</p>
      ) : (
        <ul className="notes-list">
          {notes.map((note) => (
            <Link to={`/notes/${note.id}`} className="note-link">
            <li key={note.id} className="note-item">
                
              <img
                src={imageUrls[note.id]}
                alt={note.title}
                className="note-thumbnail"
                
              />
              <div className="note-info">
                <h3 className="note-title">{note.title}</h3>
                <button
                  className="delete-note-button"
                  onClick={() => handleDelete(note)}
                >
                  Usuń
                </button>
              </div>
            </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
