import { useEffect } from 'react';
import { supabase } from '../services/supabase.ts';
import { useNavigate } from 'react-router-dom';

export default function CallbackHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(() => {
      navigate('/');
    });
  }, []);

  return <p>Logowanie...</p>;
}
