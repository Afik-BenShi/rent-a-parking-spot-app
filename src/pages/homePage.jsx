import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { Header, Icon, Input, Slider, Text } from 'react-native-elements';
import DesignBottomBar from '../components/designBottomBar'

import {
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../assets/theme';


const telAvivStreetNames = [
  'Dizengoff',
  'Ben Yehuda',
  'Rothschild',
  'Allenby',
  'King George',
  'Ibn Gabirol',
  'Nordau',
  'Sokolov',
  'Yefet',
  'HaYarkon',
  'Frishman',
  'Bugrashov',
  'Bialik',
  'Trumpeldor',
  'Shenkin',
  'Herzl',
  'Montefiore',
  'Shlomo Hamelech',
  'Nahalat Binyamin',
  'Hayarkon',
  'Shaul Hamelech',
  'Nahmani',
  'Nachalat Yitzhak',
  'Shabazi',
  'Allenby',
  'Shenkar',
  'Masaryk',
  'Nahalat Itzhak',
  'Levontin',
];

const generateFakeParkingSpots = () => {
  const spots = [];
  for (let i = 1; i <= 30; i++) {
    const startHour = Math.floor(Math.random() * 24);
    const endHour = (startHour + Math.floor(Math.random() * 5) + 1) % 24; // Ensure end time is later than start time

    spots.push({
      id: i,
      street: telAvivStreetNames[i - 1],
      number: i,
      price: Math.floor(Math.random() * 10) + 1,
      distance: Math.floor(Math.random() * 10) + 1,
      availableUntil: `${Math.floor(Math.random() * 24)
        .toString()
        .padStart(2, '0')}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      details: `This spot is located on ${telAvivStreetNames[i - 1]}`,
      owner: `Owner ${i}`,
      startTime: `${startHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`,
      endTime: `${endHour.toString().padStart(2, '0')}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, '0')}`,
    });
  }
  return spots;
};

const ParkingScreen = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [parkingSpots, setParkingSpots] = useState(generateFakeParkingSpots());
  const [expandedSpot, setExpandedSpot] = useState(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setParkingSpots(generateFakeParkingSpots());
      setExpandedSpot(null); // Close any expanded spot on refresh
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleSpotPress = (id) => {
    setExpandedSpot((prevSpot) => (prevSpot === id ? null : id));
  };

  const renderParkingSpot = ({ item }) => {
    const isExpanded = expandedSpot === item.id;

    return (
      <Pressable onPress={() => handleSpotPress(item.id)}>
        <View style={[styles.parkingSpotContainer, isExpanded && styles.expandedSpot]}>
          <View style={styles.addressInfo}>
            <Text style={styles.boldText}>
              {item.street} {item.number}
            </Text>
            <Text style={styles.parkingSpotDetails}>
              Available until {item.availableUntil}
            </Text>
          </View>
          <Text style={styles.parkingSpotDetails}>${item.price} per hr</Text>
          <Text style={styles.parkingSpotDetails}>{item.distance} km away from me</Text>

          {isExpanded && (
            <View style={styles.additionalDetails}>
              <Text style={styles.detailsTitle}>Spot Details:</Text>
              <Text>{item.details}</Text>

              <View style={{ marginVertical: 10 }}></View>

              <Text style={styles.detailsTitle}>Available Parking Time:</Text>
              <Text>
                {item.startTime} - {item.endTime}
              </Text>

              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.navigateButton} onPress={() => console.log('Navigate pressed')}>
                  <Icon name="map-marker" type="font-awesome" color="#777" />
                  <Text style={styles.buttonText}>Navigate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => console.log(`Chat with ${item.owner} pressed`)}
                >
                  <Icon name="comment" type="font-awesome" color="#777" />
                  <Text style={styles.buttonText}>Chat with {item.owner}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate("parkingDetails", {})}>
                <Text style={styles.startButtonText}>Let's Start</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
      
      <View style={styles.top}>
      <SafeAreaView>
        <View style={styles.header}>
          
          <TouchableOpacity
            onPress={() => console.log('Menu button pressed!')}>

            <FeatherIcon name="menu" size={26} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>SmartPark</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Image
              style={styles.headerImage}
              source={{
                uri: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
              }}
            />
          </TouchableOpacity>
        </View>
        </SafeAreaView>
      </View>
      

      {/* Finish header */}
    
    
    
    
    
    <View style={styles.container}>
    {/*
      <Header
        leftComponent={
          <View style={styles.leftHeader}>
            <Pressable onPress={() => console.log('Menu button pressed!')}>
              <Icon name="menu" color="#fff" iconStyle={styles.menuIcon} />
            </Pressable>
            <Text style={styles.headerText}>SmartPark</Text>
          </View>
        }
        containerStyle={styles.headerContainer}

      />
      */}

      

      {/******/}
      <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search street here"
            placeholderTextColor="#05141c"
            style={styles.input} />

          <View style={styles.inputIcon}>
            <FeatherIcon
              color="#05141c"
              name="search"
              size={16} 
              marginLeft={20}
              marginTop={20}/>
          </View>
        </View>

      {/******/}

      {/*<View style={styles.searchContainer}>
        <Input
          placeholder="Where would you like to park?"
          leftIcon={<Icon name="search" size={23} color="black" />}
          containerStyle={styles.searchInputContainer}
          inputContainerStyle={styles.searchInputInnerContainer}
          placeholderTextColor="#bbb"
        />
      </View>
      */}

      <View style={styles.timePickerContainer}>
        {/* Add your time picker components here */}
      </View>

      <FlatList
        data={parkingSpots}
        renderItem={renderParkingSpot}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      <DesignBottomBar navigation={navigation}/>
    </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#007BFF',
    justifyContent: 'space-around',
    height: 115,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginLeft: 10,
    marginRight: 0,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'Roboto',
    //width: '100%',
    textAlign: 'center',
    borderTopWidth: 40,
    //marginLeft: 0,
  },
  menuIcon: {
    borderRadius: 10,
    borderTopWidth: 72,
    marginRight: 10,
  },
  searchContainer: {
    backgroundColor: COLORS.btnBlue,
    padding: 10,
    height:80,
    justifyContent:'center',
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
  parkingSpotContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  boldText: {
    fontWeight: 'bold',
  },
  addressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  parkingSpotDetails: {
    fontSize: 14,
    color: '#555',
  },
  expandedSpot: {
    height: 307,
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
    backgroundColor: COLORS.searchGreen,
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
  /** Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 9999,
  },
  /** Top */
  top: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    backgroundColor: COLORS.btnBlue,
  },
  topContent: {
    paddingHorizontal: 24,
  },
  /** Search */
  searchInput: {
    height: 50,
    backgroundColor: COLORS.lightWhite,
    paddingHorizontal: 16,
    color: '#1a2525',
    fontSize: 18,
    borderRadius: 9999,
  },
  
  /* search input */
  inputIcon: {
    position: 'absolute',
    width: 44,
    height: 44,
    top: 0,
    left: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    paddingLeft: 44,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  }
});

export default ParkingScreen;