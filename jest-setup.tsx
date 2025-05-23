// Import built-in Jest matchers
import '@testing-library/react-native/extend-expect';
import { Component, ReactNode } from 'react';

// If using more interactive expo components in future, mocking expo components might
// become an unsustainable strategy. If this becomes a problem, consider trying to get
// the tests working with the jest-expo preset: https://docs.expo.dev/develop/unit-testing
// This might solve the problem. Otherwise, more elaborate mocks might be needed, or it
// might be viable in some situations to just stub the component and leave a hole in the
// unit testing coverage (it might be tenable to rely on manually testing such features, or
// potentially some sort of UI testing tool could be employed eg "Detox"?).
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: 'LinearGradient'
}));

// Couldn't get the recommended approach working: https://reactnavigation.org/docs/testing#mocking-native-modules
jest.mock('react-native-drawer-layout', () => {
  return {
    /* eslint-disable-next-line react/prop-types */
    Drawer: ({
      children,
      open,
      renderDrawerContent
    }: {
      children: ReactNode;
      open: boolean;
      renderDrawerContent: () => Component;
    }) => {
      return (
        <>
          {open && renderDrawerContent()}
          {children}
        </>
      );
    }
  };
});

if (process.env.CIRCLECI) {
  jest.setTimeout(30000);
}

beforeAll(() => {
  jest.spyOn(global.console, 'info').mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
