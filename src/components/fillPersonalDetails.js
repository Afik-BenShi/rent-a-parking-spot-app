import { useState } from "react";
import { Input, Divider } from '@rneui/themed';
//import Icon3 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from 'react-native-vector-icons/FontAwesome';
import MoreIcon from 'react-native-vector-icons/Ionicons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';
import ExtraIcon from 'react-native-vector-icons/FontAwesome6';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";

import styles from './welcome.style'
import { COLORS } from "../../assets/theme";

import DateTimePickerExample from "./DatePick";

 
const FillPersonalDetails = ({ sendDataToParent, sendStartDateToParent, sendEndDateToParent }) => {
  //const [detailsShow, setdetailsShow] = useState(false);

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
  //const [error, setError] = useState('');

  {/*const validateTimes = (start, end) => {
    if (start >= end) {
      setError('End time must be greater than start time');
    } else {
      setError('');
    }
  };*/}

  // Convert details object into an array of objects
  const detailsArray = Object.entries(details).map(([category, value]) => ({ category, value }));

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.category}</Text>
      <Text>{item.value}</Text>
    </View>
  );

  const onStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
    const start = startDate ? startDate.toLocaleString() : 'Not selected';
    console.log(start);

    sendStartDateToParent(selectedDate);
  };

  const onEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
    const end = endDate ? endDate.toLocaleString() : 'Not selected';
    console.log(end); 

    //validateTimes(startDate, selectedDate);
    sendEndDateToParent(selectedDate);
  };


  // Function to handle input change and update details state
  const onInputChange = (field, value) => {
    
    const parsedValue = field === "price" || field === "houseNumber" ? parseInt(value) : value;

    setDetails((prevDetails) => ({
      ...prevDetails,
      [field]: parsedValue,
    }));
  };


  // Function to handle submit button press
  {/*const handleSubmit = () => {
    // Do something with the entered details, such as displaying them
    console.log("Submitted Details:", details);
    setdetailsShow(true);
  };*/}

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={styles.container}>

        
            <View style={styles.header}>
                <Text style={styles.title}>Add your parking spot </Text>
            </View>
        </View>

        <ScrollView>
            <View>
                <Input
                    label="Full Name"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="person" size={18} />}
                    placeholder=" Enter your full name"
                    onChangeText={(text) => sendDataToParent("ownerName", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    label="Location"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="location-outline" size={18} />}
                    placeholder=" Enter your City"
                    onChangeText={(text) => sendDataToParent("city", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    placeholder=" Enter Parking Street"
                    leftIcon={<Icon name="street-view" size={18} />}
                    onChangeText={(text) => sendDataToParent("street", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />
                <Input
                    placeholder=" Enter House Number"
                    leftIcon={<ExtraIcon name="house" size={18} />}
                    onChangeText={(text) => sendDataToParent("houseNumber", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    label="Hourly Price"
                    labelStyle={styles.inputLabel}
                    leftIcon={<AnotherIcon name="coins" size={18} />}
                    placeholder=" Enter desired hourly price"
                    onChangeText={(text) => sendDataToParent("price", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <Input
                    label="Phone Number"
                    labelStyle={styles.inputLabel}
                    leftIcon={<AnotherIcon name="phone-alt" size={18} />}
                    placeholder=" Enter your phone number"
                    keyboardType="phone-pad"
                    onChangeText={(text) => sendDataToParent("phoneNumber", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                {/*<TouchableOpacity style={styles.SubmitButton} onPress={handleSubmit}>
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
                )} */}

                <Divider width={5} color={COLORS.lightgrey} marginTop={20} />

                <View>
                    <View>
                        {/*<MoreIcon name="calendar" size={40} color={COLORS.orenge} />*/}

                        <Text style={styles.sectionTitle}>Select an availability range </Text>
                    </View>
                    <Text style={styles.inputLabel}>   Start time : </Text>
                </View>

                <DateTimePickerExample minDate={new Date()} onDateChange={onStartDateChange}/>
                <Text> </Text>

                <View>
                    <Text style={styles.inputLabel}>   End time : </Text>
                    <Text style={styles.errorText}>Note: end time must be greater than start time</Text>
                </View>

                <DateTimePickerExample minDate={startDate} onDateChange={onEndDateChange} />
                <Text> </Text>
                
                <View>
                    <Text>start: {startDate ? startDate.toLocaleString() : 'Not selected'}</Text>
                    <Text>end: {endDate ? endDate.toLocaleString() : 'Not selected'}</Text>
                </View>

                {/*
                <Divider width={5} color={COLORS.lightgrey} marginTop={20} />

                <FlatList
                    data={detailsArray}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            */}

                
            </View>
            
            </ScrollView>
    </SafeAreaView>
);
}

export default FillPersonalDetails;

