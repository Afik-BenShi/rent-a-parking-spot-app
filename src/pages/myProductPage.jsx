import React, { useState } from "react";
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
                <ReservationTable
                    dateRangeList={mockReservations.next}
                    heading="Next reservations"
                />
                <ReservationTable
                    dateRangeList={mockReservations.prev}
                    heading="Previous reservations"
                />
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

const mockReservations = {
    next: [
        {id:"1", startTime: new Date('2026-08-12T15:45:00Z'), endTime: new Date('2026-09-05T12:00:00Z')},
        {id:"2", startTime: new Date('2027-11-08T08:30:00Z'), endTime: new Date('2027-11-25T18:20:00Z')},
        {id:"3", startTime: new Date('2025-03-25T10:15:00Z'), endTime: new Date('2025-04-10T20:30:00Z')},
    ],
    prev: [
        {id:"4", startTime: new Date('2022-05-10T08:00:00Z'), endTime: new Date('2022-06-01T16:20:00Z')},
        {id:"5", startTime: new Date('2023-08-15T12:30:00Z'), endTime:new Date('2023-09-02T18:45:00Z')},
        {id:"6", startTime: new Date('2021-11-20T14:45:00Z'), endTime: new Date('2021-12-05T22:10:00Z')},
        {id:"7", startTime: new Date('2023-9-06T14:45:00Z'), endTime: new Date('2023-9-06T22:12:00Z')},
    ],
};
