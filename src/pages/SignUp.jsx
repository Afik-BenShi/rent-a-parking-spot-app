import React, { useCallback, useEffect, useState } from "react";
import { Card, Input, Text, Icon, Button } from "@rneui/themed";
import {
    View,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import useValidatedText, {
    validateRequiredFields,
} from "../customStates/useTextValidation";
import { COLORS } from "../../assets/theme";
import FeatherIcon from "react-native-vector-icons/Feather";
import { TooltipIcon } from "../components/TooltipIcon";
import { styles } from "./signUpAndLogin.styles";
import { debounce } from "../utils/utils";
import axios from "axios";
import config from "../backend/config";
import { AuthErrorCodes, getUser, signUpWithEmail } from "../auth/auth";

export function SignUpAuth({ navigation, route}) {
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

    const clearForm = async () => {
        email.setText("");
        password.setText("");
        setErrorMessage("");
        setIsLoading(false);
    };
    useEffect(()=> {
        return navigation.addListener('focus', clearForm)
    }, [navigation]);

    const authSignUpHandler = async () => {
        const isValid = validateRequiredFields(email, password);
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
    const [addressDetails, setAddressDetails] = useState({
        city: "",
        streetAndNumber: "",
    });
    const [coord, setCoord] = useState({ lat: "", lon: "" });
    const addressNotes = useValidatedText("", /^[\w ]*$/);
    const [showAddressError, setAddressShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [signUpError, setSignUpError] = useState("");
    const [addressKey, setAddressKey] = useState(0);
    
    const clearForm = () => {
        fullName.setText("");
        phoneNumber.setText("");
        addressNotes.setText("");
        setIsLoading(false);
        setSignUpError("");
        setCoord({ lat: "", lon: "" });
        setAddressDetails({ city: "", streetAndNumber: "" });
        setAddressKey((current) => current + 1);
    };
    useEffect(()=> {
        return navigation.addListener('focus', clearForm)
    }, [navigation]);
    const coordSelectedHandler = ({ lat, lon }, newAddressDetails) => {
        setCoord({ lat, lon });
        setAddressDetails(newAddressDetails);
        setAddressShow(false);
    };
    const addressEditHandler = () => {
        setCoord({ lat: "", lon: "" });
        setAddressDetails({ city: "", streetAndNumber: "" });
    };

    const detailsSignUpHandler = async () => {
        setIsLoading(true);
        const token = getUser()?.getIdToken();
        const isValid =
            validateRequiredFields(fullName, phoneNumber, addressNotes) &&
            coord.lat &&
            coord.lon &&
            addressDetails.city &&
            addressDetails.streetAndNumber;
        if (!isValid) {
            setIsLoading(false);
            return;
        }
        try {
            const result = await axios
                .post(
                    `http:/${config.serverIp}:${config.port}/users/upsert`,
                    {
                        fullName: fullName.text,
                        phoneNumber: phoneNumber.text,
                        coordinates: coord,
                        city: addressDetails.city,
                        street: addressDetails.streetAndNumber,
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
            <ScrollView style={{ marginTop: 24, flex: 1 }}>
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
                <Card.Title style={styles.sections}>Address</Card.Title>
                <Card.Divider />
                <AddressSuggestionsBox
                    onChooseSuggestion={coordSelectedHandler}
                    onEdit={addressEditHandler}
                    disabled={isLoading}
                    key={addressKey}
                />
                {showAddressError && (
                    <Text style={styles.failText}>
                        Please insert and select a valid address
                    </Text>
                )}
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

function AddressSuggestionsBox({
    onChooseSuggestion,
    onEdit,
    disabled = false,
}) {
    const [isShow, setIsShow] = useState(false);
    const city = useValidatedText("", /^[\w\ ]+$/, "Invalid city");
    const streetAndNumber = useValidatedText(
        "",
        /^[\w\ ]+$/,
        "Invalid street address"
    );
    const [suggestions, setSuggestions] = useState([
        { label: "loading...", value: null },
    ]);

    const findAddress = useCallback(async ({ city, street }) => {
        const suggestions = await axios
            .get(`http://${config.serverIp}:${config.port}/location/geocode`, {
                params: { q: `${city} ${street}` },
            })
            .then(({ data }) =>
                data.map(({ display_name, ...value }) => ({
                    label: display_name,
                    value,
                }))
            )
            .catch((_) => [{ label: "address not found", value: null }]);
        if (suggestions.length === 0) {
            return [{ label: "address not found", value: null }];
        }
        return suggestions;
    }, []);

    const debouncedFindAddress = useCallback(
        debounce(async (details) => {
            const newSuggestions = await findAddress(details);
            setSuggestions(newSuggestions);
        }, 1500),
        []
    );

    const pressSuggestion = (suggestion) => {
        if (!suggestion.value) return;
        setIsShow(false);
        onChooseSuggestion(suggestion.value, {
            city: city.text,
            streetAndNumber: streetAndNumber.text,
        });
    };

    const detailsChange = () => {
        setSuggestions([{ label: "loading...", value: null }]);
        const cityInserted = city.isValid && city.text.length > 3;
        const streetInserted =
            streetAndNumber.isValid && streetAndNumber.text.length > 3;
        if (!cityInserted || !streetInserted) {
            setIsShow(false);
            return;
        }
        setIsShow(true);
        debouncedFindAddress({ city: city.text, street: streetAndNumber.text });
        onEdit();
    };
    return (
        <>
            <Input
                inputContainerStyle={styles.input}
                label="City"
                leftIcon={
                    <Icon
                        size={18}
                        type="material-community"
                        name="city-variant-outline"
                    />
                }
                value={city.text}
                errorMessage={city.errorMessage}
                disabled={disabled}
                onEndEditing={() => {
                    city.validate();
                    detailsChange();
                }}
                onChangeText={(text) => {
                    city.setText(text);
                    city.validate();
                    detailsChange();
                }}
            />
            <Input
                inputContainerStyle={styles.input}
                leftIcon={<FeatherIcon size={16} name="map-pin" />}
                label="Street and number"
                disabled={disabled}
                value={streetAndNumber.text}
                errorMessage={streetAndNumber.errorMessage}
                onEndEditing={() => {
                    streetAndNumber.validate();
                    detailsChange();
                }}
                onChangeText={(text) => {
                    streetAndNumber.setText(text);
                    streetAndNumber.validate();
                    detailsChange();
                }}
            />
            {isShow && !disabled && (
                <View style={moreStyles.container}>
                    <Text style={moreStyles.label}>Please choose one</Text>
                    {suggestions.map(({ label, value }) => (
                        <TouchableOpacity
                            style={moreStyles.suggestion}
                            key={label}
                            onPress={() => pressSuggestion({ label, value })}
                        >
                            <Text>{label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </>
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
