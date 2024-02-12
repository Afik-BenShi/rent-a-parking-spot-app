import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';
import { COLORS } from '../../assets/theme';
import NextBackBtn from '../components/nextAndBackBtn';



export default function SubmitDetails({ navigation, route }) {
        const { detailsList } = route.params;

        const onGoBackPress = () =>{
            navigation.goBack();
        };

        return (
            <View style={{ flex: 1 }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <View style={styles.headerAction}>
                            </View>
                            <Text style={styles.title}>Your Parking Spot</Text>
                            <View
                                style={[styles.headerAction, { alignItems: 'flex-end' }]} />
                            </View>

                        <ScrollView
                            contentContainerStyle={styles.receipt}
                            showsVerticalScrollIndicator={false}>

                            <View style={styles.receiptLogo}>
                                <AnotherIcon color={COLORS.lightWhite} name="car" size={32} />
                            </View>

                            <Text style={styles.receiptSubtitle}></Text>
                            
                            {/*******/}
                            <View style={styles.divider}>
                                <View style={styles.dividerInset} /></View>

                            <View style={styles.details}>
                                <Text style={styles.detailsTitle}>Parking spot details</Text>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Full Name</Text>

                                    <Text style={styles.detailsValue}>{detailsList.ownerName}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>City</Text>

                                    <Text style={styles.detailsValue}>{detailsList.city}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Parking Street</Text>

                                    <Text style={styles.detailsValue}>{detailsList.street}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>House Number</Text>

                                    <Text style={styles.detailsValue}>{detailsList.houseNumber}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Hourly Price</Text>

                                    <Text style={styles.detailsValue}>{detailsList.price} 
                                        <Icon name="currency-ils" size={14} color="#000" /> per hour</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Phone Number</Text>

                                    <Text style={styles.detailsValue}>{detailsList.phoneNumber}</Text>
                                </View>

                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Parking availability</Text>

                                    <Text style={styles.detailsValue}>
                                    {detailsList.from} - {detailsList.until}
                                    </Text>
                                </View>
                                
                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Has Charger</Text>

                                    <Text style={styles.detailsValue}></Text>
                                </View>

                            </View>
                        </ScrollView>
                
                    </View>
                </SafeAreaView>

                <View style={styles.overlay}>
                      <Text style={styles.receiptDescription}>
                      By clicking Finish,{'\n'} 
                      the parking will be available for rent by other users {'\n'}
                      with the details you have entered
                      </Text>

                      <NextBackBtn 
                        nextText="Finish"
                        backText="Back"
                        navigation={navigation}
                        onNextPress={()  => { /* handle back press */ }}
                        paddingBottom={0}
                      />   
                    </View>

                
            </View>
        );
    }


    /*
    houseNumber: "",
        price: "",
        phoneNumber: "",
        from: "",
        until:
    */
const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'stretch',
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
  /** Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
    color: COLORS.black,
    marginBottom: 6,
    marginTop: 15,
    textAlign: 'center',
  },
  /** Receipt */
  receipt: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 140,
  },
  receiptLogo: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginBottom: 12,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiptTitle: {
    fontSize: 21,
    fontWeight: '600',
    color: '#151515',
    marginBottom: 2,
  },
  receiptSubtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: '#818181',
    marginBottom: 12,
  },
  receiptPrice: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginBottom: 6,
  },
  receiptPriceText: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: 'bold',
    letterSpacing: 0.35,
    color: '#8338ec',
  },
  receiptDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#818181',
    textAlign: 'center',
    marginBottom: 12,
  },
  /** Divider */
  divider: {
    overflow: 'hidden',
    width: '100%',
    marginVertical: 24,
  },
  dividerInset: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#e5e5e5',
    borderStyle: 'dashed',
    marginTop: -2,
  },
  /** Details */
  details: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  detailsTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 16,
  },
  detailsRow: {
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  detailsField: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: '#8c8c8c',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  detailsValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#444',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'right',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#4FC3F7',
    borderColor: '#4FC3F7',
    marginBottom: 12,
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: COLORS.black,
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: COLORS.darkBlue,
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
});