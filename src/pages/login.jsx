import React, { useState } from "react";
import { Card, Input, Button, Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import useValidatedText from "../customStates/useTextValidation";
import { signInWithEmail } from "../auth/auth";
import { COLORS } from "../../assets/theme";
import { moreStyles } from "./user";
import inputStyle from "../components/addProduct.style";

export function LoginPage({ navigation }) {
    const email = useValidatedText("", /\w\@\w.\w/);
    const password = useValidatedText("");
    const [isFailedLogin, setLoginFailed] = useState(false);

    const doLogin = async () => {
        if (!email.isValid || !password.isValid) {
            return;
        }
        const login = await signInWithEmail(email.text, password.text);
        if (login) {
            setLoginFailed(false);
            navigation.navigate("userProfile");
        } else {
            setLoginFailed(true);
        }
    };

    return (
        <Card containerStyle={moreStyles.profile}>
            <Card.Title style={moreStyles.profileName}>Login</Card.Title>
            <Card.Divider />
            <View>
                <Input
                    inputStyle={styles.input}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    label="Email"
                    errorMessage={email.errorMessage}
                    onEndEditing={email.validate}
                    onChangeText={email.setText}
                />
                <Input
                    inputStyle={styles.input}
                    inputContainerStyle={{ borderBottomWidth: 0 }}
                    label="Password"
                    errorMessage={password.errorMessage}
                    onEndEditing={password.validate}
                    onChangeText={password.setText}
                    secureTextEntry={true}
                />
                {isFailedLogin ? (
                    <Text style={styles.failText}>
                        Incorrect email or password.
                    </Text>
                ) : (
                    <></>
                )}
                <Button
                    buttonStyle={moreStyles.profileAction}
                    titleStyle={moreStyles.profileActionText}
                    onPress={doLogin}
                >
                    Log In
                </Button>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    failText: {
        ...moreStyles.profileHandle,
        marginTop: 6,
        marginLeft:12,
        fontSize:15,
        fontWeight:"900",
        color: COLORS.red,
    },
    input: {
        height: 44,
        backgroundColor: "#f3eff6", // grey color good
        paddingHorizontal: 25,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
    },
});
