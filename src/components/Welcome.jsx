import { useState } from "react";
import { Input, Divider } from '@rneui/themed';
//import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/FontAwesome';
import MoreIcon from 'react-native-vector-icons/Ionicons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView
} from "react-native";
import { useRouter } from "expo-router";

import styles from './welcome.style'
import COLORS from "../../assets/theme";

import DateTimePickerExample from "./DatePick";

 
const Welcome = () => {
  const router = useRouter();
  const [detailsShow, setdetailsShow] = useState(false);

  // State to hold the entered details
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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [error, setError] = useState('');

  const validateTimes = (start, end) => {
    if (start >= end) {
      setError('End time must be greater than start time');
    } else {
      setError('');
    }
  };

  // Convert details object into an array of objects
  const detailsArray = Object.entries(details).map(([category, value]) => ({ category, value }));

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.category}</Text>
      <Text>{item.value}</Text>
    </View>
  );

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    const start = startDate ? startDate.toLocaleString() : 'Not selected';
    console.log(start);

    setDetails((prevDetails) => ({
      ...prevDetails,
      ["from"]: start,
    }));
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    const end = endDate ? endDate.toLocaleString() : 'Not selected';
    console.log(end); // Print start date

    //validateTimes(startDate, selectedDate);
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
    setdetailsShow(true);
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.container}>
          <Text style={styles.userName}>Hello user,</Text>
          <Text style={styles.welcomeMessage}>Add your Parking Spot</Text>
        </View>


        <Input
          label="Full Name"
          labelStyle={styles.sectionTitle}
          leftIcon={<MoreIcon name="person" size={18} />}
          placeholder=" Enter your full name" 
          onChangeText={(text) => handleInputChange("ownerName", text)}
          inputStyle={styles.Input}
        />

        <Input
          label="Location"
          labelStyle={styles.sectionTitle}
          leftIcon={<MoreIcon name="location-outline" size={18} />}
          placeholder=" Enter your City" 
          onChangeText={(text) => handleInputChange("city", text)}
          inputStyle={styles.Input}
        />

        <Input
          placeholder=" Enter Parking Street" 
          leftIcon={<Icon name="street-view" size={18} />}
          onChangeText={(text) => handleInputChange("street", text)}
          inputStyle={styles.Input}
        />
        <Input
          placeholder="   Enter House Number" 
          leftIcon={<Icon name="" size={18} />}
          onChangeText={(text) => handleInputChange("houseNumber", text)}
          inputStyle={styles.Input}
        />

        <Input
          label="Hourly Price"
          labelStyle={styles.sectionTitle}
          leftIcon={<AnotherIcon name="coins" size={18} />}
          placeholder=" Enter desired hourly price"
          onChangeText={(text) => handleInputChange("price", text)}
          inputStyle={styles.Input}
        />

        <Input
          label="Phone Number"
          labelStyle={styles.sectionTitle}
          leftIcon={<AnotherIcon name="phone-alt" size={18} />}
          placeholder=" Enter your phone number"
          keyboardType="phone-pad"
          onChangeText={(text) => handleInputChange("phoneNumber", text)}
          inputStyle={styles.Input}
        />
      

        <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        
        {detailsShow && (
                <>
                <View>
                  <Text>OwnerName: {details.ownerName}</Text>
                  <Text>City: {details.city}</Text>
                  <Text>Street: {details.street}</Text>
                  <Text>HouseNumber: {details.houseNumber}</Text>
                  <Text>price: {details.price}</Text>
                  <Text>phone: {details.phoneNumber}</Text>
                </View>
                </>
            )}

        <Divider width={5} color={COLORS.lightgrey} marginTop={20} />

        <View style={{flex: 1, justifyContent: 'center', flexDirection: "column", marginTop:15}}>
          <View style={{ flexDirection: "row", justifyContent: "flex-start", marginLeft: 20}}>
            <MoreIcon name="calendar" size={40} color={COLORS.orenge} />
            
            <Text style={styles.sectionTitle}>Select an availability range </Text>
          </View>
          <Text style={styles.userName}>Start time : </Text>
          
        </View>

        
        <DateTimePickerExample
          minDate={new Date()}
          onDateChange={handleStartDateChange}
        />

        <View style={{flex: 1, justifyContent: 'center', flexDirection: "column", marginTop:15}}>
            <Text style={styles.userName}>End time : </Text>
            <Text style={styles.errorText}>Note: end time must be greater than start time</Text>
          
        </View>

        <DateTimePickerExample
          minDate={startDate}
          onDateChange={handleEndDateChange}
        />

        <View>
          <Text>start: {startDate ? startDate.toLocaleString() : 'Not selected'}</Text>
          <Text>end: {endDate ? endDate.toLocaleString() : 'Not selected'}</Text>
        </View>

        <Divider width={5} color={COLORS.lightgrey} marginTop={20} />

        
        <FlatList
          data={detailsArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />



        <TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

        
        
      
        
        
      
      </View>
    </ScrollView>



  )
}

export default Welcome;