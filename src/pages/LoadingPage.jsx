import React from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native"
import { COLORS } from "../../assets/theme";
import { Text } from "@rneui/themed";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function LoadingPage() {
    return(
        <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerText}>
              Rental
              <FontAwesome5 name="box-open" size={35} color={COLORS.cartTitle} style={styles.logoIcon} />
              Wise
            </Text>
            <ActivityIndicator color={COLORS.cartTitle} size="large" style={styles.spinner}/>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.lightWhite,
        justifyContent: 'center',
        flex:1,
      },
      headerText: {
        color: COLORS.cartTitle,
        fontWeight: '700',
        fontSize: 34,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginTop: 0,
      },
      logoIcon: {
        marginRight: 5,
      },
      spinner:{
        marginTop:48,
      }
});