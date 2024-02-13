import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import homePage from './src/pages/homePage';
import AddParking from './src/pages/AddParking'
import NewAddProduct from './src/pages/MyAddProduct'
import ProductDetailsPage from './src/pages/productDetailsPage';
import SignInGoogle from './src/pages/SignInGoogle';
import SubmitPersonalDetails from './src/pages/submitDetails';
import Filters from './src/components/filters'

import { View, Pressable } from 'react-native';
import { Header, Icon, Text } from 'react-native-elements';
import { COLORS} from "./assets/theme";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={homePage}
          options={{title: 'Home page', headerStyle: { backgroundColor: COLORS.lightWhite }}}
        />
        <Stack.Screen
             name = "addProduct"
             component={NewAddProduct}
             options={{title: 'Add product', headerStyle: { backgroundColor: COLORS.lightWhite }}}
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
            name="productDetails"
            component={ProductDetailsPage}
          />
          <Stack.Screen
            name="signIn"
            component={SignInGoogle}
          />
          <Stack.Screen
            name="submitParkingDetails"
            component={SubmitPersonalDetails}
            options={{ headerShown: false }} // to remove Stack header
          />
          <Stack.Screen
            name="filters"
            component={Filters}
            options={{ headerShown: false }} // to remove Stack header
          />

      </Stack.Navigator>
    </NavigationContainer>
  );
}