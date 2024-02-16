import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

// pages
import homePage from './src/pages/homePage';
import AddProduct from './src/pages/MyAddProduct'
import ProductDetailsPage from './src/pages/productDetailsPage';
import SubmitPersonalDetails from './src/pages/submitDetails';
import MyProductsPage from './src/pages/myProductsPage';
import homeCardPage from './src/pages/homeCardPage';
import NoOrdersYet from './src/pages/noOrdersYetPage';
import Filters from './src/components/filters';
import settingPersonal from './src/pages/settingPersonal';
import User from './src/pages/user';

import { Icon } from 'react-native-elements';
import { COLORS} from "./assets/theme";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      //screenOptions={{ headerShown: false }}
      >
      <HomeStack.Screen name="HomeCard" 
        component={homeCardPage} 
        options={{ headerShown: false }}
        //options={{title: 'Home page', headerStyle: { backgroundColor: COLORS.btnBlue }}}
        
        />
      
      <HomeStack.Screen
            name="filters"
            component={Filters}
            //options={{ headerShown: false }} // to remove Stack header
          />

    </HomeStack.Navigator>
  );
}

const MyProductsStack = createNativeStackNavigator();

function MyProStackScreen() {
  return (
    <MyProductsStack.Navigator>
      <MyProductsStack.Screen name="My Products cardList" component={MyProductsPage} 
        options={{title:'My products'}}/>

      <MyProductsStack.Screen name="addProduct" component={AddProduct} options={{ headerShown: false }}/>
      <MyProductsStack.Screen name="productDetails" component={ProductDetailsPage} />
      <MyProductsStack.Screen name="submitParkingDetails" component={SubmitPersonalDetails} 
          options={{ headerShown: false }} // to remove Stack header 
          />
    </MyProductsStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Setting" component={settingPersonal} />
      <SettingsStack.Screen name="userProfile" component={User} />
    </SettingsStack.Navigator>
  );
}

const MyOrdersStack = createNativeStackNavigator();

function MyOrdersStackScreen() {
  return (
    <MyOrdersStack.Navigator>
      <MyOrdersStack.Screen name="Orders" component={NoOrdersYet} options={{ headerShown: false }}  />
    </MyOrdersStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'; // Home icon
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline'; // Settings icon
            } else if (route.name === 'My Products') {
              iconName = focused ? 'person' : 'person-outline'; // My products icon
            } else if (route.name === 'My Orders') {
              iconName = focused ? 'bookmark' : 'bookmark-outline'; // My products icon
            }

            // You can return any component here that you like!
            return <Icon name={iconName} type="ionicon" color={color} size={size} />;
          },
          tabBarActiveTintColor: COLORS.btnBlue, // Color of the active tab
          tabBarInactiveTintColor: 'gray', // Color of inactive tabs
        })}
        initialRouteName="Home"
      >

        <Tab.Screen name="Settings" component={SettingsStackScreen} 
          options={{ headerShown: false }} />
        
        <Tab.Screen name='My Products' component={MyProStackScreen}
          options={{ headerShown: false }}/>

        <Tab.Screen name='My Orders' component={MyOrdersStackScreen}/>

        <Tab.Screen name="Home" component={HomeStackScreen}
          options={{ headerShown: false }} />
          
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}


{/*
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        //screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          component={CardList}
          options={{title: 'Home page', headerStyle: { backgroundColor: COLORS.lightWhite }}}
        />
        <Stack.Screen
             name = "addProduct"
             component={NewAddProduct}
             options={{title: 'Add product', headerStyle: { backgroundColor: COLORS.lightWhite }}}
            />*/}

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
          
          {/*<Stack.Screen
            name="productDetails"
            component={ProductDetailsPage}
            />
          <Stack.Screen
            name="myProduct"
            component={MyProductPage}
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
*/}