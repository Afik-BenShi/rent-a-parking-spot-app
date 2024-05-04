import React, { useState } from "react";
import {Card, Input, Button} from '@rneui/themed';
import { View } from "react-native";
import useValidatedText from "../customStates/useTextValidation";
import { signInWithEmail } from "../auth/auth";

export function LoginPage({navigation}) {
    const email = useValidatedText('', /\w\@\w.\w/);
    const password = useValidatedText('');

    const doLogin = async () => {
        if (!email.isValid || !password.isValid){
            return;
        }
        const login = await signInWithEmail(email.text, password.text);
        console.log(login);
    }

    return (
        <Card>
            <Card.Title>Login</Card.Title>
            <Card.Divider/>
            <View>
                <Input 
                    label='Email'
                    errorMessage={email.errorMessage}
                    onEndEditing={email.validate}
                    onChangeText={email.setText}
                />
                <Input 
                    label='Password'
                    errorMessage={password.errorMessage}
                    onEndEditing={password.validate}
                    onChangeText={password.setText}
                />
                <Button onPress={doLogin}>Log In</Button>
            </View>
        </Card>
    )
}