import { supabase } from '../services/supabase.ts';

export default function Login() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) console.error('Login error:', error.message);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
        Zaloguj się przez Google
      </button>
    </div>
  );
}