import React from 'react';
import { render, act } from '@testing-library/react-native';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(null),
  setItem: jest.fn().mockResolvedValue(undefined),
  removeItem: jest.fn().mockResolvedValue(undefined),
}));

function TestComponent() {
  const { user, isLoading, login, register, logout } = useAuth();

  return (
    <>
      <test-props
        user={user ? JSON.stringify({ name: user.name, email: user.email }) : 'null'}
        isLoading={isLoading ? 'true' : 'false'}
        login={login}
        register={register}
        logout={logout}
      />
    </>
  );
}

describe('AuthContext', () => {
  it('starts with loading state', () => {
    const { getByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(getByText('true')).toBeTruthy();
  });

  it('resolves registered user after async storage check', async () => {
    const { findByText } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(await findByText('null')).toBeTruthy();
  });

  it('registers a new user successfully', async () => {
    let testRegister: any;

    function RegisterTest() {
      const { register, user, isLoading } = useAuth();
      testRegister = register;

      return (
        <>
          <test-props
            user={user ? JSON.stringify({ name: user.name, email: user.email }) : 'null'}
            isLoading={isLoading ? 'true' : 'false'}
          />
        </>
      );
    }

    render(
      <AuthProvider>
        <RegisterTest />
      </AuthProvider>
    );

    await act(async () => {
      const result = await testRegister({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+60 12-345 6789',
        password: 'password123',
        confirmPassword: 'password123',
      });

      expect(result.success).toBe(true);
    });
  });
});
