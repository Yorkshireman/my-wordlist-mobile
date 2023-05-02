import AsyncStorage from '@react-native-async-storage/async-storage';
import { customColours as colors } from './src/utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationBar } from './src/components';
import { NavigationContainer } from '@react-navigation/native';
import NetworkLogger from 'react-native-network-logger';
import { startNetworkLogging } from 'react-native-network-logger';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloLink, ApolloProvider, concat, HttpLink, InMemoryCache } from '@apollo/client';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { HomeScreen, LogInScreen, SignUpScreen } from './src/screens';
import { MY_WORDLIST_GRAPHQL_URL, NETWORK_LOGGER } from '@env';

const authMiddleware = new ApolloLink(async (operation, forward) => {
  const authToken = await AsyncStorage.getItem('myWordlistAuthToken');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: authToken
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({ uri: MY_WORDLIST_GRAPHQL_URL });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});

const networkLoggerIsEnabled = NETWORK_LOGGER === 'true';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors
};

export default function App() {
  networkLoggerIsEnabled && startNetworkLogging();
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              header: props => <NavigationBar {...props} />
            }}
          >
            <Stack.Screen component={HomeScreen} name="Home" options={{ title: 'My Wordlist' }} />
            <Stack.Screen component={LogInScreen} name="LogIn" options={{ title: 'Log In'}} />
            <Stack.Screen component={SignUpScreen} name='SignUp' options={{ title: 'Sign Up' }} />
          </Stack.Navigator>
          <StatusBar style="auto" />
          {networkLoggerIsEnabled && <NetworkLogger />}
        </NavigationContainer>
      </PaperProvider>
    </ApolloProvider>
  );
}
