import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HomeScreen } from './src/HomeScreen';
import NetworkLogger from 'react-native-network-logger';
import { startNetworkLogging } from 'react-native-network-logger';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: 'b0f9ad83-9148-4a6e-98bc-ac9216e645e7'
  }
});

export default function App() {
  startNetworkLogging();
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <HomeScreen />
        <NetworkLogger />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
