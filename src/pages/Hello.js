import React from 'react';
import { View, StyleSheet, Text, Image, SafeAreaView } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { COLORS } from '../constants';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './app.style'


const Hello = () => {
  const router = useRouter()

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
              options={{
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: COLORS.lightWhite },
                  headerTitle: ""
              }}
            />

          <View style={styles.mainView}>
              <View style={styles.TopViewOpen}>
                  <Image
                      style={styles.Img}
                      source={require('../assets/images/back.png')}
                      ></Image>
              </View>
              
              <View style={styles.ButtomViewOpen}>  
                  <Text style={style_open_page.Heading}> Park with ease </Text>

                  <Text style={style_open_page.sectionTitle}>Find your perfect parking space</Text>
                  <Text style={style_open_page.sectionTitle}>wherever and whenever you need</Text>

                  <Button style={style_open_page.btn} title="GET STARTED" onPress={() => router.push("/SignIn")} />

              </View>



              

              
          </View>

      </SafeAreaView>
    );
}


const style_open_page = StyleSheet.create({
  
  Heading: {
      fontSize: 26,
      fontWeight: 'bold', 
      color: COLORS.black,
      marginTop: 40,
      marginBottom: 20
  },
  sectionTitle: {
      fontSize: 16,
      color: COLORS.grey3,
      //fontWeight: 'bold',
      //margin: 5,
  },
  btn :{
      marginTop: 20,
      
  },
});

// <Button title="Go to AddParking" onPress={() => router.push("/AddParking")} />
export default Hello;
