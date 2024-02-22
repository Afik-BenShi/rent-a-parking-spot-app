import React from "react";
import { Card, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/ownerDetails";
import { AvailabilityBox } from "../components/availabilityBox";
import "./productDetailsPage.types";
import GoogleMaps from "../components/GoogleMaps";
import ExpandableImage from "../components/ExpandableImage";
import { COLORS } from "../../assets/theme";
import { ContactButtons } from "../components/contactButtons";

/**
 *  @type {React.FC}
 *  @param {ProductDetailsPageProps} Props
 */
export default function ProductDetailsPage({ route, navigation }) {
    const details = parseItem(route.params);

    const productImage = details.image
        ? { uri: details.image }
        // @ts-ignore
        : require("../../assets/parking-details-images/littleBlackDress.jpg");

    const contactMessage = `Hi I'm texting you about the ${details.title} you offered on RentalWize, Is it still available?`;

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
            <View style={styles.actionBarContainer}>
                <Text
                    h3
                    style={styles.actionText}
                >{`Rent for ${details.price.amount}${details.price.currency}/${details.price.duration}`}</Text>
                <ContactButtons
                    phoneNumber={details.owner.phoneNumber}
                    text={contactMessage}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: "relative",
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
        marginBottom: 7,
        fontSize: 16,
    },
    actionText: {
        color: COLORS.lightWhite,
    },
    actionBarContainer: {
        flexDirection:"row",
        position: "absolute",
        alignItems: "center",
        justifyContent: "space-around",
        bottom: 0,
        width: "100%",
        height: 120,
        backgroundColor: COLORS.btnBlue,
    },
    map: {
        marginTop: 12,
        height: 200,
        width: "auto",
    },
});

// TODO use consistent data instead of parsing
/** @returns {ProductDetails} */
function parseItem({details:item}){
    const { id, name, price, startDate, endDate, details, owner, city, distanceFromMe, img } = item;
    return Object.assign(mock, {
        id,
        title:name,
        description:details,
        availability:{
            startTime: new Date(startDate),
            endTime: new Date(endDate),
        },
        image:img,
        price: Object.assign(mock.price,{ amount:price }),
        owner: Object.assign(mock.owner, { name:owner }),
    });
}

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
        phoneNumber: "972522708541",
    },
    availability: {
        startTime: new Date("2024-02-14T10:00"),
        endTime: new Date("2024-02-17T18:00"),
    },
};
