import React from 'react';
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
  Pressable,
} from 'react-native';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import FontAwesome from 'react-native-vector-icons/FontAwesome';


// Import the mock data for owner products page:
// import { mockData } from '../../assets/personalProductsMockData'; 
import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';


export default function MyProductsPage ({navigation}) {
    
    
    // Fetch user's products from the backend
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const userId = 1; // Hardcoded user ID for now


    const fetchUserProducts = () => {
        fetch(`http://192.168.1.39:3000/myProducts?userId=${userId}`)
        
        //fetch(`http://192.168.1.39:3000/products`)
          .then(response => response.json())
          .then(data => {
            console.log("products data", data);
            const itemsList = data.map(product => product.data);
            
            console.log("itemsList", itemsList);

            setProducts(itemsList);
            setIsLoading(false); // Set isLoading to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching products:', error);
            setIsLoading(false); // Set isLoading to false on error
          });
      };
  
      useEffect(() => {
        fetchUserProducts();
      }, []);

    return (
        <View style={styles.layout}>
        <SafeAreaView >
            
            <Header
                leftComponent={
                <Pressable onPress={() => console.log('Menu button pressed!')}>
                    <FontAwesome name="bars" color={COLORS.cartTitle} size={25} style={styles.menuIcon} />
                </Pressable>
                }
                
                rightComponent={
                    <View style={{alignContent:'flex-start', flexDirection: 'row'}}>
                    <Pressable onPress={() => navigation.navigate('addProduct')}>
                        <FontAwesome name="plus-square-o" color={COLORS.btnBlue} size={30} style={styles.filterIcon} />
                    </Pressable>
                    </View>
                }
                containerStyle={styles.headerContainer}
                />  

        </SafeAreaView>
            
            <CardList
                items={products}
                title="My Products"
                onItemPressed={(details) => navigation.navigate('ownerProduct', {details})}
            />
                
            
            
            
            {/*
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.addProductBtn}
                    onPress={() => navigation.navigate('addProduct')}>
                    <Icon name='add' size={30} color={COLORS.white} />
                </TouchableOpacity>
                </View>
                */}
        </View>
        
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1, 
        backgroundColor: '#f3f5f9',  // background color 
        //alignContent: 'center',
        justifyContent: 'flex-start', // Align items at the top
        flexDirection: 'column',  
        //marginBottom: -40,
    },
    addProductBtn: {
        backgroundColor: COLORS.btnBlue,
        width: 140,
        padding: 3,
        borderRadius: 12,
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'blue',
        //backgroundColor: '#f3f5f9',  // background color 
        justifyContent: 'flex-start', // Align items at the top
        flexDirection: 'column', 
        flex: 1,
  },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 2, // iOS shadow
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    // header styles
    headerContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        height: 95,
        marginTop: -30,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightgrey,
        backgroundColor: '#fff',
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
        marginLeft: 15,
      },
      filterIcon: {
        marginTop: 0,
        marginRight: 20,
      },
});