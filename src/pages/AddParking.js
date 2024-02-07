import React from 'react';
import { useState } from "react";
import { View, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, CheckBox, Text } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
    ScreenHeaderBtn,
    Welcome,
  } from "../components";
  
    
const AddParking = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
            options={{
                headerShadowVisible: true,
                headerStyle: { backgroundColor: COLORS.lightPurple },
                
                
                headerTitle: "Add parking",
            }}
            />

            <ScrollView>
        
            
                <Welcome/>
                

                


            </ScrollView>
        
        
        
        
        
        </SafeAreaView>

        
    
    )
}

export default AddParking;