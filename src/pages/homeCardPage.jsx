import React, { useState, useEffect, useCallback } from 'react';
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
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Import the mock data for home page:
// import { rentalItems } from '../../assets/mockData';

import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ThemeConsumer } from 'react-native-elements';
import config from '../backend/config'
import OopsNoProducts from '../components/oopsNoProducts';
import { Header } from '@rneui/themed';

const items = [
  {key:'1', label:'Outdoor equipment'},
  {key:'2', label:'Entertainment & Events'},
  {key:'3', label:'Home Improvement'},
]


const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;


export default function HomeCardPage({ navigation, }) {


  const [selectedCategory, setSelectedCategory] = useState(0);
  const [showSelectBtn, setShowSelectBtn] = useState(true);
  const [showSelectedCategory, setShowSelectedCategory] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [rentalItems, setRentalItems] = useState([]);
  const [filters, setFilters] = useState({
        "city": "",
        "endDate": "",
        "maxPrice": "",
        "selectedCategory": selectedCategory.toString(), // Set the selected category
        "startDate": ""
  });
  const [noContent, setNoContent] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategoryLabel = selectedCategory ? items[selectedCategory - 1].label : "All Products";


  console.log("filters:" , filters);




  const fetchProducts = async () => {
    try {
      console.log('fetchProducts in homeCard')
      console.log('fetchProducts filters', filters)

      const response = await axios.get(`http://${config.serverIp}:${config.port}/products`, { params: { filters } });
      setRentalItems(response.data);
      if (0 == response.data.length){
        console.log('No products found');
        setNoContent(true);
      }
    }
    catch (err) {
      console.log(JSON.stringify(err))
    }
  };


  useEffect(() => {
    setNoContent(false);
    setShowFilters(false);
    fetchProducts();
    
    var cnt = 0;
    Object.entries(filters).map(([key, value]) => {
          if (value && key != 'selectedCategory'){ cnt ++ } });
    if (cnt > 0){
      setShowFilters(true);
    }

  }, [filters]);



  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);

    fetchProducts();

  }, []);


  const sheet = React.useRef();
  const [value, setValue] = React.useState();

  const handleDonePress = () => {
    console.log("Selected category: ", selectedCategory);
    sheet.current.close();
    
    // Merge the existing filters with the selected category
    setFilters(prevFilters => ({
      ...prevFilters,
      'selectedCategory': selectedCategory.toString()
    }));
    
    
  }


  const setFiltersWithUpdatedData = (data) => {
    console.log('setFiltersWithData', data);
      
    Object.entries(data).forEach(([key, value]) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value
        }));
    });

    console.log('after update: ', filters);
    //fetchProducts();
  }

  const formatDate = (date) => {
    if (date instanceof Date) {
      // Format date as desired
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
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
        return 'Category';
      case 'city':
        return <Entypo color="#000" name="location-pin" size={18} />;
        //return 'City';
      default:
        // If no specific formatting is needed, return the original key
        return key;
    }
  }

  const initialFilters = () => {
    setFilters({
    "city": "",
    "endDate": "",
    "maxPrice": "",
    "selectedCategory": "0",
    "startDate": ""
    });
    setSelectedCategory(0);
    setValue(null);
  }

  return (
    <SafeAreaView style={styles.layout}>
      <Header
        leftComponent={
          {/*<Pressable onPress={() => console.log('Menu button pressed!')}>
            <FontAwesome name="bars" color={COLORS.cartTitle} size={20} style={styles.menuIcon} />
        </Pressable>*/}
        }
        centerComponent={
          <View style={styles.centerHeader}>
            <Text style={styles.headerText}>
              Rental
              <FontAwesome5 name="box-open" size={25} color={COLORS.cartTitle} style={styles.logoIcon} />
              Wise
            </Text>
          </View>
        }
        rightComponent={
          {/*
          <View style={{ flexDirection: 'row',}}>
            <Pressable onPress={() => navigation.navigate('filters', { onReturn: (data) => { console.log('return filter'); setFiltersWithUpdatedData(data) } })}>
              <FontAwesome5 name="filter" color={COLORS.btnBlue} size={25}  />
            </Pressable>

            <Pressable onPress={() => {
                setShowFilters(false);
                initialFilters();
                 }}>
              <MaterialCommunityIcons name="filter-off" color={COLORS.btnBlue} size={35}/>
            </Pressable>
                </View>
              */}
        }
        containerStyle={styles.headerContainer}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false} // Set refreshing state here
            onRefresh={onRefresh} // Pass onRefresh function here
          />
        }
      >

          {/************** start select category *********************/}
          <View style={{justifyContent:'center'}}>

          { showSelectBtn && 
              ( 
              <View style={{ 
                      backgroundColor: COLORS.cardBackground, 
                      justifyContent: 'flex-start', 
                      flexDirection: 'row',
                      flex:1 }}>
                  
                  <View style={{backgroundColor: COLORS.cardBackground, 
                      flexDirection: 'row',}}>
            
                  <TouchableOpacity
                  onPress={() => sheet.current.open()}
                  style={[styles.picker, { paddingVertical: 20 }]}>

                  <View style={styles.pickerAction}>
                      <Text style={styles.pickerActionText}>Change Category   </Text>

                      <FeatherIcon
                      color="#4C6CFD"
                      name="chevron-down"
                      size={18}
                      marginRight={10} />
                  </View>
                  </TouchableOpacity>

                  
                      <View style={styles.iconFrame}>
                      <Pressable onPress={() => navigation.navigate('filters', { onReturn: (data) => { console.log('return filter'); setFiltersWithUpdatedData(data) } , filters })}>
                      <MaterialCommunityIcons name="filter" color={COLORS.btnBlue} size={25} style={styles.filterIcon}/>
                      </Pressable>
                      </View>

                      <View style={styles.iconFrame}>
                      <Pressable onPress={() => {
                          setShowFilters(false);
                          initialFilters(); }}>
                        <MaterialCommunityIcons name="filter-off" color={COLORS.btnBlue} size={25} style={styles.filterIcon}/>
                      </Pressable>
                      </View>
                    </View>
                  
              </View>
              )}

          {showSelectedCategory && 
              (<View style={{backgroundColor: COLORS.cardBackground, flexDirection: 'row', alignContent: 'stretch'}}>
                  <Text style={styles.title}>{selectedCategoryLabel}</Text>
              </View>)}
          </View>

          {/************** end select category *********************/}

          {/************* start show filters ****************************/}
          {showFilters &&
         
            
           ( <View style={styles.list}>
            <View style={styles.listHeader}>

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}
              style={styles.listAction}>
              {/*<Text style={styles.listActionText}>View All</Text>

              <FeatherIcon
                color="#706F7B"
                name="chevron-right"
            size={16} />*/}
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.listContent}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {Object.entries(filters).map(([key, value]) => (
              
              (value != "" && key !== 'selectedCategory') && (
                <View key={key}>
                  <View style={[styles.card, { backgroundColor: COLORS.grey2 }]}>
                    {/* Render key and value */}
                    <Text style={styles.cardLabel}>
                    <Text style={styles.keyText}> {formatKeyBeforeShow(key)}</Text> 
                     {  } {key === 'startDate' || key === 'endDate'
                    ? formatDate(value) // Format date if key is 'startDate' or 'endDate'
                    : (key === 'selectedCategory'
                    ? selectedCategoryLabel // Render selectedCategoryLabel if key is 'selectedCategory'
                    : value) }
                    </Text>
                  </View>
                </View>
              )
            ))}
          </ScrollView>
        </View>)   }
        {/************* end show filters ****************************/}


        <View style={styles.container}>
          <CardList
            items={rentalItems}
            title=""
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
              />}
            onItemPressed={(details) => navigation.navigate("productDetails", { details })}
          />
          
          {noContent && <OopsNoProducts />}
        
        </View>

      </ScrollView>
      

      


      {/*****************************************/}
      <RBSheet
        customStyles={{ container: styles.sheet }}
        height={380}
        openDuration={250}
        ref={sheet}>

        <View style={styles.sheetHeader}>
          <View style={{ width: 60 }} />

          <Text style={styles.sheetHeaderTitle}>Select Category</Text>

          <TouchableOpacity
            onPress={handleDonePress}>
            <View style={{ width: 60, alignItems: 'flex-end' }}>
              <Text style={styles.done}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>

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
          <TouchableOpacity
            style={styles.radio}
            onPress={() => {
              setValue(null);
              setSelectedCategory(0);
            }}>
            <FeatherIcon name="trash" color="#ff6a55" size={20} />
            <Text style={[styles.radioLabel, { color: '#ff6a55' }]}>
              Remove selection
            </Text>
          </TouchableOpacity>
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
    fontSize: 25,
    fontWeight: '800',
    color: '#173153',
    marginLeft: 14,
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
    justifyContent: 'flex-start',
    height: 110,
    marginTop: -30,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lightgrey,
  },
  headerText: {
    color: COLORS.cartTitle,
    fontWeight: '700',
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
    paddingHorizontal:13,

  },

  //select category
  picker: {
    marginTop: 12,
    paddingVertical: 14,
    paddingHorizontal:15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f5f5f5',
    marginLeft: 20,
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
  pickerDates: {
    marginLeft: 12,
  },
  pickerDatesText: {
    fontSize: 15,
    fontWeight: '500',
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
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 0,
    padding: 24,
    backgroundColor: 'transparent',
  },
  placeholderInset: {
    borderWidth: 4,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 9,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
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
    marginBottom: 24,
    backgroundColor: COLORS.cardBackground,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  listTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    color: '#323142',
  },
  listAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listActionText: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#706f7b',
    marginRight: 2,
    alignItems: 'flex-end',
  },
  listContent: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  /** Card */
  card: {
    width: 120,
    height:35,
    paddingVertical: 2,
    //paddingHorizontal: 1,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 3,
    elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOpacity: 0.2, // iOS shadow
      shadowRadius: 2, // iOS shadow
      shadowOffset: {
        width: 0.5,
        height: 1,
      },
  },
  cardLabel: {
    textAlign: 'left', 
    textAlignVertical: 'center', 
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 15,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  keyText: {
    fontSize: 14,    
    fontWeight: '400', 
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',     
  },
  btnGroupHomePage:{
    backgroundColor: COLORS.cardBackground, 
    justifyContent: 'flex-start',
    flexDirection: 'column' 
  },
  iconFrame: {
    // borderColor: COLORS.black, 
    // backgroundColor: '#fff',
    // borderWidth: 2, 
    // borderRadius: 10, 
    // marginHorizontal: 5, 
    // //padding: 5, 
    
      marginTop: 13,
      paddingHorizontal:5,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderWidth: 1,
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


});