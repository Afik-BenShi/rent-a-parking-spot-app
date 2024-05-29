import React, { useCallback, useEffect, useState } from "react";
import { Card, Input, Text, Icon, Button, CheckBox } from "@rneui/themed";
import {
    View,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Pressable,
    Linking,
} from "react-native";
import useValidatedText, {
    validateRequiredFields,
} from "../customStates/useTextValidation";
import { COLORS } from "../../assets/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
import { TooltipIcon } from "../components/TooltipIcon";
import { styles } from "./signUpAndLogin.styles";
import axios from "axios";
import {serverPath} from '../../backend.config.json';
import { AuthErrorCodes, getUser, signUpWithEmail } from "../auth/auth";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export function SignUpAuth({ navigation, route }) {
    const email = useValidatedText(
        "",
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email"
    );
    const password = useValidatedText("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    password.defineCustomValidation(
        useCallback((password, reject) => {
            if (password.length < 8) {
                reject("Password must be at least 8 characters long");
                return;
            } else if (!password.match(/\d/)) {
                reject("Password must have at least 1 digit");
                return;
            } else if (!password.match(/[a-z]/)) {
                reject("Password must have at least 1 lower case letter");
                return;
            } else if (!password.match(/[A-Z]/)) {
                reject("Password must have at least 1 capital letter");
                return;
            }
        }, [])
    );
    const [isAcceptPrivacy, setAcceptPrivacy] = useState(false);

    const clearForm = async () => {
        email.setText("");
        password.setText("");
        setErrorMessage("");
        setIsLoading(false);
    };
    useEffect(() => {
        return navigation.addListener('focus', clearForm)
    }, [navigation]);

    const authSignUpHandler = async () => {
        const isValid = validateRequiredFields(email, password);
        if (!isAcceptPrivacy){
            setErrorMessage("You must acccept our policies to use the app");
            return;
        }
        console.log(isValid)
        if (!isValid) {
            setErrorMessage("");
            return;
        }
        try {
            setIsLoading(true);
            const user = await signUpWithEmail(email.text, password.text);
            if (user) {
                setErrorMessage("");
                clearForm();
                navigation.navigate("SignUpDetails");
            }
        } catch (error) {
            if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
                setErrorMessage("Email already in use");
            } else {
                setErrorMessage(
                    "There was an error on our side, please try again shortly"
                );
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <SafeAreaView style={styles.signUpContainer}>
            <ScrollView style={{ marginTop: 24, flex: 1 }}>
                <Card.Title style={styles.sections}>Login data</Card.Title>
                <Card.Divider />
                <Input
                    inputContainerStyle={styles.input}
                    label="Email"
                    leftIcon={<FeatherIcon size={16} name="at-sign" />}
                    errorMessage={email.errorMessage}
                    errorStyle={styles.failText}
                    onEndEditing={email.validate}
                    onChangeText={email.setText}
                    disabled={isLoading}
                />
                <Input
                    inputContainerStyle={styles.input}
                    errorStyle={styles.failText}
                    label="Password"
                    leftIcon={<FeatherIcon size={16} name="lock" />}
                    rightIcon={
                        <TooltipIcon
                            popover={
                                <Text>
                                    Password must be at least 8 characters long
                                    and include numbers, lower and higher case
                                    letters
                                </Text>
                            }
                            tooltipBGColor={COLORS.lightgrey}
                            tooltipStyle={styles.tooltip}
                            iconSize={16}
                        />
                    }
                    errorMessage={password.errorMessage}
                    onEndEditing={password.validate}
                    onChangeText={password.setText}
                    disabled={isLoading}
                    secureTextEntry={true}
                />
                <View style={{gap:-100, alignSelf:'center'}}>
                <CheckBox 
                title="I accept the terms and conditions and the privacy policy"
                checked={isAcceptPrivacy}
                onPress={()=> setAcceptPrivacy(v => !v)}
                wrapperStyle={{marginBottom:0, paddingBottom:0}}
                containerStyle={{marginBottom:0, paddingBottom:0}}
                textStyle={styles.text}
                />
                <View style={{flexDirection:"row", gap:6, alignSelf:'center'}}>
                    <Pressable onPress={()=> Linking.openURL('https://afiks2.wixstudio.io/rentalwize/terms')}>
                        <Text style={styles.link}>Terms and Conditions</Text>
                    </Pressable>
                    <Pressable onPress={()=> Linking.openURL('https://afiks2.wixstudio.io/rentalwize/privacy')}>
                        <Text style={styles.link}>Privacy Policy</Text>
                    </Pressable>
                </View>
                </View>
                {errorMessage ? (
                    <Text style={styles.failText}>{errorMessage}</Text>
                ) : (
                    <></>
                )}
                <Button
                    disabled={isLoading}
                    buttonStyle={styles.actionButtons}
                    titleStyle={styles.profileActionText}
                    loading={isLoading}
                    onPress={authSignUpHandler}
                >
                    Next
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

export function SignUpDetails({ navigation }) {
    const fullName = useValidatedText(
        "",
        /^[a-zA-z]{1}[a-zA-z ]{1,}$/,
        "Please Insert your full name"
    );
    const phoneNumber = useValidatedText(
        "",
        /^05[\d]{8}$/,
        "Invalid phone number"
    );
    const [address, setAddress] = useState(null)
    const addressNotes = useValidatedText("", /^[\w ]*$/);
    const [isLoading, setIsLoading] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [addressKey, setAddressKey] = useState(0);
    const [userToken, setToken] = useState('');
    useEffect(()=> {(async () => {
        setToken(await getUser().getIdToken());
    })()});
    
    const clearForm = () => {
        fullName.setText("");
        phoneNumber.setText("");
        addressNotes.setText("");
        setIsLoading(false);
        setSignUpError("");
        setAddress(null)
        setAddressKey((current) => current + 1);
    };
    useEffect(() => {
        return navigation.addListener('focus', clearForm)
    }, [navigation]);

    const detailsSignUpHandler = async () => {
        setIsLoading(true);
        const token = getUser()?.getIdToken();
        const isValid = validateRequiredFields(fullName, phoneNumber, addressNotes)
        if (!address) {
            setSignUpError('Please insert your location');
            setIsLoading(false);
            return;
        }
        if (!isValid) {
            setIsLoading(false);
            return;
        }
        try {
            const result = await axios
                .post(
                    serverPath + `/users/upsert`,
                    {
                        fullName: fullName.text,
                        phoneNumber: phoneNumber.text,
                        address,
                        addressNotes: addressNotes.text,
                    },
                    { headers: { Authorization: await token } }
                )
                .then(({ data }) => data);
            if (result.error) {
                throw result.error;
            }
        } catch (error) {
            setSignUpError(`${error.message}`);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        navigation.navigate("main");
    };

    return (
        <SafeAreaView style={styles.signUpContainer}>
            <ScrollView style={{ marginTop: 24, flex: 1 }} keyboardShouldPersistTaps='handled' >
                <Card.Title style={styles.sections}>Basic Info</Card.Title>
                <Card.Divider />
                <Input
                    inputContainerStyle={styles.input}
                    label="Full Name"
                    leftIcon={<FeatherIcon size={16} name="user" />}
                    value={fullName.text}
                    errorMessage={fullName.errorMessage}
                    onEndEditing={fullName.validate}
                    onChangeText={fullName.setText}
                    disabled={isLoading}
                />
                <Input
                    inputContainerStyle={styles.input}
                    label="Phone Number"
                    leftIcon={<FeatherIcon size={16} name="phone" />}
                    rightIcon={
                        <TooltipIcon
                            popover={
                                <Text>
                                    Phone number will be visible to other users
                                    in order to contact you
                                </Text>
                            }
                            tooltipBGColor={COLORS.lightgrey}
                            tooltipStyle={styles.tooltip}
                            iconSize={16}
                        />
                    }
                    value={phoneNumber.text}
                    errorMessage={phoneNumber.errorMessage}
                    onEndEditing={phoneNumber.validate}
                    onChangeText={phoneNumber.setText}
                    disabled={isLoading}
                />

                <View style={{ flex: 1, padding: 20 }}>
                    <Text style={{ ...styles.inputLabel, marginLeft: 0 }}>Location</Text>

                    <GooglePlacesAutocomplete
                        key={addressKey}
                        disableScroll={true}
                        placeholder="Enter your location"
                        minLength={3} // minimum length of text to search
                        fetchDetails={true}
                        returnKeyType={'default'}
                        onPress={(data, details = null) => {
                            console.log('GooglePlacesAutocomplete address:', details.geometry.location)
                            setAddress(details.geometry.location)
                        }}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        requestUrl={{
                            url: serverPath,
                            useOnPlatform: 'all',
                            headers: {Authorization: userToken},

                        }}
                        query={{
                            key: "",
                            language: 'en',
                        }}
                        styles={{
                            textInputContainer: styles.googleInputContainer,
                            textInput: styles.googleTextInput,
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                        }}
                    />
                </View>

                <Input
                    inputContainerStyle={styles.input}
                    label="More address details"
                    rightIcon={
                        <TooltipIcon
                            popover={<Text>Floor, apartment number, etc.</Text>}
                            tooltipBGColor={COLORS.lightgrey}
                            tooltipStyle={styles.tooltip}
                            iconSize={16}
                        />
                    }
                    value={addressNotes.text}
                    errorMessage={addressNotes.errorMessage}
                    onEndEditing={addressNotes.validate}
                    onChangeText={addressNotes.setText}
                    disabled={isLoading}
                />

                {!!signUpError && (
                    <Text style={styles.failText}>{signUpError}</Text>
                )}
                <Button
                    buttonStyle={styles.actionButtons}
                    titleStyle={styles.profileActionText}
                    onPress={detailsSignUpHandler}
                    disabled={isLoading}
                    loading={isLoading}
                >
                    Sign up
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
}

const moreStyles = StyleSheet.create({
    container: {
        gap: 2,
        padding: 0,
        alignItems: "center",
        borderRadius: 12,
        borderColor: COLORS.grey2,
        overflow: "hidden",
        marginHorizontal: 6,
        marginTop: -15,
        marginBottom: 24,
    },
    suggestion: {
        width: "100%",
        margin: 0,
        backgroundColor: COLORS.inputTextGrey,
        padding: 12,
        borderRadius: 12,
    },
    label: {
        fontSize: 16,
        color: "#86939e",
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginStart: 6,
    },
});
