import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import Welcome from "../components/Welcome";
import FillPersonalDetails from "../components/fillPersonalDetails";

import { COLORS} from "../../assets/theme";


    
const AddParking = ({navigation}) => {

    const [details, setDetails] = useState({
        ownerName: "",
        city: "",
        street: "",
        houseNumber: "",
        price: "",
        phoneNumber: "",
        from: "",
        until: ""
      });

    

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScrollView>
                <FillPersonalDetails/>

                <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("submitParkingDetails")}>
                    <Text style={styles.startButtonText}>SignIn-page</Text>
                </TouchableOpacity>


                
                <Welcome/>
                
            </ScrollView>    
        </SafeAreaView>   
    )
}

export default AddParking;

const styles = StyleSheet.create({  
    startButton: {
        backgroundColor: 'lightgreen',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20,
    },
    startButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});