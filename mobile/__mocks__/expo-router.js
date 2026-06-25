const React = require('react');

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  navigate: jest.fn(),
  canGoBack: jest.fn().mockReturnValue(true),
  params: {},
};

module.exports = {
  useRouter: () => mockRouter,
  useLocalSearchParams: () => ({}),
  useSegments: () => [],
  useRootNavigation: () => null,
  Stack: {
    Screen: () => null,
    Navigator: ({ children }) => React.createElement(React.Fragment, null, children),
  },
  Tabs: {
    Screen: () => null,
    Navigator: ({ children }) => React.createElement(React.Fragment, null, children),
  },
  Link: ({ children, ...props }) => React.createElement('View', props, children),
  Redirect: () => null,
  router: mockRouter,
};
