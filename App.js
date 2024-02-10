import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import homePage from './src/pages/homePage';
import addParking from './src/pages/AddParking'

import { COLORS } from "./assets/theme";
import { View, Pressable } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={homePage}
          options={{title: 'Home page'}}
        />
        <Stack.Screen
             name = "addParking"
             component={addParking}
             options={{title: 'Add parking', headerStyle: { backgroundColor: COLORS.lightPurple }}}
            />
        {/* <Stack.Screen
             name = "history"
             component={historyComponent}
             options={{title: 'history parking', headerStyle: { backgroundColor: COLORS.lightPurple }}}
          /> */}
        {/* <Stack.Screen
             name = "changeType"
             component={changeTypeComponent}
             options={{title: 'change type', headerStyle: { backgroundColor: COLORS.lightPurple }}}
          /> */}
        {/* <Stack.Screen
             name = "current"
             component={currentComponent}
             options={{title: 'My Current Parking', headerStyle: { backgroundColor: COLORS.lightPurple }}}
          /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}