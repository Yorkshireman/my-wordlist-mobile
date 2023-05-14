import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../src/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { render, screen } from '@testing-library/react-native';

describe('HomeScreen', () => {
  test('renders Home Screen text', async () => {
    const Stack = createNativeStackNavigator();

    render(
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'Home' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );

    expect(screen.getByText('Home Screen')).toBeVisible();
    expect(screen.getByTestId('fab')).toBeVisible();
  });
});
