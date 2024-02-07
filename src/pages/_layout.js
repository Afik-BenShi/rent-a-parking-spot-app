import { Stack } from 'expo-router';
import React from 'react';
import { View, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, CheckBox, Text } from "react-native";
import { COLORS } from '../constants';


const Layout = () => {
    
    return <Stack screenOptions={{
        headerStyle: { backgroundColor: COLORS.lightWhite },
        headerTintColor:"black",
        headerTitleStyle:{
            fontWeight:'bold'
        }
    }}/>;
}

export default Layout;
