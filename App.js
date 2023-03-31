import { HomeScreen } from './src/HomeScreen';
import { MY_WORDLIST_GRAPHQL_URL } from '@env';
import NetworkLogger from 'react-native-network-logger';
import { startNetworkLogging } from 'react-native-network-logger';
import { StatusBar } from 'expo-status-bar';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { StyleSheet, View } from 'react-native';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    // this is the user_id from the rails app's seed data
    authorization: 'b0f9ad83-9148-4a6e-98bc-ac9216e645e7'
  },
  uri: MY_WORDLIST_GRAPHQL_URL
});

export default function App() {
  startNetworkLogging();
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <HomeScreen />
        <StatusBar style="auto" />
      </View>
      <NetworkLogger />
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
});
