const React = require('react');

function mockComponent(name) {
  return React.forwardRef((props, ref) =>
    React.createElement(name, { ...props, ref })
  );
}

module.exports = {
  NativeModules: {
    SourceCode: { getConstants: () => ({ scriptURL: 'test' }) },
    DeviceInfo: { getConstants: () => ({}) },
  },
  Platform: { OS: 'ios', select: (obj) => obj?.ios ?? obj?.default ?? null, Version: 1 },
  Dimensions: { set: jest.fn(), get: jest.fn(() => ({ width: 390, height: 844, scale: 3 })) },
  StyleSheet: { create: jest.fn((styles) => styles) },
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  Image: mockComponent('Image'),
  TouchableOpacity: mockComponent('TouchableOpacity'),
  ScrollView: mockComponent('ScrollView'),
  FlatList: mockComponent('FlatList'),
  TextInput: mockComponent('TextInput'),
  Pressable: mockComponent('Pressable'),
  ActivityIndicator: mockComponent('ActivityIndicator'),
  RefreshControl: mockComponent('RefreshControl'),
  Modal: mockComponent('Modal'),
  SafeAreaView: mockComponent('SafeAreaView'),
  KeyboardAvoidingView: mockComponent('KeyboardAvoidingView'),
  Alert: { alert: jest.fn() },
  Animated: { View: mockComponent('Animated.View'), Text: mockComponent('Animated.Text'), createAnimatedComponent: jest.fn() },
  StatusBar: mockComponent('StatusBar'),
  Linking: { openURL: jest.fn(), canOpenURL: jest.fn() },
  Appearance: { getColorScheme: jest.fn(() => 'light'), addChangeListener: jest.fn() },
};
