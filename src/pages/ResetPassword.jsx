import React, { useState } from "react";
import { Card, Input, Button, Text } from "@rneui/themed";
import { View, SafeAreaView, Pressable } from "react-native";
import useValidatedText from "../customStates/useTextValidation";
import FeatherIcon from "react-native-vector-icons/Feather";
import { styles } from "./signUpAndLogin.styles";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { COLORS } from "../../assets/theme";

export function ResetPassword({ navigation, route }) {
    const email = useValidatedText(
        "",
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email"
    );
    const [isFailedReset, setResetFailed] = useState(false);
    const [isResetSuccess, setResetSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const doResetPassword = async () => {
        if (!email.isValid) {
            return;
        }
        setIsLoading(true);
        const auth = getAuth();
        try{
            await sendPasswordResetEmail(auth, email.text);
            setResetFailed(false);
            setResetSuccess(true);
        } catch(e) {
            console.error(e);
            setResetFailed(true);
            setResetSuccess(false);
        }
        setIsLoading(false);
    };
    return (
        <SafeAreaView style={styles.loginContainer}>
            <Card containerStyle={styles.profile}>
                <Card.Title style={styles.profileName}>Reset your password</Card.Title>
                <Card.Divider />
                <View>
                    <Input
                        inputContainerStyle={styles.input}
                        label="Email"
                        leftIcon={<FeatherIcon name="at-sign" />}
                        errorMessage={email.errorMessage}
                        onEndEditing={email.validate}
                        onChangeText={email.setText}
                        disabled={isLoading}
                    />
                    {isFailedReset && (
                        <Text style={styles.failText}>
                            We had an error, please try again later
                        </Text>
                    )}
                    {isResetSuccess && (
                        <Text style={{...styles.failText, color:COLORS.cartTitle}}>
                            Reset email will be sent to you in a few minutes
                        </Text>
                    )}
                    <Button
                        buttonStyle={styles.actionButtons}
                        titleStyle={styles.profileActionText}
                        onPress={doResetPassword}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Send reset link
                    </Button>
                    <Pressable
                        style={{ alignItems: "center" }}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.link}>Sign up to RentalWize</Text>
                    </Pressable>
                    <Pressable
                        style={{ alignItems: "center" }}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.link}>Back to log in</Text>
                    </Pressable>
                </View>
            </Card>
        </SafeAreaView>
    );
}
