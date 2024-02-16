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
import Icon from 'react-native-vector-icons/MaterialIcons'; 


//import { rentalItems } from '../../assets/mockData';

// Import the mock data for owner products page:
import { ownerRentalItems } from '../../assets/personalProductsMockData'; 
import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';


export default function MyProductsPage ({navigation}) {

    return (
        <SafeAreaView style={styles.layout}>
            <View style={styles.container}>
                <CardList
                    items={ownerRentalItems}
                    title="My Products"
                />
                
            </View>
            
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.addProductBtn}
                    onPress={() => navigation.navigate('addProduct')}>
                    <Icon name='add' size={30} color={COLORS.white} />
                </TouchableOpacity>
                </View>
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
        flex: 1, 
        justifyContent: 'center', 
        flexDirection: 'column',
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

});