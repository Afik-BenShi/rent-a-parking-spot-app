import React, { useState } from 'react';
import { COLORS} from "../../assets/theme";

import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';

import NextBackBtn from '../components/nextAndBackBtn';
import { Input } from 'react-native-elements';
import styles from '../components/addProduct.style';
// Icons:
import Icon from 'react-native-vector-icons/Ionicons'; 
import MoreIcon from 'react-native-vector-icons/Ionicons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function AddProductPage ({navigation}) {
  
    // State to hold the entered details
    const [personalDetails, setPersonalDetails] = useState({
        ownerName: "",
        city: "",
        phoneNumber: "",
    });



    // Function to handle input change and update details state
    const handleInputChange = (field, value) => {
        setPersonalDetails((prevDetails) => ({
            ...prevDetails,
            [field]: value,
        }));
    };


    // Function to handle 'next' button press
    const handleSave = () => {
        console.log("Submitted Details:", personalDetails);
        const pd = {name: "Noa erez", city: "Tel aviv", phoneNumber: "0541234567"};
        navigation.navigate('userProfile', { profileDetails: pd });
    };
    

  
  
    return (
      <KeyboardAvoidingView
      style={moreStyles.container}
      behavior="padding"
        >
      
        <SafeAreaView style={moreStyles.container}>
          <ScrollView>
            
            <View style={moreStyles.container}>
                <Text style={styles.title}>Update Setting</Text>
            </View>

                <Input
                    label="Full name"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="person" size={18} />}
                    placeholder=" Enter your full name"
                    onChangeText={(text) => handleInputChange("ownerName", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    label="Location"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="location-outline" size={18} />}
                    placeholder=" Enter your City"
                    onChangeText={(text) => handleInputChange("city", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    label="Phone Number"
                    labelStyle={styles.inputLabel}
                    leftIcon={<AnotherIcon name="phone-alt" size={18} />}
                    placeholder=" Enter your phone number"
                    keyboardType="phone-pad"
                    onChangeText={(text) => handleInputChange("phoneNumber", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <TouchableOpacity style={moreStyles.finishButton} onPress={handleSave}>
                    <Text style={moreStyles.buttonText}>Save</Text>
                </TouchableOpacity>

                


    
            
          

          </ScrollView>   
        </SafeAreaView>  
      </KeyboardAvoidingView> 
    );
}

const moreStyles = StyleSheet.create({
    layout: {
        flex: 1, 
        backgroundColor: COLORS.lightWhite, 
        alignContent: 'center',
        justifyContent: 'center',        
    },
    container: {
        padding: 17,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        backgroundColor: COLORS.lightWhite,
        paddingVertical: 40,
        alignContent: 'center',
        
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
    color: COLORS.lightWhite, 
    fontWeight: 'bold',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: COLORS.btnBlue,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
},
startButtonText: {
    color: '#333',
    fontWeight: 'bold',
},
btn: {
  borderWidth: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 16,
  backgroundColor: 'transparent',
  borderColor: '#266EF1',
},
btnGroup: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginHorizontal: -6,
  marginTop: 18,
},
btnText: {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '600',
  color: '#266EF1',
},
btnPrimary: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,
  paddingVertical: 8,
  paddingHorizontal: 16,
  borderWidth: 1,
  backgroundColor: '#266EF1',
  borderColor: '#266EF1',
},
btnPrimaryText: {
  fontSize: 14,
  lineHeight: 20,
  fontWeight: '600',
  color: '#fff',
},
backButton: {
  position: 'absolute',
  top: 20,
  left: 2,
  zIndex: 1,
},

});