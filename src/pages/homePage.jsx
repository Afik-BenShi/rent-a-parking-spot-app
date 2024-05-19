import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Header, Icon, Input, Text } from '@rneui/themed';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import BottomBar from '../components/bottomBar';
import { orderedRentalItems } from '../../assets/mockData'; // Import the mock data
import { COLORS } from '../../assets/theme'

const RentalScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);
  const [rentalItems, setRentalItems] = useState(rentalItems);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      // Use the ordered list on refresh
      setRentalItems(orderedRentalItems);
      setExpandedItem(null); // Close any expanded item on refresh
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleItemPress = (id) => {
    setExpandedItem((prevItem) => (prevItem === id ? null : id));
  };

  const renderRatingStars = (owner) => {
    // You can customize this function to return the appropriate rating for each owner
    // For now, it's a placeholder with a constant rating for all owners
    const rating = 4.5;
    
    return (
      <View style={styles.ratingContainer}>
        <FontAwesome5 name="star" color="#FFD700" size={14} solid />
        <Text style={styles.ratingText}>{`${owner}'s Rating: ${rating}`}</Text>
      </View>
    );
  };

  const renderRentalItem = ({ item }) => {
    const isExpanded = expandedItem === item.id;

    return (
      <Pressable onPress={() => handleItemPress(item.id)}>
        <View style={[styles.rentalItemContainer, isExpanded && styles.expandedItem]}>
          <View style={styles.nameInfo}>
            <Text style={styles.boldText}>{item.name}</Text>
            <Text style={styles.rentalItemDetails}>
              Available from {item.startDate}
            </Text>
          </View>
          <Text style={styles.rentalItemDetails}>${item.price} per day</Text>
          <Text style={styles.rentalItemDetails}>
            {item.distanceFromMe !== undefined ? `${item.distanceFromMe} km from me` : ''}
          </Text>

          {isExpanded && (
            <View style={styles.additionalDetails}>
              <Text style={styles.detailsTitle}>Item Details:</Text>
              <Text>{item.details}</Text>

              <View style={{ marginVertical: 10 }}></View>

              <Text style={styles.detailsTitle}>Available Rental Period:</Text>
              <Text>
                {item.startDate}
              </Text>

              {renderRatingStars(item.owner)}

              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  style={styles.navigateButton}
                  onPress={() => navigation.navigate('Map', { item })}
                >
                  <Icon name="location-pin" type="entypo" color="#777" />
                  <Text style={styles.buttonText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => console.log(`Chat with ${item.owner} pressed`)}
                >
                  <Icon name="chat" type="entypo" color="#777" />
                  <Text style={styles.buttonText}>Chat with {item.owner}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("productDetails", {})}>
                <Text style={styles.startButtonText}>Let's Rent</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Pressable onPress={() => console.log('Menu button pressed!')}>
            <FontAwesome name="bars" color="#fff" size={20} style={styles.menuIcon} />
          </Pressable>
        }
        centerComponent={
          <View style={styles.centerHeader}>
            <Text style={styles.headerText}>
              Rental
              <FontAwesome5 name="box-open" size={25} color="#fff" style={styles.logoIcon} />
              Wise
            </Text>
          </View>
        }
        rightComponent={
          <Pressable onPress={() => navigation.navigate('filters')}>
            <FontAwesome name="filter" color="#fff" size={25} style={styles.filterIcon} />
          </Pressable>
        }
        containerStyle={styles.headerContainer}
      />

      <View style={styles.searchContainer}>
        <Input
          placeholder="What would you like to rent?"
          leftIcon={<Icon name="search" size={23} color="black" />}
          containerStyle={styles.searchInputContainer}
          inputContainerStyle={styles.searchInputInnerContainer}
          placeholderTextColor="#bbb"
        />
      </View>

      <View style={styles.timePickerContainer}>
        {/* Add time picker components here */}
      </View>

      <FlatList
        data={rentalItems}
        renderItem={renderRentalItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <BottomBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: COLORS.btnBlue,
    justifyContent: 'space-around',
    height: 115,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 0,
  },
  centerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    marginRight: 5,
  },
  menuIcon: {
    marginTop: 0,
  },
  filterIcon: {
    marginTop: 0,
  },
  searchContainer: {
    backgroundColor: COLORS.btnBlue,
    padding: 10,
  },
  searchInputContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    height: 40,
  },
  searchInputInnerContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  timePickerContainer: {
    // Style time picker container here
  },
  rentalItemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
  },
  nameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  rentalItemDetails: {
    fontSize: 14,
    color: '#555',
  },
  expandedItem: {
    height: 347, // Adjusted height to accommodate the additional line
  },
  additionalDetails: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
  },
  detailsTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  navigateButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 2,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#333',
    textAlign: 'center',
    marginLeft: 5,
  },
  startButton: {
    backgroundColor: 'lightgreen',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#555',
  },
});

export default RentalScreen;
