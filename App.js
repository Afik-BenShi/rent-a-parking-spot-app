import React, { useCallback, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { v4 as uuidv4 } from 'uuid';

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
import { COLORS } from "./assets/theme";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage } from './src/pages/login';
import { SignUpAuth, SignUpDetails } from "./src/pages/SignUp";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Text } from '@rneui/themed';
import { branchOnInfoExistance } from './src/auth/auth';
import LoadingPage from './src/pages/LoadingPage';
import { setUserContext } from './src/customStates/userContext';

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

function MyProStackScreen({ route }) {
  const { userId } = route.params;

  return (
    <MyProductsStack.Navigator>
      <MyProductsStack.Screen name="My Products cardList" component={MyProductsPage}
        options={{ title: 'My products', headerShown: false }} initialParams={{ userId }}

      />

      <MyProductsStack.Screen name="addProduct" component={AddProduct} options={{ headerShown: false }} initialParams={{ userId }} />
      <MyProductsStack.Screen name="ownerProduct" component={OwnerProductPage} />
      <MyProductsStack.Screen name="submitParkingDetails" component={SubmitPersonalDetails} initialParams={{ userId }}
        options={{ headerShown: false }} // to remove Stack header 
      />

    </MyProductsStack.Navigator>
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

function MyOrdersStackScreen() {
  return (
    <MyOrdersStack.Navigator>
      <MyOrdersStack.Screen name="Orders" component={NoOrdersYet} options={{ headerShown: false }} />
    </MyOrdersStack.Navigator>
  );
}

const AuthStack = createNativeStackNavigator();

function AuthStackScreen({navigate}) {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen options={{headerShown: false}} name="Login" 
        component={LoginPage} initialParams={{navigate}}
      />
      <AuthStack.Screen options={{headerTitle: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Sign Up to RentalWize
                </Text>
            )}} name="SignUp" 
        component={SignUpAuth} 
      />
      <AuthStack.Screen options={{headerTitle: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Fill in details
                </Text>
            )}} name="SignUpDetails" 
        component={SignUpDetails}
      />
    </AuthStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [authRoute, setAuthRoute] = useState('Login');
  const [userId, _setUserId] = useState('')
  const setUserId = useCallback((param) => {_setUserId(param)}, []);
  
  useEffect(()=> {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (!user){
        setIsLoading(false);
        return;
      }
      branchOnInfoExistance({
        user, 
        doIfExists() {
          _setUserId(user.uid || "");
          setIsLoading(false);
        },
        doIfNotExists() {
          setAuthRoute('SignUpDetails');
          setIsLoading(false);
        }
      })
    });
  }, [])
  
  if (isLoading){
    return <LoadingPage/>
  }
  
  if (!userId) {
    return (
    <NavigationContainer>
      <setUserContext.Provider value={setUserId}>
      <AuthStackScreen navigate={authRoute} />
      </setUserContext.Provider>
    </NavigationContainer>
    );
  }
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
          options={{ headerShown: false }} initialParams={{ userId }}
        />

        <Tab.Screen name='My Products' component={MyProStackScreen}
          options={{ headerShown: false }} initialParams={{ userId }} />

        <Tab.Screen name='My Orders' component={MyOrdersStackScreen} />

        <Tab.Screen name="Home" component={HomeStackScreen}
          options={{ headerShown: false }} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}
