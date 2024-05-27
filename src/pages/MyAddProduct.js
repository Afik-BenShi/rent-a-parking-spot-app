import React, { useState } from 'react';
import FillPersonalDetails from "../components/fillPersonalDetails";
import { COLORS } from "../../assets/theme";
import FeatherIcon from 'react-native-vector-icons/Feather';

import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import NextBackBtn from '../components/nextAndBackBtn';

export default function AddProductPage({ navigation, route }) {

  const { userId } = route.params;

  console.log("userId in addProductPage: ", userId);
  

  // State to hold the entered details
  const [details, setDetails] = useState({
    ownerId: userId,    // get the owner ID from the data base
    productName: "",
    category: "",
    address: "",
    price: "",
    from: "",
    until: "",
    productDescription: "",
    fromDate: "",
    untilDate: "",
    imageUri: ""
  });

  const handleStartDateChange = (startDate) => {

    const start = startDate ? startDate.toLocaleDateString('en-GB') : 'Not selected';

    setDetails((prevDetails) => ({
      ...prevDetails,
      ["from"]: start,
      ["fromDate"]: startDate.toISOString(),  // convert the Date object to a string - to remove the warning
    }));                                      // after that need to convert it back to Date object
  };

  const handleEndDateChange = (endDate) => {
    const end = endDate ? endDate.toLocaleDateString('en-GB') : 'Not selected';

    setDetails((prevDetails) => ({
      ...prevDetails,
      ["until"]: end,
      ["untilDate"]: endDate.toISOString(),
    }));
  };


  // Function to handle input change and update details state
  const handleInputChange = (field, value) => {
    let parsedValue;    

    switch (field) {
      case 'price': {
        parsedValue = parseInt(value)
        break;
      }
      case 'address': {
        parsedValue = value
        break;
      }
      default: {
        parsedValue = value.trim()
      }
    }

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
    return details.productName !== "" && details.address !== "" && details.price !== "" && details.from !== "" && details.until !== "" && details.productDescription !== "" && details.category !== "";
  }

  // Function to handle 'next' button press
  const handlePressNext = async (event) => {
    console.log("Submitted Details (before submit):", details);
    if (!isValidInput()) {
      alert("Please fill all the fields");
      return;
    }
    if (isNaN(details.price)) {
      alert("Price must be valid number");
      return;
    }

    navigation.navigate("submitDetailsBeforePost",
      { detailsList: details, user: userId });
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

        <ScrollView keyboardShouldPersistTaps='handled'>

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
  backButton: {
    position: 'absolute',
    top: 20,
    left: 2,
    zIndex: 1,
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
    marginVertical: 35
  },

});