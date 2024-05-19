import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import config from '../backend/config';
import { getUser } from '../auth/auth';
import NoProductsYet from './noProductsYetPage';
import { RefreshContext } from '../context/context';


export function MyProductsPage({ navigation, route }) {
    const { refresh, title, description } = useContext(RefreshContext);  // TODO: finish with use context
    // title and description are used to update the header title and description from the editable components

    const [myItems, setMyItems] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);
    //const [refreshing, setRefreshing] = useState(false);
    const [noContent, setNoContent] = useState(false);
    
    // function updateProducts () {
    //     console.log("hi from updateProducts");
    //     setRefreshing(false);
    //     setTimeout(() => setRefreshing(true), 0);
    // };

    const fetchProducts = async () => {
        const token = await getUser()?.getIdToken();
        try {
            const response = await axios.get(`http://${config.serverIp}:${config.port}/myProducts`, {
                headers: {Authorization: token},
                params: { userId } });
            const items = response.data;
            setMyItems(items);
            console.log("myItems : " + JSON.stringify(items));
            
            // Check if the fetched items are empty
            if (!items || items.length === 0) {
                setNoContent(true);
            } else {
                setNoContent(false);
            }           
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    };

    // useEffect(() => {
    //     fetchProducts();
    //     console.log("refresh - fetchProducts");

    //     setTimeout(() => {
    //         setRefreshing(false);
    //     }, 100);

    // }, [refreshing]);



    useEffect(() => {
        fetchProducts();
    }, [refresh]);
   
    // useEffect(() => {
    //     console.log("get the update in my products page");
    //     console.log("new title: ", title);
    //     console.log("new description: ", description);
    // }, [title, description]);


    return (
        <SafeAreaView style={styles.layout}>

             {/* <Header
                leftComponent={{}}
                rightComponent={{}}
                containerStyle={styles.headerContainer}
            />  */}


            <View style={styles.container}>
            {!noContent && (
                <CardList
                    items={myItems}
                    //title="My Products"
                    onItemPressed={(details) => navigation.navigate('ownerProduct', { details, userId })}
                    style={styles.cardList} // Apply styles to CardList
                />
            )}

            { noContent && <NoProductsYet />   }
                
            </View>


            <View style={styles.buttonContainer}>
                
                    <View style={styles.circle} />
                    
                    <TouchableOpacity style={styles.buttonContainer} 
                        onPress={() => navigation.navigate('addProduct', { userId })}
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
        justifyContent: 'flex-start',
        flexDirection: 'column',
        backgroundColor: COLORS.cardBackground,
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
  cardList: {
    flex: 1, // Ensure the CardList takes up the full height of the container
},

});