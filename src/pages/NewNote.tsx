import { useState } from 'react';

export default function NewNote() {
  const [content, setContent] = useState('');

  const handleSave = () => {
    // Tu dodasz zapis do bazy później
    console.log('Zapisuję notatkę:', content);
    alert('Notatka została utworzona (póki co tylko lokalnie).');
  };

  return (
    <div style={{ paddingTop: '80px', paddingInline: '2rem' }}>
      <h2>Nowa Notatka</h2>
      <textarea
        style={{ width: '100%', height: '200px', fontSize: '16px' }}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Wpisz swoją notatkę tutaj..."
      />
      <br />
      <button onClick={handleSave}>Zapisz</button>
    </div>
  );
}