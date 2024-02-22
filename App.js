import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';

// pages
import AddProduct from './src/pages/MyAddProduct'
import ProductDetailsPage from './src/pages/productDetailsPage';
import SubmitPersonalDetails from './src/pages/submitDetails';
import OwnerProductPage from './src/pages/ownerProductPage';
import MyProductsPage from './src/pages/myProductsPage';
import homeCardPage from './src/pages/homeCardPage';
import NoOrdersYet from './src/pages/noOrdersYetPage';
import Filters from './src/components/filters';
import EditProfile from './src/pages/settingPersonal';
import Profile from './src/pages/user';

import { Icon } from 'react-native-elements';
import { COLORS} from "./assets/theme";

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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

      <HomeStack.Screen name="productDetails" component={ProductDetailsPage} />
    </HomeStack.Navigator>
  );
}

const MyProductsStack = createNativeStackNavigator();

function MyProStackScreen() {
  return (
    <MyProductsStack.Navigator>
      <MyProductsStack.Screen name="My Products cardList" component={MyProductsPage} 
        options={{title:'My products', headerShown: false}}
        />

      <MyProductsStack.Screen name="addProduct" component={AddProduct} options={{ headerShown: false }}/>
      <MyProductsStack.Screen name="ownerProduct" component={OwnerProductPage} />
      <MyProductsStack.Screen name="submitParkingDetails" component={SubmitPersonalDetails} 
          options={{ headerShown: false }} // to remove Stack header 
          />
      
    </MyProductsStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  const pd = {ownerName: " ", city: " ", phoneNumber: " "};
  
  return (
    <SettingsStack.Navigator>
    
      <SettingsStack.Screen name="userProfile" component={Profile} data={{}}  />
      
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
*/}