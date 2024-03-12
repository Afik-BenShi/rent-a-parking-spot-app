// Filter.jsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Pressable, View, TouchableOpacity } from 'react-native';
import { Header, Input, ButtonGroup, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Divider from './divider';
import SingleSelectListDropDown from './SingleSelectListDropDown';
import DatePicker from './DatePick';

const Filter = ({ navigation, route }) => {
  const { onReturn } = route.params;
  console.log('onReturn', onReturn)

  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [startDate, setStartDate] = useState(new Date()); // State for start date
  const [endDate, setEndDate] = useState(new Date());  // State for end date
  const [city, setCity] = useState("")
  const [maxPrice, setMaxPrice] = useState(1000)


  const buttonGroupOptions = ['Distance', 'Price'];
  const categories = [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
    // Add more categories as needed
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {/* Assume you have a custom Header component */}
          <Header
            leftComponent={
              <Pressable onPress={() => navigation.navigate('Home')}>
                <FontAwesome name="times" color="#fff" size={20} style={styles.closeIcon} />
              </Pressable>
            }
            centerComponent={{ text: 'Narrow your search', style: { color: '#fff', fontSize: 21, fontWeight: 'bold', marginTop: -20 } }}
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
          <SingleSelectListDropDown
            data={categories}
            selectedData={selectedCategory}
            onSelectCategory={(selected) => setSelectedCategory(selected)}
            title="Choose from all Categories"
          />
          <Divider />

          {/* Location Input */}
          <View style={styles.textFieldContainer}>
            <Text h4 style={styles.textFieldTitle}>Where to search:</Text>
            <Input
              placeholder="Use my current location"
              defaultValue="Use my current location"
              leftIcon={{ type: 'font-awesome', name: 'map-marker', color: '#86939e' }}
              onChangeText={setCity}

            />
          </View>
          <View style={styles.textFieldContainer}>
            <Text h4 style={styles.textFieldTitle}>Max price:</Text>
            <Input
              placeholder="1000"
              defaultValue={maxPrice}
              leftIcon={{ type: 'font-awesome', name: 'map-marker', color: '#86939e' }}
              onChangeText={setMaxPrice}
            />
          </View>
          <Divider />

          {/* Date Picker for Start Date */}
          <Text style={styles.dateTitle}>Start Date:</Text>
          <DatePicker
            label="Start Date"
            value={startDate}
            onDateChange={(date) => setStartDate(date)}
            minDate={new Date()}
          />
          <Divider />

          {/* Date Picker for End Date */}
          <Text style={styles.dateTitle}>Finish Date:</Text>
          <DatePicker
            label="End Date"
            value={endDate}
            onDateChange={(date) => setEndDate(date)}
            minDate={startDate}
          />
          <Divider />
          <View style={styles.btnGroup}>
            <TouchableOpacity
              // onPress={() => { console.log({ startDate, endDate, selectedCategoriesAll, maxPrice, city }); navigation.goBack(); }}

              onPress={() => { onReturn({ startDate, endDate, selectedCategory, maxPrice, city }); navigation.goBack(); }}
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
    backgroundColor: '#266EF1',
  },
  innerBorderStyle: {
    color: 'transparent', // Hide the border between buttons
  },
  buttonStyle: {
    borderRadius: 15, // Rounded edges for individual buttons
  },
  textFieldContainer: {
    marginBottom: 0,
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
});

export default Filter;