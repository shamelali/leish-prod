import { AccountView } from '@neondatabase/auth/react/ui';
import { useParams } from 'react-router-dom';

export function Account() {
  const { pathname } = useParams();
  return <AccountView pathname={pathname} />;
}
