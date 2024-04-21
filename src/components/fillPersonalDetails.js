import { useState } from "react";
import { Input, Divider } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import MoreIcon from 'react-native-vector-icons/Ionicons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import styles from './addProduct.style'
import { COLORS } from "../../assets/theme";

import DateTimePickerExample from "./DatePick";
import SingleSelectedDropDown from "./SingleSelectListDropDown";

 
const FillPersonalDetails = ({ sendDataToParent, sendStartDateToParent, sendEndDateToParent, sendCatToParent }) => {


  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date())


  
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


  
return (
  
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
        <View style={styles.container}>

        
            <View style={styles.header}>
                <Text style={styles.title}>Add your product here </Text>
            </View>
        </View>

        <ScrollView>
            <View>
                
                {/*
                <Input
                    label="Full name"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="person" size={18} />}
                    placeholder=" Enter your full name"
                    onChangeText={(text) => sendDataToParent("ownerName", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />
              */}

                <Input
                    label="Product name"
                    labelStyle={styles.inputLabel}
                    //leftIcon={<MoreIcon name="product" size={18} />}
                    placeholder=" Enter product name"
                    onChangeText={(text) => sendDataToParent("productName", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />
                
                <View style={{ flex: 1, padding: 20 }}>
                <Text style={{ ...styles.inputLabel, marginLeft: 0 }}>Product category</Text>
                <SingleSelectedDropDown
                      onSelectCategory = {sendCatToParent}
                />
                </View>
                
                <Input
                    label="Location"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="location-outline" size={18} />}
                    placeholder=" Enter your location"
                    onChangeText={(text) => sendDataToParent("city", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />
          

                
                <Input
                    label="Daily Price rate"
                    labelStyle={styles.inputLabel}
                    leftIcon={<Entypo color="#000" name="price-tag" size={16} />  }
                    placeholder=" Enter desired daily price"
                    keyboardType="phone-pad"
                    onChangeText={(text) => sendDataToParent("price", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                {/*
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
              */}
                    
                    <View style={styles.divider}>
                    <View style={styles.dividerInset} /></View>

                <View>
                    <View>
                        <Text style={styles.sectionTitle}>Choose a range of available days </Text>
                    </View>
                    
                </View>
                
                <View style={styles.dateView}>
                    <Text style={styles.datesLables}>  Start day : </Text>
                    <DateTimePickerExample minDate={new Date()} onDateChange={onStartDateChange}/>
                </View>
                <Text> </Text>
                <View style={styles.dateView}>
                    <Text style={styles.datesLables}>  End day : </Text>
                    <DateTimePickerExample minDate={startDate} onDateChange={onEndDateChange} />
                </View>

                <Text> </Text>
                
                {/* <View>
                    <Text>start: {startDate ? startDate.toLocaleString() : 'Not selected'}</Text>
                    <Text>end: {endDate ? endDate.toLocaleString() : 'Not selected'}</Text>
                </View> */}


                
                <Input
                    //multiline
                    //numberOfLines={4}
                    label="Description"
                    labelStyle={styles.inputLabel}
                    //leftIcon={<AnotherIcon name="coins" size={18} />}
                    placeholder=" Enter product description"
                    onChangeText={(text) => sendDataToParent("productDescription", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />

                <TouchableOpacity style={styles.uploadImgButton} onPress={() => {}}>
                  <Text style={styles.buttonText}> 
                    {<MaterialIcons color={COLORS.similarToBlack} name="file-upload" size={15} />}
                    Upload image</Text>
                </TouchableOpacity>
    

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