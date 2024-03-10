// Filter.jsx
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, KeyboardAvoidingView, Pressable, View } from 'react-native';
import { Header, Input, ButtonGroup, Text } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Divider from './divider';
import SingleSelectListDropDown from './SingleSelectListDropDown';
import DatePicker from './DatePick';

const Filter = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedCategoriesAll, setSelectedCategoriesAll] = useState([]);
  const [startDate, setStartDate] = useState(new Date()); // State for start date
  const [endDate, setEndDate] = useState(new Date());  // State for end date


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
            centerComponent={{ text: 'Narrow your search', style: { color: '#fff', fontSize: 21, fontWeight: 'bold' ,marginTop: -20} }} 
          />

          {/* Price/Distance Button Group */}
          <ButtonGroup
            onPress={(selectedIndex) => setSelectedOption(selectedIndex)}
            selectedIndex={selectedOption}
            buttons={buttonGroupOptions}
            containerStyle={styles.buttonGroupContainer}
            selectedButtonStyle={styles.selectedButtonStyle}
            innerBorderStyle={styles.innerBorderStyle}
            buttonStyle={styles.buttonStyle} // Rounded edges
          />
          <Divider />

          {/* Single-Select List for Categories (All Categories) */}
          <SingleSelectListDropDown
            data={categories}
            selectedData={selectedCategoriesAll}
            onSelectCategory={(selected) => setSelectedCategoriesAll(selected)}
            title="Choose from all Categories"
          />
          <Divider />

          {/* Location Input */}
          <View style={styles.locationContainer}>
            <Text h4 style={styles.locationTitle}>Where to search:</Text>
            <Input
              placeholder="Use my current location"
              defaultValue="Use my current location"
              leftIcon={{ type: 'font-awesome', name: 'map-marker', color: '#86939e' }}
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

        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  locationContainer: {
    marginBottom: 0,
  },
  locationTitle: {
    fontSize: 10,
    color:'#266EF1',
    marginBottom: 8,
  },
  dateTitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 4,
  },
});

export default Filter;