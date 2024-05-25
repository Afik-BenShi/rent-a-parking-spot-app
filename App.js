import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState, useEffect, useContext } from "react";

// pages
import AddProduct from './src/pages/MyAddProduct'
import ProductDetailsPage from './src/pages/productDetailsPage';
import SubmitPersonalDetails from './src/pages/submitDetails';
import OwnerProductPage from './src/pages/ownerProductPage';
import { MyProductsPage } from './src/pages/myProductsPage';
import homeCardPage from './src/pages/homeCardPage';
import MyOrderAsRenterPage from './src/pages/MyOrdersAsRenter';
import Filters from './src/components/filters';
import Profile from './src/pages/user';
import ExtendedProduct from './src/pages/ExtendedProduct';
import ChooseCategoryPage from './src/pages/chooseCategoryPage'

import { COLORS } from "./assets/theme";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage } from './src/pages/login';
import { SignUpAuth, SignUpDetails } from "./src/pages/SignUp";
import { Text, Icon } from '@rneui/themed';
import LoadingPage from './src/pages/LoadingPage';

import { RefreshContext, RefreshContextProvider } from './src/context/context';
import { ResetPassword } from './src/pages/ResetPassword';


const HomeStack = createNativeStackNavigator();

function HomeStackScreen({ route }) {
  const { userId } = route.params;
  return (
    <HomeStack.Navigator
    //screenOptions={{ headerShown: false }}
    >
      <HomeStack.Screen name="category" component={ChooseCategoryPage} options={{ headerShown: false }} />
      <HomeStack.Screen name="HomeCard"
        component={homeCardPage}
        options={{ headerShown: false }} initialParams={{ userId }}
      //options={{title: 'Home page', headerStyle: { backgroundColor: COLORS.btnBlue }}}

      />

      <HomeStack.Screen
        name="filters"
        component={Filters}
        options={{ headerShown: false }} // to remove Stack header
      />

      <HomeStack.Screen name="productDetails" component={ProductDetailsPage} />

    </HomeStack.Navigator>
  );
}

const MyProductsStack = createNativeStackNavigator();

function MyProStackScreen({ route }) {
  const { userId } = route.params;

  return (
    <RefreshContextProvider>
      <MyProductsStack.Navigator>
        <MyProductsStack.Screen name="My Products cardList" component={MyProductsPage}
          options={{ title: 'My products' }} initialParams={{ userId }}
        />

        <MyProductsStack.Screen name="addProduct" component={AddProduct} options={{ headerShown: false }} initialParams={{ userId }} />
        <MyProductsStack.Screen name="ownerProduct" component={OwnerProductPage} />
        <MyProductsStack.Screen name="submitDetailsBeforePost" component={SubmitPersonalDetails} initialParams={{ userId }}
          options={{ headerShown: false }} // to remove Stack header 
        />

      </MyProductsStack.Navigator>
    </RefreshContextProvider>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen({ route }) {
  const { userId } = route.params;

  return (
    <SettingsStack.Navigator>

      <SettingsStack.Screen name="userProfile" component={Profile} initialParams={{ userId }} />

    </SettingsStack.Navigator>
  );
}

const MyOrdersStack = createNativeStackNavigator();

function MyOrdersStackScreen({ route }) {
  const { userId } = route.params;

  return (
    <MyOrdersStack.Navigator>
      <MyOrdersStack.Screen name="Orders" component={MyOrderAsRenterPage} initialParams={{ userId }}
        options={{ headerShown: false }} />

      <MyOrdersStack.Screen name="ExtendedProduct" component={ExtendedProduct} initialParams={{ userId }}
        options={{ headerShown: false }} />
    </MyOrdersStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

function AuthStackScreen({ route }) {
  const { redirect } = route.params ?? {};
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{ headerShown: false }} name="Login"
        component={LoginPage} initialParams={{ redirect }}
      />
      <AuthStack.Screen options={{
        headerTitle: () => (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Sign Up to RentalWize
          </Text>
        )
      }} name="SignUp"
        component={SignUpAuth}
      />
      <AuthStack.Screen options={{
        headerTitle: () => (
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Fill in details
          </Text>
        )
      }} name="SignUpDetails"
        component={SignUpDetails}
      />
      <AuthStack.Screen options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPassword}
      />
    </AuthStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
function TabStackScreen({ route }) {
  const { userId } = route.params ?? {};
  return (
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
          return <Icon name={iconName} type="ionicon" color={color} size={size} />;
        },
        tabBarActiveTintColor: COLORS.btnBlue, // Color of the active tab
        tabBarInactiveTintColor: 'gray', // Color of inactive tabs
      })}
      initialRouteName="Home"
    >

      <Tab.Screen name="Settings" component={SettingsStackScreen}
        options={{ headerShown: false }} initialParams={{ userId }}
      />

      <Tab.Screen name='My Products' component={MyProStackScreen}
        options={{ headerShown: false }} initialParams={{ userId }} />

      <Tab.Screen name='My Orders' component={MyOrdersStackScreen} initialParams={{ userId }} />

      <Tab.Screen name="Home" component={HomeStackScreen}
        options={{ headerShown: false }} initialParams={{ userId }} />


    </Tab.Navigator>
  )
}

const AppStack = createNativeStackNavigator();
export default function App() {
  return (


    <NavigationContainer>
      <AppStack.Navigator initialRouteName={'loading'}>
        <AppStack.Screen options={{ headerShown: false }} name="loading"
          component={LoadingPage} />
        <AppStack.Screen options={{ headerShown: false }} component={AuthStackScreen} name='auth' />
        <AppStack.Screen options={{ headerShown: false }} component={TabStackScreen} name='main' />
      </AppStack.Navigator>
    </NavigationContainer>

  );
}