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
import FeatherIcon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { set } from 'lodash';

const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;

const Filter = ({ navigation, route }) => {
  
  const { onReturn, filters, locationsList, items } = route.params;
  console.log('onReturn', onReturn)
  console.log('locationsList', locationsList);
  console.log('filters', filters);

  const [startDate, setStartDate] = useState(filters.startDate != "" ? filters.startDate : ""); // State for start date
  const [endDate, setEndDate] = useState(filters.endDate != "" ? filters.endDate : "");  // State for end date
  const [city, setCity] = useState(filters.city ? filters.city.toString() : "");
  const [maxPrice, setMaxPrice] = useState(filters.maxPrice ? filters.maxPrice : null);
  const [selectedCategory, setSelectedCategory] = useState(filters.selectedCategory ? filters.selectedCategory : "0");

  const [dateFilter, setDateFilter] = useState(startDate && endDate ? true : false);
  const [openPicker, setOpenPicker] = useState(false);
  const [invalidInputMsg, setInvalidInputMsg] = useState(false);
  
  const [value, setValue] = useState(parseInt(selectedCategory));
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
      console.log("start "+ startDate);
      console.log("end "+ endDate);

      return startDate <= endDate;
    }
    if (!startDate && !endDate && !dateFilter){
      return true;
    }
    return false;
  }

  function isValidInputOnSearchPress () {
    if (finalStartDate && finalEndDate){
      console.log("final start "+ finalStartDate);
      console.log("final end "+ finalEndDate);

      return finalStartDate <= finalEndDate;
    }
    if (!finalStartDate && !finalEndDate){
      return true;
    }
    return false;
  
  }



  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          
          <Header style={styles.actionWrapper}
            leftComponent={
              <TouchableOpacity
              onPress={navigation.goBack}
              style={{ marginRight: 'auto', marginTop:-30}}>
              <View style={styles.action}>
                <FeatherIcon
                  color="#242329"
                  name="chevron-left"
                  size={20} />
              </View>
            </TouchableOpacity>
              
            }
            //centerComponent={{ text: 'Refine your search', style: { color: '#fff', fontSize: 21, fontWeight: 'bold', marginTop: -20 } }}
            centerComponent={{ text: 'Filters', style: { color: '#fff', fontSize: 21, fontWeight: 'bold', marginTop: -20 } }}
            
            backgroundColor={COLORS.grey2}
            borderRadius={12}
          />

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
        <View style={styles.about}>
            <Text style={styles.aboutTitle}>Category </Text> 

        <View style={styles.sheetBody}>
          {items.map(({ key, label }, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setValue(index);
                  setSelectedCategory(items[index].key);
                }}>
                <View style={styles.radio}>

                  <Text style={styles.radioLabel}>{label}</Text>

                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInset,
                        isActive && { backgroundColor: '#ff6a55' },
                      ]} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          
        </View>
        </View>
          

          {/* Location Input */}
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>Location </Text>
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
          <Text></Text>
          <View style={styles.about}>
            <Text style={styles.aboutTitle}>Max price</Text>
            
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
              placeholder={"Enter desired max price"}
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
          {/* <Divider /> */}

              <View style={styles.about}>
                <Text style={styles.aboutTitle}> Dates : {SelectionText()}</Text>

              </View>

              <View>
            <View style={styles.btnGroup}>
                <TouchableOpacity
                  onPress={() => { setFinalStartDate(""); setFinalEndDate(""); setDateFilter(false); }}

                  style={{ flex: 1, paddingHorizontal: 6 }}>
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
                      onDateChange={(date) => {setEndDate(date); }}
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
                  //disabled={!startDate || !endDate || startDate > endDate}
                  
                  style={{ flex: 1, paddingHorizontal: 6 }}>
                  <View style={styles.btn}>
                    <Text style={styles.btnText}> Save </Text>
                  </View>
                </TouchableOpacity>
                { invalidInputMsg && <Text style={styles.errorMsg}> Invalid Dates </Text> }


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
              style={{ flex: 1, paddingHorizontal: 6 }}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}> 
                {<FontAwesome name="search" size={16} color="white" />}
                {' '} Search</Text>
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
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 8,
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
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
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
  radio: {
    height: 44,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 0,
  },
  radioLabel: {
    fontSize: 17,
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
    paddingHorizontal: 0,
    paddingVertical: 14,
  },
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
    marginHorizontal: -8,
    marginBottom: 12,
  },
});

export default Filter;