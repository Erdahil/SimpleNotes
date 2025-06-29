import { Link } from 'react-router-dom';

export default function Notes() {
  return (
    <div style={{ paddingTop: '80px' }}>
      <h1>Twoje notatki</h1>
      <Link to="/notes/new">
        <button>➕ Dodaj nową notatkę</button>
      </Link>
      {/* Później tu lista notatek */}
    </div>
  );
}