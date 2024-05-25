import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    SafeAreaView,
    ScrollView,
    View,
    RefreshControl,
} from 'react-native';
import { Header } from 'react-native-elements';

import { COLORS } from '../../assets/theme';
import CardListForMyOrders from '../components/cardListForMyOrders';
import config from '../backend/config';
import NoOrdersYet from './noOrdersYetPage';
import { getAuth } from 'firebase/auth';

export default function MyOrderAsRenterPage({ navigation, route }) {

    const [myOrders, setMyOrders] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);
    const [refreshing, setRefreshing] = useState(false);

    const [noContent, setNoContent] = useState(true);

    const fetchMyOrderAsRenter = async () => {
        try {
            const token = getAuth().currentUser?.getIdToken()
            const response = await axios.get(`http://${config.serverIp}:${config.port}/orders/renter/${userId}?time=all`,
              {headers: { Authorization: await token },}
            );
            const items = response.data;
            setMyOrders(items);
            
            console.log("myOrders : " + myOrders);
            console.log("myOrders : " + JSON.stringify(response.data));
            
            if (!items || items.length === 0) {
              setNoContent(true);
            } else {
                setNoContent(false);
            }
          
            console.log("noContent : " + noContent);
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
              OwnerInfo: order.enriched_ownerId,
            }))}   // image url is already in 'order.enriched_productId'
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
    title: {
      fontSize: 25,
      fontWeight: '800',
      color: '#173153',
      marginLeft: 14,
      marginTop:10,
    },
 
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column',
      backgroundColor: COLORS.cardBackground,
    },
   
});
