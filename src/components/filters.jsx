// Filter.jsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Pressable, View, TouchableOpacity } from 'react-native';
import { Header, Input, ButtonGroup, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Divider from './divider';
import DatePicker from './DatePick';
import styles2 from './addProduct.style'
import { COLORS } from '../../assets/theme';
import Feather from 'react-native-vector-icons/Feather';
import SingleSelectListDropDown from './SingleSelectListDropDown';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Filter = ({ navigation, route }) => {
  
  const { onReturn, filters, locationsList } = route.params;
  console.log('onReturn', onReturn)
  console.log('locationsList', locationsList);

  const [startDate, setStartDate] = useState(filters.startDate != "" ? filters.startDate : ""); // State for start date
  const [endDate, setEndDate] = useState(filters.endDate != "" ? filters.endDate : "");  // State for end date
  const [city, setCity] = useState(filters.city ? filters.city.toString() : "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ? filters.maxPrice : null);

  const [dateFilter, setDateFilter] = useState(startDate && endDate ? true : false);
  const [openPicker, setOpenPicker] = useState(false);
  const [invalidDatesMsg, setInvalidDatesMsg] = useState(false);
  
  const updateDateFilter = () => {
    if (startDate && endDate && startDate <= endDate) {
      setDateFilter(true);
    }
    else{
      setDateFilter(false);
    }
  };

  const SelectionText = () => {
    if (startDate && endDate && dateFilter){
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}` 
    }
    else {
      return `all`
    }
  }
  
  function checkIfValidDates(pressSave = false) {
    if (startDate && endDate){
      console.log("start "+ startDate);
      console.log("end "+ endDate);

      if (startDate > endDate) {
          setInvalidDatesMsg(true); 
      }
      else {
        if (pressSave){
          setInvalidDatesMsg(false); 
        }
      }} 
    else {
      if (pressSave){setInvalidDatesMsg(true); }
      else {setInvalidDatesMsg(false); }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {/* Assume you have a custom Header component */}
          <Header
            leftComponent={
              <Pressable onPress={() => navigation.navigate('HomeCard')}>
                <FontAwesome name="times" color="#fff" size={20} style={styles.closeIcon} />
              </Pressable>
            }
            centerComponent={{ text: 'Refine your search', style: { color: '#fff', fontSize: 21, fontWeight: 'bold', marginTop: -20 } }}
          />

          {/* Price/Distance Button Group */}
          {/* <ButtonGroup
            onPress={(selectedIndex) => setSelectedOption(selectedIndex)}
            selectedIndex={selectedOption}
            buttons={buttonGroupOptions}
            containerStyle={styles.buttonGroupContainer}
            selectedButtonStyle={styles.selectedButtonStyle}
            innerBorderStyle={styles.innerBorderStyle}
            buttonStyle={styles.buttonStyle} // Rounded edges
          /> */}
          <Divider />

          {/* Single-Select List for Categories (All Categories) */}
          {/*
          <SingleSelectListDropDown
            //data={categories}
            selectedData={selectedCategory}
            onSelectCategory={(selected) => setSelectedCategory(selected)}
            title="Choose from all Categories"
          />
        */}
          

          {/* Location Input */}
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>Location for search:</Text>
            {/* Single-Select List for Categories (All Categories) */}
          
            <SingleSelectListDropDown
              dataToShow={locationsList}
              selectedData={city}
              onSelectCategory={(selected) => {setCity(selected);
                                      if (selected == "All Locations") {setCity("")};}}
              placeholderText={city ? city : "Select a location"}
            />
        
            
            
            {/* {<Input
              placeholder= {"Use my current location"}
              defaultValue= {city}
              leftIcon={{ type: 'font-awesome', name: 'map-marker', color: '#86939e' }}
              
              onChangeText={(newText) => {
                if (newText == "") {
                  if (filters.city != ""){
                    setCity("");
                  }
                  else {
                    setCity(filters.city);
                  }
                }
                else {
                  setCity(newText);  // Update the city in the state
                }
              }}
            />} */}
          </View>
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>Max price:</Text>
            
            {/*

            <Input
                    label="Location"
                    labelStyle={styles.inputLabel}
                    leftIcon={<MoreIcon name="location-outline" size={18} />}
                    placeholder=" Enter your location"
                    onChangeText={(text) => sendDataToParent("city", text)}
                    inputStyle={styles.inputControl}
                    inputContainerStyle={{ borderBottomWidth: 0 }} 
                />
            */}
            
            <Input
              inputContainerStyle={{ borderBottomWidth: 0 }} 
              inputStyle={styles.inputControl}  // -
              labelStyle={styles.inputLabel} // -
              placeholder={"Enter desire max price"}
              defaultValue={maxPrice??""} 
              leftIcon={<Ionicons name="location-outline" size={18} />}
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
                  console.log('newMaxPrice', newText)
                  // Update the maxPrice in the state
                  setMaxPrice(newText);
                }
              }}
            />
          </View>
          <Divider />

              <View style={styles.about}>
                <Text style={styles.aboutTitle}> Dates : {SelectionText()}</Text>

              </View>

              <View>
            <View style={styles.btnGroup}>
                <TouchableOpacity
                  onPress={() => { setStartDate(""); setEndDate(""); setDateFilter(false); }}

                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}>Remove Selection</Text>
                  </View>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {setOpenPicker(!openPicker);}}
                  style={{ flex: 1, paddingHorizontal: 6 }}>
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
        {openPicker && (  <View>
        <View style={styles2.dateView}>
                <Text style={styles2.dateTitle}> Start Date: {dateFilter && startDate.toLocaleDateString()} </Text>
                    <DatePicker
                      label="Start Date"
                      value={startDate}
                      onDateChange={(date) => {setStartDate(date);
                                               }}
                      minDate={new Date()}
                    />
                </View>
                <Text> </Text>
                <View style={styles2.dateView}>
                <Text style={styles2.dateTitle}>Finish Date: {dateFilter && endDate.toLocaleDateString()}</Text>
                    <DatePicker
                      label="End Date"
                      value={endDate}
                      onDateChange={(date) => {setEndDate(date); }}
                      minDate={new Date()}
                    />
                </View>
                <Text></Text>

                <TouchableOpacity
                  onPress={() => {if (startDate && endDate) {setOpenPicker(!openPicker); setDateFilter(true);} }}
                  disabled={!startDate || !endDate || startDate > endDate}
                  
                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}> Save </Text>
                  </View>
                </TouchableOpacity>
                {/* invalidDatesMsg && <Text style={styles.errorMsg}> Invalid Dates </Text> */}


                </View>)}

          {/* Date Picker for Start Date */}
          {/* <Text style={styles.dateTitle}> Start Date: {dateFilter && startDate.toLocaleDateString()} </Text>
          <DatePicker
            label="Start Date"
            value={startDate}
            onDateChange={(date) => setStartDate(date)}
            minDate={new Date()}
          />
          <Divider /> */}

          {/* Date Picker for End Date */}
          {/* <Text style={styles.dateTitle}>Finish Date: {dateFilter && endDate.toLocaleDateString()}</Text>
          <DatePicker
            label="End Date"
            value={endDate}
            onDateChange={(date) => setEndDate(date)}
            minDate={startDate}
          /> */}
          <Divider />
          <View style={styles.btnGroup}>
            <TouchableOpacity
              // onPress={() => { console.log({ startDate, endDate, selectedCategoriesAll, maxPrice, city }); navigation.goBack(); }}

              onPress={() => { updateDateFilter();
                onReturn({ startDate, endDate, maxPrice, city }); navigation.goBack(); }}
              style={{ flex: 1, paddingHorizontal: 6 }}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>Save</Text>
              </View>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: 50,
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
    color: 'transparent', // Hide the border between buttons
  },
  buttonStyle: {
    borderRadius: 15, // Rounded edges for individual buttons
  },
  textFieldContainer: {
    marginBottom: 15,
  },
  textFieldTitle: {
    fontSize: 10,
    color: '#266EF1',
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
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
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
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
    borderColor: COLORS.orangeLikeStars,
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
  errorMsg:{
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: 'red',
  },
  about: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 32,
    color: '#242329',
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
});

export default Filter;