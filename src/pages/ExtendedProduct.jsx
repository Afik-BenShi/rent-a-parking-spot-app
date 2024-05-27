import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import Swiper from 'react-native-swiper';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../assets/theme';
import { parseItem } from "./ownerProductPage";
import { dateRangeFormat } from "../utils/dateTime";
import ExpandableImage from "../components/ExpandableImage";
import { ContactButtons } from "../components/contactButtons";
import GoogleMaps from "../components/GoogleMaps";
import {serverPath} from '../../backend.config.json';
import config from '../config';
import { disabledDatesForProduct } from "../utils/dateTime";

import CalendarComponent from '../components/calendar';
import { getAuth } from 'firebase/auth';

const sections = [
  { name: 'Information' },
  { name: 'Availability' },
  // { name: 'Reviews' }
];

export default function ExtendedProduct({ route, navigation }) {

    const details = parseItem(route.params);

    //console.log("details in extended");
    //console.log(details)

    const productImage = details.image
        ? { uri: details.image }
        // @ts-ignore
        : require("../../assets/parking-details-images/placeholder.png");

    const { 
        id,  // product Id
        title, 
        description, 
        owner,   // object - {id, name, phone}
        availability,
        city, 
        price,
        location,
        orderDates,
        mainCategoryId,
        image,
        } = details;

    //const { rate, reviews } = { rate: 4, reviews: 18 };   // TODO: CHANGE TO ACTUAL VALUES

    const { startDay, startYear, endDay, endYear } = dateRangeFormat(
        orderDates.startDate,
        orderDates.endDate
    ); 

    const [value, setValue] = useState(0);

    const [disabledDates, setDisabledDates] = useState([]);
    const fetchAvailabilityByProductId = async () => {
        try {
            const token = await getAuth().currentUser?.getIdToken()
            const response = await axios.get(serverPath + `/orders/productAvailability`, { 
              headers: { Authorization: token },
              params: { id } });
            console.log(response.data);
            
            const result = disabledDatesForProduct(response.data.response);
            console.log("dis ---", result);
            setDisabledDates(result);
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    };


    useEffect(() => {
      fetchAvailabilityByProductId();
      console.log("fetch ");
      
    }, []);

  
    console.log();
    return (
    <View style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
      <View style={styles.actions}>
        <SafeAreaView>
          <View style={styles.actionWrapper}>
            
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ marginRight: 'auto' }}>
              <View style={styles.action}>
                <MaterialCommunityIcons
                  color="#242329"
                  name="window-close"
                  size={20} />
              </View>
            </TouchableOpacity>

            

            {/* <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.action}>
                <FeatherIcon
                  color="#242329"
                  name="heart"
                  size={18} />
              </View>
            </TouchableOpacity> */}
          </View>

          <View style={styles.tabs}>
            {sections.map(({ name }, index) => {
              const isActive = index === value;

              return (
                <TouchableOpacity
                  key={name}
                  onPress={() => {
                    setValue(index);
                  }}
                  style={styles.tabsItemWrapper}>
                  <View style={styles.tabsItem}>
                    <Text
                      style={[
                        styles.tabsItemText,
                        isActive && { color: '#F26463' },
                      ]}>
                      {name}
                    </Text>
                  </View>

                  {isActive && <View style={styles.tabsItemLine} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </SafeAreaView>
      </View>

      { value == 0 &&
      (<ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        <ExpandableImage source={productImage} initialHeight={200} />
        <View style={styles.photos}>
            {/* <Image
            alt="description"
            source={productImage} // Specify the source of your image
            style={styles.photosImg}
            /> */}
            
            
          {/* <Swiper
            renderPagination={(index, total) => (
              <View style={styles.photosPagination}>
                <Text style={styles.photosPaginationText}>
                  {index + 1} / {total}
                </Text>
              </View>
            )}>
            {IMAGES.map((src, index) => (
              <View key={src} style={{ flex: 1 }}>
                <Image
                  alt=""
                  source={{ uri: src }}
                  style={styles.photosImg} />
              </View>
            ))}
          </Swiper> */}
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>

          <View style={styles.headerRow}>
            <View style={styles.headerLocation}>
              <FeatherIcon
                color="#7B7C7E"
                name="map-pin"
                size={14} />

              <Text style={styles.headerLocationText}>{city}</Text>
            </View>
            
            <Text style={styles.cardPrice}>
                          <Text style={styles.cardPriceValue}>
                            <MaterialCommunityIcons name="currency-ils" style={styles.shekel}/>{' '}
                            {price.amount.toLocaleString('en-US')}{' '}
                          </Text>
                          <Text style={styles.cardPriceCurrency}> /day</Text>
                        </Text>
                           
          </View>

          <View style={styles.headerRow}>
            <View style={styles.headerStars}>
                <Text style={styles.headerLocationText}>{config.categories[mainCategoryId]?.label}</Text>
            </View>
          </View>

          {/* <View style={styles.headerRow}>
            <View style={styles.headerStars}>
                {[...Array(rate)].map((_, index) => (
                <FontAwesome
                    key={index}
                    color="#f26463"
                    name="star"
                    solid={true}
                    size={14}
                />
                ))}
                {[...Array(5 - rate)].map((_, index) => (
                <FontAwesome
                    key={index + rate}
                    color="#f26463"
                    name="star"
                    size={14}
                />
                ))}
                <Text style={styles.headerStarsText}>{reviews} reviews</Text>
            </View>
          </View> */}
        </View>

        <View style={styles.picker}>
          
          <Text style={{marginLeft: 8, fontWeight: '500', fontSize: 13, lineHeight: 18, color: '#000',}}>
            Order Dates:</Text>
          <TouchableOpacity
            style={styles.pickerDates}>
            <FeatherIcon
              color="#242329"
              name="calendar"
              size={16} />

            <Text style={styles.pickerDatesText}>   {startDay}   -   {endDay}</Text>
          </TouchableOpacity> 
        </View>

    
        <View style={styles.stats}>
          <View style={styles.statsItem}>
            <FontAwesome color="#7B7C7E" name="user" size={15} />
            <Text style={styles.statsItemText}>
            owner : {owner.name.length > 20 ? `${owner.name.substring(0, 20)}...` : owner.name}
             </Text>
          </View>
          
          <View style={styles.statsItem}>
            <ContactButtons
                    phoneNumber={owner.phoneNumber}
                    color={COLORS.similarToBlack}
                />
          </View>
        </View> 

        <View style={styles.about}>
          <Text style={styles.aboutTitle}>About</Text>

          <Text style={styles.aboutDescription}>
            {description}
            {'\n'}
            
          </Text>
        </View>
        
        <View style={styles.about}>
            <GoogleMaps
                location={location}
                style={styles.map}
                movable
                />
        </View>
      </ScrollView> )}

      {value == 1 && 
      ( <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <View style={styles.about}>
              <Text style={{margin:15, fontWeight: '500', fontSize: 15, lineHeight: 18, color: '#000',}}>
                See availability on other days</Text>
              <CalendarComponent
                disabledDates={disabledDates}
                minDate={availability.startDate}
                maxDate={availability.endDate}
              />
        </View> 
        
        {/* <View style={styles.about}>
          <Pressable style={styles.blackText} onPress={() => {
            
          }}>
            
            <Text style={{ textDecorationLine: 'underline', fontSize:14}}> Add a New rental{'  '}
            <EvilIcons name="arrow-right" size={20} color="#000" />
            </Text>
            
           
          </Pressable>
          
        </View> */}
        </View>
      )}

      {value == 2 && 
      ( <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>

        {/* <View style={styles.about}>
              <Text style={{margin:15, fontWeight: '500', fontSize: 15, lineHeight: 18, color: '#000',}}>
                See availability on other days</Text>
              <CalendarComponent
                disabledDates={disabledDates}
                minDate={availability.startDate}
                maxDate={availability.endDate}
              />
        </View>  */}
        
        
        </View>
      )}


      

    </View> 
  );
}



const styles = StyleSheet.create({
  actions: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  footer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  /** Action */
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
  blackText:{
    margin:15, 
    fontWeight: '500', 
    fontSize: 15, 
    lineHeight: 18, 
    color: '#000',
  },
  /** Tabs */
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 0,
    alignContent: 'space-between',
  },
  tabsItemWrapper: {
    //marginRight: 28,
  },
  tabsItem: {
    flexDirection: 'row',
    alignContent: 'space-between',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 4,
    marginHorizontal:19,  // Change this if want to change the space between tabs
  },
  tabsItemText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  tabsItemLine: {
    width: 40,
    height: 3,
    backgroundColor: '#f26463',
    borderRadius: 24,
    marginHorizontal:28,
  },
  /** Photos */
  photos: {
    paddingVertical: 12,
        gap: 6,
        overflow: "scroll",

    // paddingTop: 6,
    // paddingHorizontal: 20,
    // marginTop: 12,
    // position: 'relative',
    // height: 240,
    // overflow: 'hidden',
    // borderRadius: 12,
    
  },
  photosPagination: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: '#242329',
    borderRadius: 31,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  photosPaginationText: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#ffffff',
  },
  photosImg: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    width: '100%',
    //height: 240,
    borderRadius: 12,
    objectFit: 'cover', // Add this line
  },
  /** Header */
  header: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  headerLocation: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLocationText: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    color: '#7b7c7e',
    marginLeft: 4,
  },
  headerPrice: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    textAlign: 'right',
    color: '#f26463',
  },
  headerStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerStarsText: {
    marginLeft: 8,
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  headerDistance: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  /** Picker */
  picker: {
    marginTop: 6,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    height: 48,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    borderStyle: 'solid',
    borderRadius: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pickerDates: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerDatesText: {
    marginLeft: 8,
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
  },
 
  /** Stats */
  stats: {
    marginTop: 10,
    marginHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsItemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: '#242329',
    marginLeft: 7,
  },
  /** About */
  about: {
    marginHorizontal: 20,
    marginTop: 8,
  },
  aboutTitle: {
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 32,
    color: '#242329',
    marginBottom: 4,
  },
  aboutDescription: {
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 20,
    color: '#7b7c7e',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 36,
    borderWidth: 1,
    backgroundColor: '#242329',
    borderColor: '#242329',
    height: 52,
  },
  btnText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#F26463',
    borderColor: '#F26463',
    height: 52,
  },
  btnSecondaryText: {
    fontSize: 16,
    lineHeight: 26,
    fontWeight: '700',
    color: '#fff',
  },
  cardPriceCurrency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#222',
  },
  map: {
    marginTop: 12,
    height: 200,
    width: "auto",
    paddingTop: 6,
    paddingHorizontal: 20,
    marginTop: 12,
    position: 'relative',
    height: 240,
    overflow: 'hidden',
    borderRadius: 12,
},
});