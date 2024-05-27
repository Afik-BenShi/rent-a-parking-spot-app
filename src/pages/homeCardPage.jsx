import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';

import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  RefreshControl,
  Animated,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';


import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import RBSheet from 'react-native-raw-bottom-sheet';
import {serverPath} from '../../backend.config.json';
import OopsNoProducts from '../components/oopsNoProducts';
import { Header } from '@rneui/themed';
import { getAuth } from 'firebase/auth';
import { filter, set } from 'lodash';
import { useNavigation } from '@react-navigation/native';


const items = [
  { key: '0', label: 'Any' },
  { key: '1', label: 'Outdoor Equipment' },
  { key: '2', label: 'Entertainment & Events' },
  { key: '3', label: 'Home Improvement' },
]

const moreOptions = [
  { key: '0', label: 'All Categories' },

]

const sortOptions = [
  { label: 'Price: Low to High', value: 'lowToHigh' },
  { label: 'Price: High to Low', value: 'highToLow' },
  { label: 'Time: Earlier Start Time', value: 'earlyStartTime' },
  { label: 'Distance: Close to Far', value: 'closest' },
];


const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;

export default function HomeCardPage({ navigation, route }) {


  // category is a string between 0-3. 0 -> View All
  const { category } = route.params;
  console.log("send cat: ", category);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [userId, setUserId] = useState(route.params.userId);


  const [refreshing, setRefreshing] = useState(false);
  const [rentalItems, setRentalItems] = useState([]);
  const [masterData, setMasterData] = useState([]);
  const [filters, setFilters] = useState({
    "city": "",
    "endDate": "",
    "maxPrice": "",
    "selectedCategory": selectedCategory.toString(), // Set the selected category
    "startDate": ""
  });
  const [selectedSort, setSelectedSort] = useState('lowToHigh');
  const [noContent, setNoContent] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategoryLabel = selectedCategory != "0" ? items[selectedCategory].label : "All Products";

  const [searchTerm, setSearchTerm] = useState('');

  const [locationsList, setLocationsList] = useState(["All Locations"]);
  const [activeFilters, setActiveFilters] = useState(false);
  const [value, setValue] = useState(null);


  const fetchProducts = async (filters, selectedSort) => {
    try {
      console.log('fetchProducts in homeCard')
      console.log('fetchProducts filters', filters)
      const token = getAuth().currentUser?.getIdToken()
      const response = await axios.get(serverPath + `/products`, {
        headers: { Authorization: await token },
        params: { filters, sort: selectedSort, userId }
      });
      setRentalItems(response.data);
      setMasterData(response.data);
      updateLocaionsList(response.data);

      console.log('response.data', response.data);
      if (0 == response.data.length) {
        console.log('No products found');
        setNoContent(true);
      }
    }
    catch (err) {
      console.log(JSON.stringify(err))
    }
  };


  const updateLocaionsList = (data) => {
    const result = locationsList;
    for (let i = 0; i < data.length; i++) {
      if (!result.includes(data[i].city)) {
        result.push(data[i].city);
      }
    }
    // sort
    result.sort();
    setLocationsList(result);
  };

  useEffect(() => {
    setNoContent(false);
    setShowFilters(false);
    fetchProducts(filters, selectedSort);
    useFilters(filters);

    var cnt = 0;
    Object.entries(filters).map(([key, value]) => {
      if (value && key !== 'selectedCategory') { cnt++ }
    });
    if (cnt > 0) {
      setShowFilters(true);
    }

  }, [filters, selectedSort]);

  useEffect(() => {
    fetchProducts(filters, selectedSort);
  }, []);



  const onRefresh = useCallback((filters, selectedSort) => {
    setRefreshing(true);
    setSearchTerm("");

    try {
      //console.log('onRefresh filters', filters);

      fetchProducts(filters, selectedSort);

    } catch (err) {
      console.log(JSON.stringify(err))
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

  }, []);


  const sheet = React.useRef();
  function handleDonePress(category) {
    console.log("Selected category: ", selectedCategory);
    //sheet.current.close();

    // Merge the existing filters with the selected category
    setFilters(prevFilters => ({
      ...prevFilters,
      'selectedCategory': selectedCategory.toString()
    }));

  }

  const onCancleSearchPress = () => {
    setSearchTerm("");
    setRentalItems(masterData);
    setNoContent(false);
  }


  const setFiltersWithUpdatedData = (data) => {
    console.log('setFiltersWithData', data);

    // overwrite the existing filters with the updated data
    const updatedFilters = { ...filters, ...data };
    setFilters(updatedFilters);

    console.log('after update: ', filters);
    setSelectedCategory(data.selectedCategory);

  }

  const formatDate = (date) => {
    if (date instanceof Date) {
      // Format date as desired
      var formatStart = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      if (filters.endDate) {
        var formatEnd = filters.endDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        return `${formatStart} - ${formatEnd}`;
      }
    } else {
      return date; // Return as is if not a Date object
    }
  };

  const formatKeyBeforeShow = (key) => {
    switch (key) {
      case 'startDate':
        return <FeatherIcon color="#000" name="calendar" size={18} />;
      //return 'Start Date';

      case 'endDate':
        return <FeatherIcon color="#000" name="calendar" size={18} />;
      //return 'End Date';

      case 'maxPrice':
        return <Entypo color="#000" name="price-tag" size={18} />;
      //return 'Max Price';
      case 'selectedCategory':
        if (selectedCategory === "0") {
          return <Entypo color="#000" name="list" size={20} />;
          //return 'All Categories';
        } else if (selectedCategory === "1") {
          return <MaterialCommunityIcons color="#000" name="hiking" size={20} />;
          //return 'Outdoor equipment';
        } else if (selectedCategory === "2") {
          return <MaterialIcons color="#000" name="event" size={20} />;
          //return 'Entertainment & Events';
        } else if (selectedCategory === "3") {
          return <MaterialCommunityIcons color="#000" name="home-city-outline" size={20} />;
          //return 'Home Improvement';
        }
        break;
      case 'city':
        return <Ionicons color="#000" name="location-outline" size={16} />;
      //return 'City';
      default:
        // If no specific formatting is needed, return the original key
        return key;
    }
  }

  const initialFilters = (resetCategory = true) => {
    setFilters({
      "city": "",
      "endDate": "",
      "maxPrice": "",
      "selectedCategory": resetCategory ? "0" : filters.selectedCategory,
      "startDate": ""
    });
    if (resetCategory) {
      setSelectedCategory("0");
    }
    setSearchTerm("");
    setActiveFilters(false); // hide filters row
  }

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemDataTitle = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const itemDataDescription = item.description ? item.description.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemDataTitle.indexOf(textData) > -1 || itemDataDescription.indexOf(textData) > -1;
      });
      if (newData.length == 0) {
        setNoContent(true);
        setSearchTerm(text);
        setRentalItems([]);
      }
      else {
        setNoContent(false);
        setRentalItems(newData);
        setSearchTerm(text);
      }
    }
    else {
      setRentalItems(masterData)
      setSearchTerm(text);
    }
  };


  const scrollRef = React.useRef();

  const handleScrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: 0,
        animated: true,
      });
      console.log("Scrolled to top.");
    } else {
      console.log("Scroll reference is null. Unable to scroll to top.");
    }
  };


  function useFilters(filters) {
    const emptyFilters = {
      "city": "",
      "endDate": "",
      "maxPrice": "",
      "startDate": "",
    }
    const hasFilters = Object.keys(filters).some(key => filters[key] !== emptyFilters[key]);
    console.log('hasFilters', hasFilters);
    setActiveFilters(hasFilters);

    return hasFilters;
  }

  const handleMoreOptionsPress = (index) => {
    console.log('Selected oprtion: ', index);
    // handle the selected option
    if (index === 0) {
      navigation.navigate('category');
    }
  }


  return (
    <SafeAreaView style={styles.layout}>
      <View>

        <Header
          leftComponent={
            <View style={styles.backBtn}>
              {/* <View style={styles.square} /> */}
              <TouchableOpacity style={styles.buttonContainer} onPress={navigation.goBack}>
                <Feather style={styles.headerComponent}
                  name="chevron-left"
                  type="material"
                  color={COLORS.black}
                  size={26}
                />

              </TouchableOpacity>
            </View>

          }
          centerComponent={
            <View style={styles.centerHeader}>
              <Text style={styles.headerText}>
                Rental{' '}
                <FontAwesome5 name="box-open" size={25} color={'#BA9166'} style={styles.logoIcon} />
                {' '}Wise
              </Text>
            </View>
          }
          rightComponent={
            <View style={styles.backBtn}>
              {/* <View style={styles.square} /> */}
              <TouchableOpacity style={styles.buttonContainer}
                //onPress={() => navigation.navigate('filters', { locationsList, items , onReturn: (data) => { console.log('return filter'); setFiltersWithUpdatedData(data) } , filters })}
                onPress={() => sheet.current.open()}
              >
                <Feather name="more-horizontal" color={COLORS.black} size={24} style={styles.headerComponent} />

              </TouchableOpacity>
            </View>
          }
          containerStyle={styles.headerContainer}
        />
      </View>

      <ScrollView
        ref={scrollRef}
        refreshControl={
          <RefreshControl
            refreshing={refreshing} // Set refreshing state here
            onRefresh={() => { if (!searchTerm) onRefresh(filters, selectedSort) }} // Pass onRefresh function here 
          />}
      >

        <View style={{ borderBottomWidth: 0, padding: 10 }} >
          <View style={styles.searchSectionWrapper}>
            <View style={styles.searchBarNew}>
              <Ionicons
                name="search"
                size={18}
                style={{ marginRight: 5 }}
                color={COLORS.black} />
              <TextInput
                placeholder="Search here...                 "
                placeholderTextColor={COLORS.grey3}
                onChangeText={(text) => searchFilter(text)}
                value={searchTerm}
              />
            </View>

            {searchTerm &&
              (<TouchableOpacity onPress={onCancleSearchPress} style={{ marginRight: -15, zIndex: 999 }}>
                <MaterialCommunityIcons name="window-close" size={15} color={COLORS.black} style={styles.timesIcon} />
              </TouchableOpacity>)}

            <TouchableOpacity style={styles.filterBtn}
              onPress={() => navigation.navigate('filters', { locationsList, items, onReturn: (data) => { console.log('return filter'); setFiltersWithUpdatedData(data) }, filters })}>
              <Ionicons name="options" size={28} color={'#fff'} />
            </TouchableOpacity>

          </View>
          <RNPickerSelect
            onValueChange={(value) => setSelectedSort(value)}
            items={sortOptions}
            style={styles.sortBtn}
            value={selectedSort}
            placeholder={{ label: "Select a Sort Option", value: null }}
            useNativeAndroidPickerStyle={false}
          />
        </View>



        {/* <View style={styles.btnGroupHomePage}>
          <Input
            style={styles.searchBar}
            value={searchTerm}
            placeholder="Search Here..."
            placeholderTextColor={COLORS.grey3}
            underlineColorAndroid='transparent'
            onChangeText={(text) => searchFilter(text)}
            
            inputStyle={styles.inputControl}
            inputContainerStyle={{ borderBottomWidth: 0, padding:10 }} 
            leftIcon = {<FontAwesome name="search" size={18} color={COLORS.black} style={styles.logoIcon} />}
            rightIcon = {<MaterialCommunityIcons name="window-close" size={17} color={COLORS.cartTitle} style={styles.timesIcon} 
                onPress={onCancleSearchPress}/>}
          />
        </View> */}


        {/************** start filters buttons *********************/}
        <View style={{ justifyContent: 'center', backgroundColor: COLORS.cardBackground }}>
          {/* <View style={{ 
                      backgroundColor: COLORS.cardBackground, 
                      justifyContent: 'space-between', 
                      flexDirection: 'row',
                      marginHorizontal: 20}}> */}



          {/* <TouchableOpacity
            onPress={() => sheet.current.open()}
            style={[styles.picker, { paddingVertical: 10 }]}>

                  <View style={styles.pickerAction}>
                      <Text style={styles.pickerActionText}> Category  </Text>

                      <FeatherIcon
                      color="#4C6CFD"
                      name="chevron-down"
                      size={18}
                      marginRight={10} />
                  </View>
                  </TouchableOpacity>  */}


          {/* <Pressable style={[styles.picker, { paddingVertical: 10 }]}
                    //style={{flexDirection: 'row'}} 
                      onPress={() => navigation.navigate('filters', { locationsList, items , onReturn: (data) => { console.log('return filter'); setFiltersWithUpdatedData(data) } , filters })}>
                      
                      <Text style={styles.pickerActionText}>
                      <MaterialCommunityIcons name="filter-outline" size={18} style={styles.filterIcon}/>
                      Filters  </Text>
                    </Pressable> */}


          {/* </View> */}


          {/* Selected category lable */}
          < Animated.View
            style={[
              { backgroundColor: COLORS.cardBackground, flexDirection: 'row', alignContent: 'stretch' }
            ]}
          >
            <Text style={styles.title}>{selectedCategoryLabel}</Text>
          </Animated.View>
        </View>

        {/************** end filters buttons *********************/}

        {/************* start show filters ****************************/}
        {showFilters &&

          (<View style={styles.list}>
            <View style={styles.listHeader}>

            </View>

            <ScrollView
              contentContainerStyle={styles.listContent}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {Object.entries(filters).map(([key, value]) => (

                (value && key !== 'selectedCategory' && key !== 'endDate') && (
                  <View key={key}>
                    <View style={[styles.filterBox, { backgroundColor: COLORS.cardBackground }]}>
                      <Text style={styles.cardLabel}>
                        {formatKeyBeforeShow(key)}
                        {key === 'startDate' ? formatDate(value) : value}
                      </Text>
                      <MaterialCommunityIcons
                        name="close"
                        color={COLORS.black}
                        size={14}
                        style={styles.closeIcon}
                        onPress={() => {
                          if (key === 'startDate') {
                            setFilters({ ...filters, startDate: "", endDate: "" });
                          }
                          else {
                            setFilters({ ...filters, [key]: "" });
                          }
                          useFilters(filters);
                        }}
                      />

                    </View>
                  </View>
                )
              ))}
            </ScrollView>

            {activeFilters && (<Pressable style={styles.removeFilterBtn} onPress={() => {
              setShowFilters(false);
              initialFilters(false);
            }}>
              <Text style={{ textDecorationLine: 'underline' }}> Clear </Text>
            </Pressable>)}
          </View>)}

        {/************* end show filters ****************************/}


        <View style={styles.container}>
          {!noContent &&
            (<CardList
              items={rentalItems}
              title=""
              onItemPressed={(details) => navigation.navigate("productDetails", { details })}
            />)}

          {noContent && <OopsNoProducts />}

        </View>

      </ScrollView>



      <View style={styles.buttonContainer}>
        <View style={styles.circle} />

        <TouchableOpacity style={styles.buttonContainer} onPress={handleScrollToTop}>
          <Feather style={styles.scrollTopButton}
            name="chevron-up"
            type="material"
            color={COLORS.black}
            size={26}
          />
        </TouchableOpacity>
      </View>





      {/*****************************************/}
      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={380}
        openDuration={250}
        ref={sheet}>

        <View style={styles.sheetHeader}>
          <View style={{ width: 60 }} />

          {/* <Text style={styles.sheetHeaderTitle}>Select Category</Text> */}

          <TouchableOpacity
            onPress={() => sheet.current.close()}>
            <View style={{ width: 60, alignItems: 'flex-end' }}>
              <Text style={styles.done}>Close</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sheetBody}>
          {moreOptions.map(({ key, label }, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setValue(index);
                  handleMoreOptionsPress(index);

                }}>
                <View style={styles.radio}>

                  <Text style={styles.radioLabel}>{label}</Text>


                </View>
              </TouchableOpacity>
            );
          })}
          {/* <TouchableOpacity
            style={styles.radio}
            onPress={() => {
              setValue(null);
              setSelectedCategory("0");
            }}>
            <FeatherIcon name="trash" color="#ff6a55" size={20} />
            <Text style={[styles.radioLabel, { color: '#ff6a55' }]}>
              Remove selection
            </Text>
          </TouchableOpacity> */}
        </View>
      </RBSheet>
      {/*****************************************/}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#173153',
    marginLeft: 25,
    marginTop: 10,
  },
  sec_title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#5f697d',
    marginLeft: 14,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: COLORS.cardBackground,
  },
  // header
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
  headerText: {
    color: COLORS.cartTitle,
    fontWeight: '800',
    fontSize: 24,
    //fontFamily: 'Roboto',
    textAlign: 'center',
    marginTop: 10,
  },
  centerHeader: {
    marginTop: -5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,

  },
  logoIcon: {
    marginRight: 5,

  },
  menuIcon: {
    marginTop: 0,
  },
  filterIcon: {
    paddingHorizontal: 4,
    color: '#4c6cfd',
    //color: COLORS.cartTitle,

  },

  //select category
  picker: {
    marginTop: -10,  //12
    //paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    marginLeft: 8,
    marginRight: 5,
    marginBottom: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  // scroll to top button
  scrollTopButton: {
    position: 'absolute',
    bottom: -10,
    right: 12,
  },
  headerComponent: {
    position: 'absolute',
    bottom: -25,
    right: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999, // Ensure it's above other content
  },
  circle: {
    position: 'absolute',
    backgroundColor: COLORS.greyInSearchBar,
    borderRadius: 20,
    width: 40,
    height: 40,
    bottom: 5,
    right: 25,
    zIndex: -1, // Ensure it's behind the button
    borderWidth: 1,
    borderColor: '#f5f5f5',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  pickerAction: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerActionText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    color: '#4c6cfd',
  },
  /** RBsheet */
  done: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6a55',
  },
  /** Sheet */
  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  sheetHeaderTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  sheetBody: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  /** Radio */
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
  /** List */
  list: {
    backgroundColor: COLORS.cardBackground,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  filterBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10, // Margin between text and cross icon
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderColor: '#f5f5f5',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.2, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },

  },
  card: {
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'grey',
  },
  cardLabel: {
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
    alignSelf: 'flex-start', // Allow the card to expand based on text length
    paddingHorizontal: 10, // Add padding to ensure text doesn't touch the edges
  },


  btnGroupHomePage: {
    paddingTop: 0,
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'flex-start',
    flexDirection: 'column',

  },
  iconFrame: {
    height: 40,
    width: 88,
    marginTop: -5,
    paddingHorizontal: 5,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#f5f5f5',
    margin: 5,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  searchBar: {
    height: 40,
    //backgroundColor: '#f3eff6',   
    backgroundColor: COLORS.greyInSearchBar,
    paddingHorizontal: 25,
    borderRadius: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputControl: {
    height: 44,
    backgroundColor: COLORS.cardBackground,   // grey background color 
    paddingHorizontal: 25,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  timesIcon: {
    marginLeft: -35,
    marginTop: 17,
  },
  cardCity: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  removeFilterBtn: {
    backgroundColor: COLORS.cardBackground,
    justifyContent: 'left',
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    marginLeft: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 25,
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

  searchSectionWrapper: {
    flexDirection: 'row',
    marginVertival: 20,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  searchBarNew: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    paddingHorizontal: 25,
    marginRight: 10,
  },
  filterBtn: {
    backgroundColor: COLORS.orangeLikeStars,
    padding: 12,
    borderRadius: 10,
    marginLeft: 10,
  },
  sortBtn: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightPurple,
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
  }
});