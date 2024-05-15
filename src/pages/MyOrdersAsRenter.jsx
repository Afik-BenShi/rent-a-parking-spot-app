import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    RefreshControl,
    Image,
    Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS } from '../../assets/theme';
import CardListForMyOrders from '../components/cardListForMyOrders';
import config from '../backend/config';
import NoOrdersYet from './noOrdersYetPage';

export default function MyOrderAsRenterPage({ navigation, route }) {

    const [myOrders, setMyOrders] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);
    const [refreshing, setRefreshing] = useState(false);

    const [noContent, setNoContent] = useState(true);

    const fetchMyOrderAsRenter = async () => {
        try {
            const response = await axios.get(`http://${config.serverIp}:${config.port}/orders/renter/${userId}?time=all`);
            setMyOrders(response.data);
            
            console.log("myOrders : " + myOrders);
            console.log("myOrders : " + JSON.stringify(response.data));
            
            if (myOrders) {
                setNoContent(false);
            }
        }
        catch (err) {
            console.log(JSON.stringify(err))
            console.log("error while fetching renter")
        }
    };


    useEffect(() => {
        fetchMyOrderAsRenter();
    }, []);
    
    
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    try{
        fetchMyOrderAsRenter();    
      
    } catch (err) {
      console.log(JSON.stringify(err))
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  
  }, []);


    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                refreshing={refreshing} // Set refreshing state here
                onRefresh={onRefresh} // Pass onRefresh function here
                
                />
            }
        >

        
        <View style={styles.container}>
          
          {/*
          *  TODO : separate to history orders and upcoming orders
          *  display: title, image, price, date (start - end), owner (name, phone number)
          *  rating
          *  ADD : category
          */}
          
          {
          !noContent && 
          <CardListForMyOrders
            items={myOrders.map((order) => ({
                ...order.enriched_productId,
                productId: order.productId,
                OrderStartDate: order.startDate,
                OrderEndDate: order.endDate,
            }))}
            title=""
            onItemPressed={(details) => {
                navigation.navigate('ExtendedProduct', {
                  details: {
                    ...details,
                    OrderStart: details.OrderStartDate,
                    OrderEnd: details.OrderEndDate,
                  }
                });
              }}
            />}
          
          {noContent && <NoOrdersYet />}
        
        </View>
        </ScrollView>
    )
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
      marginTop:10,
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
});
