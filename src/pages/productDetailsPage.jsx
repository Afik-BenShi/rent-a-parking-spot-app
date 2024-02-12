import React from "react";
import { Button, Card, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/ownerDetails";
import { AvailabilityBox } from "../components/availabilityBox";
import "./productDetailsPage.types";
import GoogleMaps from "../components/GoogleMaps";
import ExpandableImage from "../components/ExpandableImage";

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} Props
 */
export default function ProductDetailsPage({ route, navigation }) {
    const { details = mock, onReserveParking = (_) => {} } = route.params;

    const productImage = details.image
        ? { uri: details.image }
        : //@ts-expect-error
          require("../../assets/parking-details-images/littleBlackDress.jpg");

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
                    {details.title}
                </Text>
                <Card.Divider />
                <Text style={styles.description}>{details.description}</Text>
                <ExpandableImage source={productImage} initialHeight={200} />
                <OwnerDetailsBar owner={details.owner} />
                <Text h4 style={styles.text}>
                    Availavility
                </Text>
                <AvailabilityBox availability={details.availability} />
                <Text h4 style={styles.text}>
                    Address
                </Text>
                <GoogleMaps
                    location={details.location}
                    style={styles.map}
                    movable
                />
            </ScrollView>
            <Button
                title={`Start Renting for ${details.price.amount}${details.price.currency}/${details.price.duration}`}
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
    text: { paddingHorizontal: 12 },
    description: {
        paddingHorizontal: 12,
        marginBottom:7,
        fontSize: 16,
    },
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
    title: "Little Black Dress",
    description:
        "Every girl needs a little black dress. But if you don't have one, rent have mine for a night",
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
