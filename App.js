import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/HomeScreen';
import { MY_WORDLIST_GRAPHQL_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import NetworkLogger from 'react-native-network-logger';
import { SignInScreen } from './src/SignInScreen';
import { startNetworkLogging } from 'react-native-network-logger';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    // this is the user_id from the rails app's seed data
    authorization: 'b0f9ad83-9148-4a6e-98bc-ac9216e645e7'
  },
  uri: MY_WORDLIST_GRAPHQL_URL
});

const Stack = createNativeStackNavigator();

export default function App() {
  startNetworkLogging();
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Sign In'}} />
        </Stack.Navigator>
        <StatusBar style="auto" />
        <NetworkLogger />
      </NavigationContainer>
    </ApolloProvider>
  );
}
