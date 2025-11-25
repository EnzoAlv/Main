import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
