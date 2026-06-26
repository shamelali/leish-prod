import { AuthView } from '@neondatabase/auth-ui';
import { useParams } from 'react-router-dom';

export default function Auth() {
  const { pathname } = useParams<{ pathname: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <AuthView pathname={pathname || 'login'} />
      </div>
    </div>
  );
}
