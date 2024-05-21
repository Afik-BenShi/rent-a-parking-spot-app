import React, { useEffect, useState } from "react";
import { Card, Input, Button, Text } from "@rneui/themed";
import { View, SafeAreaView, Pressable } from "react-native";
import useValidatedText from "../customStates/useTextValidation";
import { signInWithEmail } from "../auth/auth";
import FeatherIcon from "react-native-vector-icons/Feather";
import { styles } from "./signUpAndLogin.styles";
import { getAuth } from "firebase/auth";
import LoadingPage from "./LoadingPage";

export function LoginPage({ navigation, route }) {
    const email = useValidatedText(
        "",
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email"
    );
    const password = useValidatedText("");
    const [isFailedLogin, setLoginFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const {redirect} = route?.params?? {};
    useEffect(() => {
        if (redirect) {
            navigation.replace(redirect);
        }
    }, [route]);

    const doLogin = async () => {
        if (!email.isValid || !password.isValid) {
            return;
        }
        setIsLoading(true);
        const login = await signInWithEmail(email.text, password.text);
        if (login) {
            setLoginFailed(false);
            navigation.navigate('loading');
        } else {
            setLoginFailed(true);
        }
        setIsLoading(false);
    };
    if (redirect) {
        return <LoadingPage navigation={navigation} />
    }
    return (
        <SafeAreaView style={styles.loginContainer}>
            <Card containerStyle={styles.profile}>
                <Card.Title style={styles.profileName}>Login</Card.Title>
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
                    <Input
                        inputContainerStyle={styles.input}
                        label="Password"
                        leftIcon={<FeatherIcon name="lock" />}
                        errorMessage={password.errorMessage}
                        onEndEditing={password.validate}
                        onChangeText={password.setText}
                        secureTextEntry={true}
                        disabled={isLoading}
                    />
                    {isFailedLogin && (
                        <Text style={styles.failText}>
                            Incorrect email or password.
                        </Text>
                    )}
                    <Button
                        buttonStyle={styles.actionButtons}
                        titleStyle={styles.profileActionText}
                        onPress={doLogin}
                        disabled={isLoading}
                        loading={isLoading}
                    >
                        Log In
                    </Button>
                    <Pressable
                        style={{ alignItems: "center" }}
                        onPress={() => navigation.navigate("SignUp")}
                    >
                        <Text style={styles.link}>Sign up to RentalWize</Text>
                    </Pressable>
                </View>
            </Card>
        </SafeAreaView>
    );
}
