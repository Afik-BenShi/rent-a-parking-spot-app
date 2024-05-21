import { useEffect, useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Input } from '@rneui/themed';
import MoreIcon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './addProduct.style'
import { COLORS } from "../../assets/theme";

import DateTimePickerExample from "./DatePick";
import SingleSelectedDropDown from "./SingleSelectListDropDown";


const FillPersonalDetails = ({ sendDataToParent, sendStartDateToParent, sendEndDateToParent, sendCatToParent }) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date())
    const [imagePermissionsGranted, setImagePermissionsGranted] = useState(false);
    // const [showGoogleAutocomplete, setShowGoogleAutocomplete] = useState(true);

    const [endDateHasChanged, setEndDateHasChanged] = useState(false)
    const [startDateHasChanged, setStartDateHasChanged] = useState(false)
    const [valueInInvalidInput, setValueInInvalidInput] = useState(null);

    const [valid, setValid] = useState(false);

    const onStartDateChange = (selectedDate) => {
        // handle case that user selects start date after end date
        if (endDateHasChanged && selectedDate > endDate) {
            alert("Start date must be before end date, select availability dates again");
            setValid(false);
            setStartDate(selectedDate);

            sendStartDateToParent(selectedDate);
            sendEndDateToParent(selectedDate);
            return;
        }
        else if (!valid) {
            setStartDate(selectedDate);
            setValueInInvalidInput(selectedDate)

            sendStartDateToParent(selectedDate);
            sendEndDateToParent(selectedDate);
            setValid(true);
        }
        else {
            setValueInInvalidInput(null);
            setStartDate(selectedDate);
            sendStartDateToParent(selectedDate);
        }
    };

    const onEndDateChange = (selectedDate) => {
        setEndDate(selectedDate);
        setEndDateHasChanged(true);
        const end = endDate ? endDate.toLocaleString() : 'Not selected';
        console.log(end);

        //validateTimes(startDate, selectedDate);
        sendEndDateToParent(selectedDate);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('result', result)
        if (!result.cancelled) {
            sendDataToParent("imageUri", result.assets[0].uri)
        }
    };

    useEffect(() => {
        (async () => {
            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
            console.log('libraryStatus', libraryStatus)
            console.log('cameraStatus', cameraStatus)

            if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
                alert('Sorry, we need camera roll and media permissions to make this work!');
            }
            else {
                setImagePermissionsGranted(true)
            }
        })();
    }, [imagePermissionsGranted]);


    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <View style={styles.container}>


                <View style={styles.header}>
                    <Text style={styles.title}>Add your product here </Text>
                </View>
            </View>

            <ScrollView keyboardShouldPersistTaps='handled' >
                {/* listViewDisplayed={false} > */}
                <View>
                    <Input
                        label="Product name"
                        labelStyle={styles.inputLabel}
                        placeholder=" Enter product name"
                        onChangeText={(text) => sendDataToParent("productName", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />

                    <View style={{ flex: 1, padding: 20 }}>
                        <Text style={{ ...styles.inputLabel, marginLeft: 0 }}>Product category</Text>
                        <SingleSelectedDropDown
                            onSelectCategory={sendCatToParent}
                        />
                    </View>

                    <GooglePlacesAutocomplete
                        disableScroll={true}
                        placeholder="Enter your location"
                        minLength={3} // minimum length of text to search
                        fetchDetails={true}
                        returnKeyType={'default'}
                        // currentLocation={true}
                        onPress={(data, details = null) => {
                            console.log('GooglePlacesAutocomplete address:', details.geometry.location)
                            sendDataToParent("address", details.geometry.location)
                        }}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        // listEmptyComponent={() => (
                        //     <View style={{ flex: 1 }}>
                        //         <Text>No results were found</Text>
                        //     </View>
                        // )}
                        query={{
                            key: "AIzaSyDGMVgvnkeNr8urkP_YfBWStWKvWTbn4jk",
                            language: 'en', // language of the results
                        }}
                        styles={{
                            textInputContainer: styles.googleInputContainer,
                            textInput: styles.googleTextInput,
                            predefinedPlacesDescription: {
                                color: '#1faadb'
                            },
                        }}
                    />

                    <Input
                        label="Location"
                        labelStyle={styles.inputLabel}
                        leftIcon={<MoreIcon name="location-outline" size={18} />}
                        placeholder=" Enter your location"
                        onChangeText={(text) => sendDataToParent("city", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />

                    <Input
                        label="Daily Price rate"
                        labelStyle={styles.inputLabel}
                        leftIcon={<Entypo color="#000" name="price-tag" size={16} />}
                        placeholder=" Enter desired daily price"
                        keyboardType="phone-pad"
                        onChangeText={(text) => sendDataToParent("price", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />

                    <View style={styles.divider}>
                        <View style={styles.dividerInset} /></View>

                    <View>
                        <View>
                            <Text style={styles.sectionTitle}>Choose a range of available days </Text>
                        </View>
                    </View>

                    <View style={styles.dateView}>
                        <Text style={styles.datesLables}>  Start day : </Text>
                        <DateTimePickerExample minDate={new Date()} onDateChange={onStartDateChange} />
                    </View>
                    <Text> </Text>
                    <View style={styles.dateView}>
                        <Text style={styles.datesLables}>  End day : </Text>
                        <DateTimePickerExample minDate={startDate} onDateChange={onEndDateChange}
                            valueToDisplay={valueInInvalidInput} />
                    </View>

                    <Text> </Text>

                    <Input
                        //multiline
                        //numberOfLines={4}
                        label="Description"
                        labelStyle={styles.inputLabel}
                        //leftIcon={<AnotherIcon name="coins" size={18} />}
                        placeholder=" Enter product description"
                        onChangeText={(text) => sendDataToParent("productDescription", text)}
                        inputStyle={styles.inputControl}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                    />
                    <TouchableOpacity style={styles.uploadImgButton} onPress={pickImage}>
                        <Text style={styles.buttonText}>
                            {<MaterialIcons color={COLORS.similarToBlack} name="file-upload" size={15} />}
                            Upload image</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView >


    );
}

export default FillPersonalDetails;