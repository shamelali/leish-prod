import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Text } from 'react-native';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

function TestDisplay() {
  const { user, isLoading } = useAuth();
  return <Text testID="state">{isLoading ? 'loading' : user ? `user:${user.name}` : 'null'}</Text>;
}

function RegisterTest({ onReady }: { onReady: (register: Function) => void }) {
  const { register, user } = useAuth();
  React.useEffect(() => {
    onReady(register);
  }, []);
  return <Text testID="state">{user ? `user:${user.name}` : 'null'}</Text>;
}

describe('AuthContext', () => {
  it('renders without crashing', async () => {
    const { getByTestId } = await render(
      <AuthProvider>
        <TestDisplay />
      </AuthProvider>
    );
    expect(getByTestId('state')).toBeTruthy();
  });

  it('registers a new user', async () => {
    let registerFn: any;

    await render(
      <AuthProvider>
        <RegisterTest onReady={(fn) => { registerFn = fn; }} />
      </AuthProvider>
    );

    await act(async () => {
      await new Promise((r) => setTimeout(r, 100));
    });

    expect(registerFn).toBeDefined();

    let result: any;
    await act(async () => {
      result = await registerFn({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+60 12-345 6789',
        password: 'password123',
        confirmPassword: 'password123',
      });
    });

    expect(result.success).toBe(true);
  });
});
