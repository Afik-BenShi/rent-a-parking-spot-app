import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import homePage from './src/pages/homePage';
import AddParking from './src/pages/AddParking'
import NewAddParking from './src/pages/MyAddParking'
import ParkingDetailsPage from './src/pages/parkingDetailsPage';
import SignInGoogle from './src/pages/SignInGoogle';
import SubmitPersonalDetails from './src/pages/submitDetails';
import addParking from './src/pages/AddParking';

import { View, Pressable } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { COLORS} from "./assets/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={homePage}
          options={{title: 'Add parking', headerStyle: { backgroundColor: COLORS.lightPurple }}}
        />
        <Stack.Screen
             name = "addParking"
             component={NewAddParking}
             options={{title: 'Add parking', headerStyle: { backgroundColor: COLORS.lightWhite }}}
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
          <Stack.Screen
            name="parkingDetails"
            component={ParkingDetailsPage}
          />
          <Stack.Screen
            name="signIn"
            component={SignInGoogle}
          />
          <Stack.Screen
            name="submitParkingDetails"
            component={SubmitPersonalDetails}
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}