import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import config from '../backend/config'

export default function MyProductsPage({ navigation, route }) {
    const [myItems, setMyItems] = useState([]);
    const [userId, setUserId] = useState(route.params.userId);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://${config.serverIp}:${config.port}/myProducts`, { params: { userId } });
            setMyItems(response.data);
        }
        catch (err) {
            console.log(JSON.stringify(err))
        }
    };


    useEffect(() => {
        fetchProducts();
    }, [userId]);

    return (
        <SafeAreaView style={styles.layout}>

            <Header

                leftComponent={
                    {/*<Pressable onPress={() => console.log('Menu button pressed!')}>
                        <FontAwesome name="bars" color={COLORS.cartTitle} size={25} style={styles.menuIcon} />
                </Pressable>*/}
                }



                rightComponent={
                    <View style={{ alignContent: 'flex-start', flexDirection: 'row' }}>
                        <Pressable onPress={() => navigation.navigate('addProduct')}>
                            <FontAwesome name="plus-square-o" color={COLORS.btnBlue} size={30} style={styles.filterIcon} />
                        </Pressable>
                    </View>
                }
                containerStyle={styles.headerContainer}
            />


            <View style={styles.container}>
                <CardList
                    items={myItems}
                    title="My Products"
                    onItemPressed={(details) => navigation.navigate('ownerProduct', { details, userId })}
                />
            </View>

            {/*
            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.addProductBtn}
                    onPress={() => navigation.navigate('addProduct')}>
                    <Icon name='add' size={30} color={COLORS.white} />
                </TouchableOpacity>
                </View>
                */}
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
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        height: 95,
        marginTop: -40,
        borderBottomWidth: 1,
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
        marginLeft: 15,
    },
    filterIcon: {
        marginTop: 0,
        marginRight: 20,
    },
});