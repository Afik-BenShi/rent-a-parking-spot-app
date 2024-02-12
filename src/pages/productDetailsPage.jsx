import React from "react";
import { Button, Card, Image, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/ownerDetails";
import { AvailabilityBox } from "../components/availabilityBox";
import "./productDetailsPage.types";
import GoogleMaps from "../components/GoogleMaps";

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} Props
 */
export default function ProductDetailsPage({ route, navigation }) {
    const { details = mock, onReserveParking = (_) => {} } = route.params;

    const parkingImage = details.image
        ? { uri: details.image }
        : //@ts-expect-error
          require("../../assets/parking-details-images/littleBlackDress.png");

    const parkingReserveHandler = () => {
        /** @type {ProductReservation} */
        const reservation = {
            id: "1",
            title: details.title,
            parkingId: details.id,
            scheduling: {
                startTime: new Date(),
            },
            reservingUser: {
                id: "4",
                name: "Yonatan Mergui",
                phoneNumber: "050-1112222",
                carPlate: "989-27-864",
            },
        };
        onReserveParking(reservation);
        alert(`reserved! ${JSON.stringify(reservation, undefined, 2)}`);
    };
    return (
        <View style={styles.pageContainer}>
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
                <GoogleMaps
                    location={details.location}
                    style={styles.map}
                    movable
                />
            </ScrollView>
            <Button
                title={`Start Renting for ${details.price.amount} ${details.price.currency}/${details.price.duration}`}
                titleStyle={{ fontSize: 30 }}
                buttonStyle={styles.parkBtn}
                containerStyle={styles.parkBtnContainer}
                onPress={parkingReserveHandler}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: "relative",
        // borderWidth: 1,
        // borderColor: "#000",
    },
    scrollable: {
        paddingTop: 12,
        gap: 6,
        overflow: "scroll",
        paddingBottom: 144,
    },
    image: {
        height: 200,
        width: "auto",
    },
    text: { paddingHorizontal: 12 },
    parkBtn: {
        height: "100%",
        borderRadius: 0,
        paddingBottom: 36,
    },
    parkBtnContainer: {
        alignSelf: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: 120,
        borderRadius: 0,
    },
    map: {
        marginTop: 12,
        height: 200,
        width: "auto",
    },
});

/**@type {ProductDetails} */
const mock = {
    id: "1",
    title: "Little black dress",
    description:
        "Every girl needs a little black dress. If you don't like yours, you can have mine for a night",
    price: {
        amount: 10,
        currency: "$",
        duration: "day",
    },
    location: {
        latitude: 32.07789,
        longitude: 34.774304,
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
