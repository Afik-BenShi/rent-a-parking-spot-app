import React, { useState } from 'react';
import FillPersonalDetails from "../components/fillPersonalDetails";
import { COLORS} from "../../assets/theme";
import Icon from 'react-native-vector-icons/Ionicons'; 
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import NextBackBtn from '../components/nextAndBackBtn';
import { Header } from 'react-native-elements';

export default function AddProductPage ({ navigation, route }) {
  
   const { updateProducts } = route.params;

    // State to hold the entered details
    const [details, setDetails] = useState({
        ownerId: "",    // get the owner ID from the data base
        productName: "",
        category: "",  
        city: "",
        price: "",
        from: "",
        until: "", 
        productDescription: "",
        fromDate: "",
        untilDate: "",
    });

    const handleStartDateChange = (startDate) => {

      const start = startDate ? startDate.toLocaleDateString('en-GB') : 'Not selected'; 
      console.log(start);

      // // handle case that user selects start date after end date
      // if (details.untilDate && startDate > details.untilDate) {
      //     alert("Start date must be before end date");
          
      //     return;
      // }

      setDetails((prevDetails) => ({
          ...prevDetails,
          ["from"]: start,
          ["fromDate"]: startDate,
      }));
  };

  const handleEndDateChange = (endDate) => {
      const end = endDate ? endDate.toLocaleDateString('en-GB') : 'Not selected';
      console.log(end); 
      
      setDetails((prevDetails) => ({
          ...prevDetails,
          ["until"]: end,
          ["untilDate"]: endDate,
      }));
  };


    // Function to handle input change and update details state
    const handleInputChange = (field, value) => {
    
        const parsedValue = field === "price" ? parseInt(value) : value.trim();

        setDetails((prevDetails) => ({
            ...prevDetails,
            [field]: parsedValue,
        }));
    };

    const handleCategoryChange = (selectedCategory) => {
      setDetails((prevDetails) => ({
        ...prevDetails,
        category: selectedCategory,
      }));      
    }

    const isValidInput = () => {
      return details.productName !== "" && details.city !== "" && details.price !== "" && details.from !== "" && details.until !== "" && details.productDescription !== "" && details.category !== "";
    }

    // Function to handle 'next' button press
    // TODO: Add input validation
    const handlePressNext = async (event) => {
        console.log("Submitted Details (before submit):", details);
        if (!isValidInput()){
          alert("Please fill all the fields");
          return;
        }

        navigation.navigate("submitDetailsBeforePost" ,
        { detailsList: details , onSuccess: updateProducts});
        
    };
    

  
    return (
      <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
        >
      
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <View style={styles.actionWrapper}>
            
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ marginRight: 'auto' }}>
              <View style={styles.action}>
                <FeatherIcon
                  color="#242329"
                  name="chevron-left"
                  size={20} />
              </View>
            </TouchableOpacity>
  
          </View>

          <ScrollView>

            <FillPersonalDetails 
              sendDataToParent={handleInputChange} 
              sendStartDateToParent={handleStartDateChange}
              sendEndDateToParent={handleEndDateChange}
              sendCatToParent={handleCategoryChange}
              />
          

            <NextBackBtn
              nextText="Next"
              backText="Back"
              navigation={navigation}
              onNextPress={handlePressNext}
            />    
          
          </ScrollView>   
        </SafeAreaView>  
      </KeyboardAvoidingView> 
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 17,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    backgroundColor: COLORS.lightWhite,
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

divider: {
  overflow: 'hidden',
  width: '100%',
},
dividerInset: {
  width: '100%',
  borderWidth: 2,
  borderColor: '#e5e5e5',
  borderStyle: 'dashed',
  marginTop: -2,
  marginRight:5,    
},
/** Action */
action: {
  width: 36,
  height: 36,
  backgroundColor: '#ffffff',
  borderWidth: 1,
  borderColor: '#e5e5e5',
  borderStyle: 'solid',
  borderRadius: 12,
  marginHorizontal: 8,
  alignItems: 'center',
  justifyContent: 'center',
},
actionWrapper: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginHorizontal: 0,
  marginBottom: 12,
  marginVertical:35
},

});