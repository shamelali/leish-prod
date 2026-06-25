import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

describe('debug', () => {
  it('checks render', () => {
    const result = render(<Text testID="hello">Hello</Text>);
    console.log('Keys:', Object.keys(result));
    console.log('has getByText:', typeof result.getByText);
    console.log('has getByTestId:', typeof result.getByTestId);
    expect(true).toBe(true);
  });
});
