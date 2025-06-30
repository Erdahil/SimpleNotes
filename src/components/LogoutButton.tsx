import './Navbar.css'
import './LogoutButton.css';

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onClick }) => {
  return (
    <div onClick={onClick} className="logout-button" role="button" tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
    >
      Wyloguj
    </div>
  );
};
export default LogoutButton;