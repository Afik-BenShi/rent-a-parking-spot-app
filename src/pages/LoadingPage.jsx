import React, { useEffect } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";
import { Text } from "@rneui/themed";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { branchOnInfoExistance } from "../auth/auth";

export default function LoadingPage({ navigation }) {
    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                console.log('no user');
                navigation.navigate("auth", {});
                return;
            }
            branchOnInfoExistance({
                user,
                doIfExists() {
                    console.log(user.uid, 'user has private data');
                    navigation.navigate("main", { userId: user.uid });
                },
                doIfNotExists() {
                    console.log(user.uid, 'user have no private data');
                    navigation.navigate("auth", { /*redirect: "SignUpDetails"*/ });
                },
            });
        });
    }, []);
    return (
        <SafeAreaView style={styles.headerContainer}>
            <Text style={styles.headerText}>
                Rental
                <FontAwesome5
                    name="box-open"
                    size={35}
                    color={COLORS.cartTitle}
                    style={styles.logoIcon}
                />
                Wise
            </Text>
            <ActivityIndicator
                color={COLORS.cartTitle}
                size="large"
                style={styles.spinner}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
        flex: 1,
    },
    headerText: {
        color: COLORS.cartTitle,
        fontWeight: "700",
        fontSize: 34,
        fontFamily: "Roboto",
        textAlign: "center",
        marginTop: 0,
    },
    logoIcon: {
        marginRight: 5,
    },
    spinner: {
        marginTop: 48,
    },
});
