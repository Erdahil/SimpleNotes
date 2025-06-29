import { useState } from 'react';
import { supabase } from '../services/supabase.ts';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateForm = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Nieprawidłowy format adresu email');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Hasło musi mieć co najmniej 6 znaków');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      console.error('Błąd logowania przez Google:', error.message);
      setSubmitError(error.message);
    }
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;

    setSubmitError('');

    let result;
    if (isRegistering) {
      result = await supabase.auth.signUp({ email, password });
    } else {
      result = await supabase.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
      setSubmitError(result.error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '4rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>{isRegistering ? 'Utwórz konto' : 'Zaloguj się'}</h2>

      <button onClick={handleGoogleLogin} style={{ marginBottom: '1rem' }}>
        Zaloguj przez Google
      </button>

      <hr style={{ margin: '1rem 0' }} />

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '0.5rem' }}
        />
        {emailError && (
          <p style={{ color: 'red', fontSize: '0.9rem' }}>{emailError}</p>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '0.5rem' }}
        />
        {passwordError && (
          <p style={{ color: 'red', fontSize: '0.9rem' }}>{passwordError}</p>
        )}
      </div>

      <button onClick={handleEmailAuth} style={{ width: '100%', padding: '0.75rem' }}>
        {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
      </button>

      {submitError && (
        <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '1rem' }}>{submitError}</p>
      )}

      <p style={{ marginTop: '1rem' }}>
        {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
        <button
          onClick={() => {
            setIsRegistering(!isRegistering);
            setEmailError('');
            setPasswordError('');
            setSubmitError('');
          }}
          style={{
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
          }}
        >
          {isRegistering ? 'Zaloguj się' : 'Zarejestruj się'}
        </button>
      </p>
    </div>
  );
}
