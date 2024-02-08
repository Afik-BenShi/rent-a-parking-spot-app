import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, Card, Image, Text } from "@rneui/themed";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/ownerDetails";
import { AvailabilityBox } from "../components/availabilityBox";
import { dateRangeFormat } from "../utils/dateTime";
import "./parkingDetailsPage.types";

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} Props
 */
export default function ParkingDetailsPage({ route, navigation }) {
    const { details = mock, onReserveParking = (r) => {} } = route.params;

    const parkingImage = details.parkingImage
        ? { uri: details.parkingImage }
        : //@ts-expect-error
          require("../../assets/parking-details-images/parkingImagePlaceholder.png");

    const parkingReserveHandler = () => {
        console.log("reserved!");
    }
    return (
        <SafeAreaView style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollable}>
                <Text h3 style={styles.text}>
                    Parking - {details.location.address}
                </Text>
                <Card.Divider />
                <OwnerDetailsBar owner={details.owner} />
                <Image style={styles.image} source={parkingImage} />
                <Text h4 style={styles.text}>
                    Availavility
                </Text>
                <AvailabilityBox availability={details.availability} />
            </ScrollView>
            <Button
                title={"Start Parking"}
                titleStyle={{fontSize:30}}
                buttonStyle={styles.parkBtn}
                containerStyle={styles.parkBtnContainer}
                onPress={parkingReserveHandler}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: "relative",
        borderWidth: 1,
        borderColor: "#000",
    },
    scrollable: {
        paddingTop: 12,
        gap: 6,
    },
    image: {
        height: 200,
        width: "auto",
    },
    text: { paddingHorizontal: 12 },
    parkBtn: {
        height: "100%",
        borderRadius: 0,
    },
    parkBtnContainer: {
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "10%",
        borderRadius: 0,
    },
});

/**@type {ParkingDetails} */
const mock = {
    id: "1",
    location: {
        latitude: "32.077890",
        longitude: "34.774304",
        address: "Dizengoff square",
    },
    owner: {
        id: "2",
        name: "Anna Zak",
        phoneNumber: "052-5381648",
    },
    availability: {
        startTime: new Date("2024-02-14T10:00"),
        endTime: new Date("2024-02-17T18:00"),
    },
};
