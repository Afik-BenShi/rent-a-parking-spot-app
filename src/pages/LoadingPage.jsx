import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";
import { Text } from "@rneui/themed";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { branchOnInfoExistance, getUser, signOutUser } from "../auth/auth";
import { useFocusEffect } from "@react-navigation/native";

export default function LoadingPage({ navigation }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isShowError, setError] = useState(false);
    const signOutDelayed = () => setTimeout(() => signOutUser(), 2000);
    const handleUserAuth = (user) => {
        if (!user) {
            console.log("no user");
            setIsLoading(false);
            setError(false);
            navigation.navigate("auth", {screen: "Login"});
            return;
        }
        setIsLoading(true);
        branchOnInfoExistance({
            user,
            doIfExists() {
                setIsLoading(false);
                console.log(user.uid, "user has private data");
                navigation.navigate("main", { userId: user.uid });
            },
            doIfNotExists() {
                setIsLoading(false);
                console.log(user.uid, "user have no private data");
                navigation.navigate("auth", { screen: "SignUpDetails" });
            }
        }).catch((error) => {
            console.error(error);
            setError(true);
            signOutDelayed();
        });
    }
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, handleUserAuth);
        return () => unsubscribe();
    }, []);

    useFocusEffect(() => {
        setIsLoading(true);
        setError(false);
        const user = getUser();
        handleUserAuth(user);
    })

    useEffect(() => {
        const timeoutDuration = 10000;
        const timer = setTimeout(() => {
            if (isLoading) {
                console.warn("login timeout");
                setError(true);
                signOutDelayed();
            }
        }, timeoutDuration);
        return () => clearTimeout(timer);
    }, [isLoading]);

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
            {!isShowError ? (
                <ActivityIndicator
                    color={COLORS.cartTitle}
                    size="large"
                    style={styles.spinner}
                />
            ) : (
                <Text style={styles.error}>We have a small problem, signing you out</Text>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
        alignContent:"center",
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
    error: {
        marginTop:16,
        marginHorizontal:'auto',
        alignSelf: 'center',
        fontSize:15,
        color: COLORS.cartTitle,
    }
});
