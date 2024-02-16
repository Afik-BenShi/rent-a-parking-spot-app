import React from "react";
import { Card, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import ExpandableImage from "../components/ExpandableImage";
import "./productDetailsPage.types";
import ReservationTable from "../components/ReservationsTable";


export default function MyProductPage({ route, navigation }) {
    /** @type {{details: ProductDetails}} */
    const { details = mock } = route.params;

    const productImage = details.image
        ? { uri: details.image }
        : // @ts-ignore
          require("../../assets/parking-details-images/littleBlackDress.jpg");

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
                <ReservationTable />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        position: "relative",
    },
    scrollable: {
        paddingVertical: 12,
        gap: 6,
        overflow: "scroll",
    },
    text: { paddingHorizontal: 12 },
    description: {
        paddingHorizontal: 12,
        marginBottom: 7,
        fontSize: 16,
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
        phoneNumber: "972522708541",
    },
    availability: {
        startTime: new Date("2024-02-14T10:00"),
        endTime: new Date("2024-02-17T18:00"),
    },
};
