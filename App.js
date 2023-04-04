import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import NetworkLogger from 'react-native-network-logger';
import { Provider as PaperProvider } from 'react-native-paper';
import { SignInScreen } from './src/SignInScreen';
import { startNetworkLogging } from 'react-native-network-logger';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { MY_WORDLIST_GRAPHQL_URL, NETWORK_LOGGER } from '@env';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    // this is the user_id from the rails app's seed data
    authorization: 'b0f9ad83-9148-4a6e-98bc-ac9216e645e7'
  },
  uri: MY_WORDLIST_GRAPHQL_URL
});

const networkLoggerIsEnabled = NETWORK_LOGGER === 'true';

const Stack = createNativeStackNavigator();

export default function App() {
  networkLoggerIsEnabled && startNetworkLogging();
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'Home' }} />
            <Stack.Screen component={SignInScreen} name="SignIn" options={{ title: 'Sign In'}} />
          </Stack.Navigator>
          <StatusBar style="auto" />
          {networkLoggerIsEnabled && <NetworkLogger />}
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
