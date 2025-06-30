import { useState } from 'react';
import { supabase } from '../services/supabase.ts';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://erdahil.github.io/SimpleNotes/',
      },
    });
    if (error) setSubmitError(error.message);
  };

  const handleEmailAuth = async () => {
    if (!validateForm()) return;
    setSubmitError('');

    const result = isRegistering
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setSubmitError(result.error.message);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          {isRegistering ? 'Utwórz konto' : 'Zaloguj się'}
        </h2>

        <button className="google-button" onClick={handleGoogleLogin}>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="google-icon"
          />
          Zaloguj przez Google
        </button>

        <div className="separator"><span>lub</span></div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error">{emailError}</p>}
        </div>

        <div className="input-group">
          <label>Hasło</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error">{passwordError}</p>}
        </div>

        <button className="submit-button" onClick={handleEmailAuth}>
          {isRegistering ? 'Zarejestruj się' : 'Zaloguj się'}
        </button>

        {submitError && <p className="error">{submitError}</p>}

        <div className="toggle">
          {isRegistering ? 'Masz już konto?' : 'Nie masz konta?'}{' '}
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setEmailError('');
              setPasswordError('');
              setSubmitError('');
            }}
            className="toggle-link"
          >
            {isRegistering ? 'Zaloguj się' : 'Zarejestruj się'}
          </button>
        </div>
      </div>
    </div>
  );
}
