import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Screens
import Login from './src/login';
import Home from './src/home';
import Scan from './src/scan';
import BookingInfo from './src/bookinginfo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator screenOptions={{
        headerShown: false,
        gestureEnabled:false
      }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="scan" component={Scan} />
        <Stack.Screen name="booking" component={BookingInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;