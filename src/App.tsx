import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './services/supabase.ts';
import type { User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import Login from './pages/Login';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import NewNote from './pages/NewNote';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return <p className="p-4">Ładowanie...</p>;

  return (
    <BrowserRouter>
      <Navbar user={user} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={user ? <Editor user={user} /> : <Navigate to="/login" />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={user ? <Profile user={user} /> : <Navigate to="/login" />} />
        <Route path="/notes/new" element={<NewNote />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
