import 'react-native-gesture-handler'; // according to the docs, this needs to be at the very top of the app entry point
import AsyncStorage from '@react-native-async-storage/async-storage';
import { customColours as colors } from './src/utils';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ErrorBoundary from 'react-native-error-boundary';
import { getMainDefinition } from '@apollo/client/utilities';
import { loadDevMessages } from '@apollo/client/dev';
import { MY_WORDLIST_GRAPHQL_URL } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import { removeTypename } from './src/utils/removeTypename';
import type { RootStackParamList } from './types';
import { StatusBar } from 'expo-status-bar';
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  fromPromise,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import {
  CreateWordlistEntriesScreen,
  EditWordlistEntryScreen,
  ForgotYourPasswordScreen,
  GenerateExampleSentencesScreen,
  HomeScreen,
  LogInScreen,
  SignUpScreen
} from './src/screens';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Error, NavigationBar } from './src/components';
import { Platform, SafeAreaView } from 'react-native';

if (__DEV__) {
  console.log('Running in dev mode.');
  loadDevMessages();
}

const authMiddleware = new ApolloLink((operation, forward) => {
  return fromPromise(AsyncStorage.getItem('myWordlistAuthToken')).flatMap(authToken => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: authToken
      }
    }));

    return forward(operation);
  });
});

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  const definition = getMainDefinition(operation.query);

  if (definition.kind === 'OperationDefinition' && definition.operation === 'mutation') {
    operation.variables = removeTypename(operation.operationName, operation.variables);
  }

  return forward(operation);
});

const httpLink = new HttpLink({ uri: MY_WORDLIST_GRAPHQL_URL });

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      WordlistEntry: {
        fields: {
          categories: {
            merge: (_, incoming) => incoming
          }
        }
      }
    }
  }),
  connectToDevTools: true,
  link: ApolloLink.from([cleanTypenameLink, authMiddleware, httpLink])
});

// prevents a console warning in web
// due to Platform.constants not being defined
if (Platform.OS === 'web' && !Platform.constants) {
  Platform.constants = {
    isTesting: false,
    // keep aligned with react-native version
    reactNativeVersion: { major: 0, minor: 72, patch: 6 }
  };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const theme = {
  ...DefaultTheme,
  colors
};

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ErrorBoundary FallbackComponent={Error}>
        <ApolloProvider client={client}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  header: props => <NavigationBar {...props} />
                }}
              >
                <Stack.Group>
                  <Stack.Screen
                    component={HomeScreen}
                    name='Home'
                    options={{ title: 'My Wordlist' }}
                  />
                  <Stack.Screen
                    component={LogInScreen}
                    name='LogIn'
                    options={{ title: 'My Wordlist' }}
                  />
                  <Stack.Screen
                    component={SignUpScreen}
                    name='SignUp'
                    options={{ title: 'My Wordlist' }}
                  />
                  <Stack.Screen
                    component={ForgotYourPasswordScreen}
                    name='ForgotYourPassword'
                    options={{ title: 'My Wordlist' }}
                  />
                  <Stack.Screen
                    component={GenerateExampleSentencesScreen}
                    name='GenerateExampleSentences'
                    options={{ title: 'My Wordlist' }}
                  />
                </Stack.Group>
                <Stack.Group screenOptions={{ headerShown: false, presentation: 'modal' }}>
                  <Stack.Screen
                    component={CreateWordlistEntriesScreen}
                    initialParams={{ isModal: true }}
                    name='CreateWordlistEntries'
                  />
                  <Stack.Screen
                    component={EditWordlistEntryScreen}
                    initialParams={{ isModal: true }}
                    name='EditWordlistEntry'
                  />
                </Stack.Group>
              </Stack.Navigator>
              <StatusBar style='auto' />
            </NavigationContainer>
          </PaperProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </SafeAreaView>
  );
}
