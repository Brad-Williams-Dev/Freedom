import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadingScreen from './pages/LoadingScreen';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { configureStore } from '@reduxjs/toolkit';
import { editInfoSlice } from './redux/editInfoSlice';
import store from './redux/store';
import CallbackScreen from './pages/CallbackScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name='Dashboard' component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name='Settings' component={Settings} options={{ headerShown: false, gestureEnabled: true }} />
          <Stack.Screen name="Callback" component={CallbackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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


