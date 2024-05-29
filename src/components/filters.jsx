// Filter.jsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, View, TouchableOpacity, TextInput } from 'react-native';
import { Header, Text } from '@rneui/themed';
import { FontAwesome } from '@expo/vector-icons';
import Divider from './divider';
import DatePicker from './DatePick';
import styles2 from './addProduct.style'
import { COLORS } from '../../assets/theme';
import Feather from 'react-native-vector-icons/Feather';
import SingleSelectListDropDown from './SingleSelectListDropDown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;

const Filter = ({ navigation, route }) => {
  
  const { onReturn, filters, locationsList } = route.params;

  const [startDate, setStartDate] = useState(filters.startDate != "" ? filters.startDate : ""); // State for start date
  const [endDate, setEndDate] = useState(filters.endDate != "" ? filters.endDate : "");  // State for end date
  const [city, setCity] = useState(filters.city ? filters.city.toString() : "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ? filters.maxPrice : null);
  const [selectedCategory, setSelectedCategory] = useState(filters.selectedCategory ? filters.selectedCategory : "0");

  const [dateFilter, setDateFilter] = useState(startDate && endDate ? true : false);
  const [openPicker, setOpenPicker] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState(false);
  
  const [finalStartDate, setFinalStartDate] = useState(filters.startDate != "" ? filters.startDate : ""); // State for final start date
  const [finalEndDate, setFinalEndDate] = useState(filters.endDate != "" ? filters.endDate : "");  // State for final end date



  const updateDateFilter = () => {
    if (finalStartDate && finalEndDate && finalStartDate <= finalEndDate) {
      setDateFilter(true);
    }
    else{
      setDateFilter(false);
    }
  };

  const SelectionText = () => {
    if (finalStartDate && finalEndDate && dateFilter){
      return `${finalStartDate.toLocaleDateString()} - ${finalEndDate.toLocaleDateString()}` 
    }
    else {
      return `Any Date`
    }
  }
  
  function isValidDates () {
    if (startDate && endDate){

      return startDate <= endDate;
    }
    if (!startDate && !endDate && !dateFilter){
      return true;
    }
    return false;
  }

  function isValidInputOnSearchPress () {
    if (finalStartDate && finalEndDate){

      return finalStartDate <= finalEndDate;
    }
    if (!finalStartDate && !finalEndDate){
      return true;
    }
    return false;
  
  }



  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1}}>
        
      <Header

        leftComponent={
          
            <TouchableOpacity style={styles.buttonContainer} onPress={navigation.goBack}> 
                  <Feather style={styles.headerComponent} 
                    name="chevron-left" 
                    type="material" 
                    color={COLORS.black}
                    size={26}
                    />
                </TouchableOpacity>

        }

        centerComponent={{ text: 'Filters', style: { color: COLORS.cartTitle, fontSize: 21, fontWeight: 'bold', marginTop: -20 } }}
            
        rightComponent={{}}
        backgroundColor={'white'}
        containerStyle={styles.headerContainer}
        />

        <ScrollView style={{ paddingBottom:140}}>

          {/* Location Input */}
          {/* <View style={styles.about}>
            <Text style={styles.aboutTitle}>Location </Text> */}
            {/* Single-Select List for Categories (All Categories) */}
          
            {/* <SingleSelectListDropDown
              dataToShow={locationsList}
              selectedData={city}
              onSelectCategory={(selected) => {
                if (selected === "0") {
                    setCity(""); // Clear city if the selected value is "0"
                } else {
                    const index = parseInt(selected, 10); // Parse selected as an integer
                    const selectedCity = locationsList[index]; // Access the selected city from locationsList
                    console.log('selectedCity', selectedCity);
                    setCity(selectedCity); // Set the city to the selected city
                }
            }}
              placeholderText={city ? city : "Select a location"}
            />
          </View>
          <Divider />  */}

          <View style={styles.about}>
            <Text style={styles.aboutTitle}>Max price</Text>

            <View style={styles.searchSectionWrapper}>
                <View style={styles.searchBarNew}>
                <Entypo 
                color="#000" 
                name="price-tag" 
                size={18} 
                style={{marginRight:5}}/>
                  <TextInput 
                    placeholder="Enter desired max price                 " 
                    placeholderTextColor={COLORS.grey3}
                    defaultValue={maxPrice??""} 
                    keyboardType="numeric"
                    onChangeText={(newText) => {
                      if (newText == "") {
                        // Update the maxPrice in the state
                        if (filters.maxPrice != ""){
                          setMaxPrice(null);
                        }
                        else {
                          setMaxPrice(filters.maxPrice);
                        }
                      }
                      else {
                        // Update the maxPrice in the state
                        setMaxPrice(newText);
                      }
                    }}
                    
                    />
                </View>
                </View>
            
          </View>
          <Divider /> 
              <View style={styles.about}>
                <Text style={styles.aboutTitle}> Dates : {SelectionText()}</Text>

              </View>

              <View>
            <View style={styles.btnGroup}>
                <TouchableOpacity
                  onPress={() => { setFinalStartDate(""); setFinalEndDate(""); setDateFilter(false); }}

                  style={{ flex: 1, paddingHorizontal: 10 }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>
                    <MaterialCommunityIcons
                      color="#000"
                      name="delete"
                      size={16} />
                      Remove Selection</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {
                    setStartDate("");
                    setEndDate("");
                    if (finalStartDate && finalEndDate) {setDateFilter(true)}
                    setOpenPicker(!openPicker);
                   
                  }}
                  style={{ flex: 1, paddingHorizontal: 10}}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Select Dates   
                    {' '}<Feather
                      color="#706F7B"
                      name={openPicker ? "chevron-up" : "chevron-down"}
                      size={16} /> </Text>
                  </View>
                </TouchableOpacity>
              </View>

        </View>
        {openPicker && (  <View >
        <View style={styles2.dateView}>
                <Text style={styles2.dateTitle}> Start Date: </Text>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onDateChange={(date) => {setStartDate(date);}}
                                               
                      minDate={new Date()}
                    />
                </View>
                <Text> </Text>
                <View style={styles2.dateView}>
                <Text style={styles2.dateTitle}>Finish Date: </Text>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onDateChange={(date) => {setEndDate(date);  
                    }
                  }
                      minDate={new Date()}
                    />
                </View>
                <Text></Text>

                <TouchableOpacity
                  onPress={() => {
                    if (isValidDates()) {
                      setInvalidInputMsg(false);
                      setOpenPicker(!openPicker); 
                      setDateFilter(true);
                      setFinalStartDate(startDate);
                      setFinalEndDate(endDate);
                    }
                    else {setInvalidInputMsg(true);}
                    }}
                  disabled={!startDate || !endDate || startDate > endDate}
                  
                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}> Save </Text>
                  </View>
                </TouchableOpacity>
                { invalidInputMsg && <Text style={styles.errorMsg}> Invalid Dates </Text> }


                </View>)}
          <Divider /> 

          

        </ScrollView>
        <View style={styles.overlay}>
            
            {!openPicker && 
          (<TouchableOpacity
              // onPress={() => { console.log({ startDate, endDate, selectedCategoriesAll, maxPrice, city }); navigation.goBack(); }}

              onPress={() => { 
                if (isValidInputOnSearchPress()) {
                  setStartDate(finalStartDate);
                  setEndDate(finalEndDate);
                onReturn({ selectedCategory, startDate:finalStartDate , endDate:finalEndDate, maxPrice, city }); navigation.goBack();
                updateDateFilter(); }
                else{
                  setInvalidInputMsg(true);
                }
              }}
              style={{ flex: 1, paddingHorizontal: 25}}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}> 
                {<FontAwesome name="search" size={16} color="white" />}
                {' '} Search</Text>
              </View>
            </TouchableOpacity>)}

          </View>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    //padding: 16,
    //marginTop: 50,
  },
  closeIcon: {
    marginBottom: 30,
    marginTop: -45,
    marginLeft: 10,
  },
  buttonGroupContainer: {
    height: 40,
    marginTop: 30,
    marginVertical: 10,
    borderRadius: 15, // Rounded edges for the whole button group
    overflow: 'hidden', // Ensure the rounded edges are applied
  },
  selectedButtonStyle: {
    backgroundColor: COLORS.orangeLikeStars,
  },
  innerBorderStyle: {
    //color: 'transparent', // Hide the border between buttons
  },
  buttonStyle: {
    borderRadius: 15, // Rounded edges for individual buttons
  },
  textFieldContainer: {
    marginBottom: 15,
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: COLORS.orangeLikeStars,
    borderColor: COLORS.orangeLikeStars,
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
 
  
  btn: {
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.inputTextGrey,
    //borderColor: COLORS.orangeLikeStars,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 16,
    
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    marginHorizontal:-30,
    
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 0,
    marginTop: 18,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#266EF1',
  },
  errorMsg:{
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: 'red',
  },
  about: {
    marginHorizontal: 20,
    marginTop: 18,
  },
  aboutTitle: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 32,
    color: COLORS.cartTitle,
    marginBottom: 4,
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f3eff6',   // grey color good
    paddingHorizontal: 25,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
    marginLeft: 12,
  },
  radio: {
    height: 38,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  radioLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    marginLeft: 12,
    marginRight: 'auto',
  },
  radioCircle: {
    width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
    borderRadius: 9999,
    backgroundColor: 'transparent',
    borderWidth: CIRCLE_RING_SIZE,
    borderColor: '#d4d4d4',
  },
  radioCircleInset: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: 9999,
    position: 'absolute',
    top: CIRCLE_RING_SIZE,
    left: CIRCLE_RING_SIZE,
  },
  sheetBody: {
    marginTop:-10,
    paddingHorizontal: 0,
    paddingVertical: 14,
  },
  action: {
    width: 36,
    height: 36,
    backgroundColor: '#ffffff',
    borderWidth: 0,
    //borderColor: '#e5e5e5',
    //borderStyle: 'transparent',
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: -8,
    marginBottom: 12,
  },
  // divider
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
  headerContainer: {
    backgroundColor: '#fff',
    //backgroundColor: COLORS.greyCityColor,
    justifyContent: 'flex-start',
    height: 120,
    marginTop: -10,
    borderBottomWidth: 1.5,
    borderBottomColor: COLORS.lightgrey,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  backBtn:{
    position: 'absolute',
    top: 30,
    left: 80,
    zIndex: 999, // Ensure it's above other content
    // flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
    // marginLeft: 10,
  },
  square: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderStyle: 'solid',
    borderRadius: 12,
    width: 40,
    height: 40,
    bottom: -10,
    right: 25,
    zIndex: -1, // Ensure it's behind the button
    //borderWidth: 1,
    //borderColor: '#f5f5f5',
    elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOpacity: 0.1, // iOS shadow
      shadowRadius: 2, // iOS shadow
      shadowOffset: {
        width: 0,
        height: 1,
      },
  },
  searchSectionWrapper:{
    flexDirection: 'row',
    marginVertival:20,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
searchBarNew:{
    flex:1,
    flexDirection:'row',
    backgroundColor: '#fff',
    padding:16,
    borderRadius:10,
    paddingHorizontal: 25,
    marginRight:0,
  },
  headerComponent: {
    position: 'absolute',
    bottom: -25,
    right: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 32,
    right: 20,
    zIndex: 999, // Ensure it's above other content
  },
});

export default Filter;