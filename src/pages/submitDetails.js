import React, { useState, useContext } from 'react';
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
import ExpandableImage from "../components/ExpandableImage";

import { getUser } from '../auth/auth';
import config from '../backend/config'
import { RefreshContext } from '../context/context';

const productImage = require("../../assets/parking-details-images/placeholder.png");


const onClickFinish = async ({ navigation, detailsList, userId, refresh, setRefresh }) => {
  console.log("Product details submitted: ", detailsList);

  // Send the details to the backend
  // Send a POST request to your server
  let token;
  try {
    token = await getUser()?.getIdToken();
  } catch (error) {
    console.error("Error getting user token:", error);
    // Handle the error appropriately
    return;
  }

  let imgRes;

  try {
    imgRes = await fetch(`http://${config.serverIp}:${config.port}/myProducts/img`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify({
        title: detailsList.productName,
        ownerId: userId,
        imageUri: detailsList.imageUri
      })
    })
  }
  catch (err) {
    console.error("Error while uploading an image:", JSON.stringify(err));
  }
  imgRes = await imgRes.json()

  const newProduct = {
    title: detailsList.productName,
    pricePerDay: detailsList.price,
    ownerId: userId,
    description: detailsList.productDescription,
    mainCategoryId: detailsList.category,
    fromDate: new Date(detailsList.fromDate),
    untilDate: new Date(detailsList.untilDate),
    city: detailsList.city,
    imageName: imgRes.data
  };

  console.log('newProduct', newProduct)

  fetch(`http://${config.serverIp}:${config.port}/myProducts/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    body: JSON.stringify(newProduct)
  })
    .then(response => {
      console.log("success to post new product")
      console.log("Response from server:", response.ok);
    })
    .catch(error => {
      console.error("Error while posting new product:", JSON.stringify(error));
    });

  // Navigate to the My Products page
  // Use CONTEXT - to remove the Non-seriazable warning
  setRefresh(true);
  setTimeout(() => setRefresh(false), 10);
  navigation.navigate("My Products cardList");

};



export default function SubmitDetails({ navigation, route }) {
  const { refresh, setRefresh } = useContext(RefreshContext);
  const { detailsList, user } = route.params;

  const [userId, setUserId] = useState(user);
  console.log("userId in submitDetails: ", userId);

  const onGoBackPress = () => {
    navigation.goBack();
  };

  const data = [
    { key: '1', value: 'Outdoor equipment' },
    { key: '2', value: 'Entertainment & Events' },
    { key: '3', value: 'Home Improvement' },
  ];

  const categoryName = data.find((item) => item.key === detailsList.category) ?
    data.find((item) => item.key === detailsList.category).value : "";

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerAction}>
            </View>
            <Text style={styles.title}>Your product</Text>
            <View
              style={[styles.headerAction, { alignItems: 'flex-end' }]} />
          </View>

          <ScrollView
            contentContainerStyle={styles.receipt}
            showsVerticalScrollIndicator={false}>

            <View style={styles.receiptLogo}>
              {<Icon color={COLORS.lightWhite} name="account-details" size={32} />}
            </View>



            {/*******/}
            <View style={styles.divider}>
              <View style={styles.dividerInset} /></View>

            <View style={styles.details}>
              <Text style={styles.detailsTitle}>Product details</Text>

              {/*<View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Owner full name</Text>

                                    <Text style={styles.detailsValue}>{detailsList.ownerName}</Text>
                                </View>
                                */}

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Product name</Text>

                <Text style={styles.detailsValue}>{detailsList.productName}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Location</Text>

                <Text style={styles.detailsValue}>{detailsList.city}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Category</Text>

                <View>
                  <Text style={styles.detailsValue}>{categoryName}</Text>
                </View>

              </View>


              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Daily Price</Text>

                <Text style={styles.detailsValue}>{detailsList.price}
                  <Icon name="currency-ils" size={14} color="#000" /> / day</Text>
              </View>

              {/*
                                <View style={styles.detailsRow}>
                                    <Text style={styles.detailsField}>Phone Number</Text>

                                    <Text style={styles.detailsValue}>{detailsList.phoneNumber}</Text>
                                </View>
                              */}

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>Days of availability</Text>

                <Text style={styles.detailsValue}>
                  {detailsList.from} - {detailsList.until}
                </Text>
              </View>

              <View >
                <Text style={styles.detailsField}>
                  {'\n'}Description: </Text>

                <Text style={styles.descriptionValue}>
                  {'\n'}{detailsList.productDescription}
                </Text>
              </View>

              <View>
                <Text style={styles.detailsField}>Image</Text>
                <ExpandableImage source={productImage} initialHeight={250} />
              </View>

            </View>
          </ScrollView>

        </View>
      </SafeAreaView>

      <View style={styles.overlay}>
        <Text style={styles.receiptDescription}>
          By clicking Finish,{'\n'}
          your product will be available for rent by other users {'\n'}
          with the details you have provided
        </Text>

        <NextBackBtn
          nextText="Finish"
          backText="Back"
          navigation={navigation}
          //onNextPress={()  => {navigation.navigate("My Products cardList")}}
          onNextPress={() => onClickFinish({ navigation, detailsList, userId, refresh, setRefresh })}

          paddingBottom={0}
        />
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
    paddingHorizontal: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingBottom: 120,
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
    paddingHorizontal: 12,
    paddingBottom: 20,
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
  receiptDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#818181',
    textAlign: 'center',
    marginBottom: 12,
  },
  descriptionValue: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#444',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 14,
    flexDirection: 'row',
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