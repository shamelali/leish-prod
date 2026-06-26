import { AccountView } from '@neondatabase/auth-ui';
import { useParams } from 'react-router-dom';

export default function Account() {
  const { pathname } = useParams<{ pathname: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-2xl">
        <AccountView pathname={pathname || 'profile'} />
      </div>
    </div>
  );
}
