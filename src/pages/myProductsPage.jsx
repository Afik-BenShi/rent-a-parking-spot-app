import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';
<<<<<<< HEAD
=======
import { Header } from 'react-native-elements';
>>>>>>> 77fb1a4 (improve filters, input validation in AddNewProduct)
import Ionicons from 'react-native-vector-icons/Ionicons';

import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import config from '../backend/config';
import { getUser } from '../auth/auth';

export default function MyProductsPage({ navigation, route }) {
    const [myItems, setMyItems] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);
    const [refreshing, setRefreshing] = useState(false);

    const fetchProducts = async () => {
        const token = await getUser()?.getIdToken();
        try {
            const response = await axios.get(`http://${config.serverIp}:${config.port}/myProducts`, {
                headers: {Authorization: token},
                params: { userId } });
            setMyItems(response.data);
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    };

    useEffect(() => {
        fetchProducts();
        console.log("refresh - fetchProducts");

        setTimeout(() => {
            setRefreshing(false);
        }, 100);

    }, [refreshing]);

    const updateProducts = () => {
         (true);
    };

    return (
        <SafeAreaView style={styles.layout}>

<<<<<<< HEAD
             {/* <Header
=======
            <Header
>>>>>>> 77fb1a4 (improve filters, input validation in AddNewProduct)
                leftComponent={{}}
                rightComponent={{}}
                containerStyle={styles.headerContainer}
            />  */}


            <View style={styles.container}>
                <CardList
                    items={myItems}
                    //title="My Products"
                    title=""
                    
                    onItemPressed={(details) => navigation.navigate('ownerProduct', { details, userId })}
                />
            </View>

            <View style={styles.buttonContainer}>
                    <View style={styles.circle} />
                    
                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={() => navigation.navigate('addProduct', { updateProducts })}
                    > 
                    <Ionicons style={styles.newProductBtn} 
                        name="add-circle" 
                        type="material" 
                        color={COLORS.btnBlue}
                        size={65}
                        />
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
    // header styles
    headerContainer: {
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        height: 120,
        marginTop: -40,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.lightgrey,
    },
    headerText: {
        color: COLORS.cartTitle,
        fontWeight: '700',
        fontSize: 24,
        //fontFamily: 'Roboto',
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
// add new product button
  newProductBtn: {
    position: 'absolute',
    bottom: -10,
    right: 122,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    zIndex: 999, // Ensure it's above other content
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#fff', 
    borderRadius: 30,
    width: 38,
    height: 38,
    bottom: 20,
    right: 150,
    zIndex: -1, // Ensure it's behind the button
  },
});