import React from 'react';
import { View, Text, Image, SafeAreaView } from "react-native";
import { Link, Stack, useRouter } from "expo-router";
import { COLORS } from '../constants';
import { Button } from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './app.style'


const SignIn = () => {
  const router = useRouter()

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
              options={{
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: COLORS.lightWhite },
                  headerTitle: "Sign in"
              }}
            />

          <View style={styles.mainView}>
              <View style={styles.TopView}>
                  <Image
                      style={styles.Img}
                      source={require('../assets/images/Screenshot.png')}
                      ></Image>
              </View>
              
              <View style={styles.ButtomView}>  
                  <Text style={styles.Heading}>Welcome back </Text>

                  <Text style={styles.sectionTitle}>Log in </Text>

                  <Button
                    title="Sign in with Google (demo)"
                    icon={{
                      name: 'google',
                      type: 'font-awesome',
                      size: 15,
                      color: 'black',
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    buttonStyle={{
                      backgroundColor: COLORS.lightWhite,
                      borderRadius: 30,
                    }}

                    containerStyle={{
                      width: 300,
                      margin: 50,
                    }}
                    titleStyle={{ fontWeight: 'bold', color:'black' }}
                  />
                  
              </View>
              <Button title="Go to AddParking" onPress={() => router.push("/AddParking")} />

              
          </View>

      </SafeAreaView>
    );
}


export default SignIn;
