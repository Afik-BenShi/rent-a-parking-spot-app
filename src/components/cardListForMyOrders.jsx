import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../assets/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { timeStampToDate } from "../utils/dateTime";
import { dateRangeFormat } from "../utils/dateTime";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from  'react-native-vector-icons/Octicons';




export default function CardListForMyOrders({ items, title, onItemPressed = (_) => { }}) {
  const placeholderImage = require('../../assets/parking-details-images/placeholder.png');
  console.log("items in cardList : " + JSON.stringify(items));

    /* params : endDay (Date type) */
    function ActionIcon (endDay) {
        const time = endDay >= Date.now() ? "next" : "past";
        //console.log("Date.now() : " + Date.now());
        console.log("time : " + time);
        
        switch (time) {
            case "past":
                return (
                    <Text> <FontAwesome5
                        color={COLORS.similarToBlack}
                        name="check-circle"
                        size={18} />   Done </Text>
                );
            case "next":
                return (
                    <Text> <Octicons
                        color="#47d86e"
                        name="dot-fill"
                        size={22} />   Active </Text>
                );
            default:
                return (
                    <FeatherIcon
                        color="#FF0000"
                        name="x"
                        size={18} />
                );
        }
    }

    const categorizeItems = (items) => {
        const nextItems = [];
        const pastItems = [];
        items.forEach((item) => {
          const time = timeStampToDate(item.OrderEndDate) >= Date.now() ? "next" : "past";
          if (time === "next") {
            nextItems.push(item);
          } else {
            pastItems.push(item);
          }
        });
        return { nextItems, pastItems };
      };
    
    const { nextItems, pastItems } = categorizeItems(items);

    // Concatenate the next and past sublists
    const allItems = [...nextItems, ...pastItems];

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.cardBackground }}>
      
      <ScrollView
        contentContainerStyle={styles.container}>
        <Text style={styles.title}>{title}</Text>

        <View style={styles.row}>

          {allItems.map(
            (item, index) => {
              const { 
                id, 
                title, 
                pricePerDay, 
                description, 
                ownerId, 
                city, 
                mainCategoryId, 
                OrderStartDate ,
                OrderEndDate ,
                urlToimage,
               } = item;
              
                const image = urlToimage? { uri: urlToimage } : placeholderImage;
                
                const { startDay, endDay } = dateRangeFormat(timeStampToDate(OrderStartDate), timeStampToDate(OrderEndDate));
                console.log("after parsing : " + startDay + " " + endDay);

              return (
                <View key={index} style={styles.cardContainer}>
                  <TouchableOpacity
                    onPress={() => onItemPressed(item)}>
                    <View style={styles.card}>
                      <Image
                        alt=""
                        resizeMode="cover"
                        source={image}
                        style={styles.cardImg}
                      />
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle}>{title.length > 40 ? title.substring(0, 37) + '...' : title}</Text>
                        
                        <Text style={styles.cardCity}>
                        <FeatherIcon
                                color="#7B7C7E"
                                name="map-pin"
                                size={14} />
                                {' '}{city}  
                        </Text>
                      </View>
                      
                        <View style={styles.divider}>
                        <View style={styles.dividerInset} /></View>

                      <View style={styles.OrderRangeRow}>
                        <Text style={styles.rangeText}>
                            {ActionIcon(timeStampToDate(OrderEndDate))} </Text>



                        <Text style={styles.rangeText}>  
                            <FeatherIcon
                            color="#242329"
                            name="calendar"
                            size={18} /> 
                        {'  '}{startDay}  -  {endDay}</Text>
                       </View>

                    </View>
                  </TouchableOpacity>


                </View>
              );
            },
          )}
        </View>

        

      </ScrollView>
      
    </SafeAreaView>
    

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    paddingBottom: 500,
    backgroundColor: COLORS.cardBackground,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '100%', // Adjust as needed, considering margins and paddings
    marginBottom: 14,
  },
  card: {
    alignItems: 'stretch',
    borderRadius: 12,
    backgroundColor: '#fff',
    height: 262,
    elevation: 2, // Add elevation for shadow effect
    shadowColor: '#000', // Shadow color
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    shadowOffset: {
      width: 0, // Shadow offset width
      height: 2, // Shadow offset height
    },
  },
  cardImg: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardBody: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#173153',
    marginRight: 8,
    flexGrow: 1,
  },
  cardCity: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.greyText,
  },
  cardPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5f697d',
  },
  cardPriceValue: {
    fontSize: 21,
    fontWeight: '700',
    color: '#173153',
  },
  shekel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#173153',
  },
  cardPriceCurrency: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6f61c4',
  },
  OrderRangeRow : {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  rangeText :{
    fontSize: 13,
    fontWeight: '600',
    color: '#242329',
  },
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

});
