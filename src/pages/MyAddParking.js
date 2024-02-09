import React, { useState } from 'react';
import FillPersonalDetails from "../components/fillPersonalDetails";

import { COLORS} from "../../assets/theme";

import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
} from 'react-native';

export default function MyAddParking ({navigation}) {
  
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

    const handleStartDateChange = (startDate) => {
        const start = startDate ? startDate.toLocaleString() : 'Not selected';
        console.log(start);

        setDetails((prevDetails) => ({
            ...prevDetails,
            ["from"]: start,
        }));
    };

    const handleEndDateChange = (endDate) => {
        const end = endDate ? endDate.toLocaleString() : 'Not selected';
        console.log(end); 

        setDetails((prevDetails) => ({
            ...prevDetails,
            ["until"]: end,
        }));
    };


    // Function to handle input change and update details state
    const handleInputChange = (field, value) => {
    
        const parsedValue = field === "price" || field === "houseNumber" ? parseInt(value) : value;

        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: parsedValue,
        }));
    };


    // Function to handle submit button press
    const handleSubmit = () => {
        // Do something with the entered details, such as displaying them
        console.log("Submitted Details:", details);
        navigation.navigate("submitParkingDetails" ,{ detailsList: details });
        //setdetailsShow(true);
    };
    

  
  
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScrollView>
                <FillPersonalDetails 
                    sendDataToParent={handleInputChange} 
                    sendStartDateToParent={handleStartDateChange}
                    sendEndDateToParent={handleEndDateChange}/>

                <TouchableOpacity style={styles.finishButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Finish</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate("signIn")}>
                    <Text style={styles.buttonText}>SignIn-page</Text>
                </TouchableOpacity>
                
            </ScrollView>    
        </SafeAreaView>      
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 24,
    padding: 0,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  buttonText: {
    color: COLORS.black, 
    fontWeight: 'bold',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: 'lightgreen',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
},
startButtonText: {
    color: '#333',
    fontWeight: 'bold',
},
});