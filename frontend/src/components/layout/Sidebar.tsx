import { BookOpen, Home, LogOut, Users } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import authService from '../../services/AuthService';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  className: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const navigate = useNavigate();

  const { authenticatedUser, setAuthenticatedUser } = useAuth();

  const handleLogout = async () => {
    await authService.logout();
    setAuthenticatedUser(null);
    navigate('/login');
  };

  return (
    <div
      className={'sidebar ' + className}
      style={{
        backgroundImage: 'url(/sidemenu-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Link to="/" className="no-underline">
        <div className="flex flex-col items-center mb-2 p-3">
          <img
            src="/urbano-logo-white.png"
            alt="Urbano Logo"
            className="w-32 h-auto"
            width="128"
            height="48"
          />
        </div>
      </Link>
      <nav className="mt-5 flex flex-col gap-3 flex-grow">
        <SidebarItem to="/">
          <Home /> Dashboard
        </SidebarItem>
        <SidebarItem to="/courses">
          <BookOpen /> Courses
        </SidebarItem>
        {authenticatedUser.role === 'admin' ? (
          <SidebarItem to="/users">
            <Users /> Users
          </SidebarItem>
        ) : null}
      </nav>
      <button
        className="rounded-md p-3 transition-colors flex gap-3 justify-center items-center font-semibold focus:outline-none text-white"
        style={{ backgroundColor: 'var(--brand-primary)' }}
        onClick={handleLogout}
      >
        <LogOut /> Logout
      </button>
    </div>
  );
}
