import { useState } from "react";
import { View, SafeAreaView, ScrollView, TextInput, Button, StyleSheet, CheckBox, Text } from "react-native";
import { Link, Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
    ScreenHeaderBtn,
    Welcome,
  } from "../components";
  

    
const Home = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState("");
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
            options={{
                headerShadowVisible: false,
                headerLeft: () => (
                <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                ),
                headerRight: () => (
                <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                ),
                headerTitle: "Hello user",
            }}
            />
            


            <ScrollView>

                <Text>index</Text>
                <Link href="/AddParking">Go to AddParking</Link>
                <Link href="/Hello">Go to Hello</Link>
        
            
                <Welcome/>
                

                


            </ScrollView>
        
        
        
        
        
        </SafeAreaView>

        
    
    )
}

export default Home;