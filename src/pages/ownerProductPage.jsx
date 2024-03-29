import React, { useState, useEffect } from "react";
import axios from "axios";
import { TouchableOpacity, ScrollView, StyleSheet, View } from "react-native";
import { Card, Text } from "@rneui/themed";

import config from "../backend/config";

import { COLORS } from "../../assets/theme";
import ExpandableImage from "../components/ExpandableImage";
import ReservationTable from "../components/ReservationsTable";
import { EditableText } from "../components/editableComponents";
import AddOrder from "../components/addOrder";

import "./productDetailsPage.types";
import { timeStampToDate } from "../utils/dateTime";

const SERVER = `http://${config.serverIp}:${config.port}`;
export default function OwnerProductPage({ route, navigation }) {
    /** @type {ProductDetails} */
    const details = parseItem(route.params);
    const [editMode, setEditMode] = useState(false);
    const [rsvs, setRsvs] = useState({ past: [], next: [] });
    const [userId, setUserId] = useState(route.params.userId);
    const editClickHandler = () => {
        setEditMode((edit) => !edit);
    };
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {details.title}
                </Text>
            ),
            headerRight: () => (
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={editClickHandler}
                >
                    <Text style={{ color: COLORS.btnBlue, fontSize: 16 }}>
                        {editMode ? "Done" : "Edit"}
                    </Text>
                </TouchableOpacity>
            ),
        });
    }, [editMode, navigation]);

    const updateReservations = () => {
        axios
            .get(SERVER + `/orders/owner/${userId}?time=all&productId=${details.id}`)
            .then(({ data }) => {
                const rsvTemplate = { next: [], past: [] };
                const newRsvs = data.reduce(responseParser, rsvTemplate);
                setRsvs(newRsvs);
            });
    }
    useEffect(updateReservations, [userId]);

    const productImage = details.image
        ? { uri: details.image }
        : // @ts-ignore
          require("../../assets/parking-details-images/placeholder.png");

    const contactMessage = `Hi I'm texting you about the ${details.title} you offered on RentalWize, Is it still available?`;

    return (
        <View style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollable}>
                <EditableText
                    h3
                    editMode={editMode}
                    textStyle={styles.text}
                    onChange={() => {}}
                >
                    {details.title}
                </EditableText>
                <Card.Divider />
                <EditableText
                    textStyle={styles.description}
                    editMode={editMode}
                    onChange={() => {}}
                >
                    {details.description}
                </EditableText>
                <ExpandableImage source={productImage} initialHeight={200} />
                <AddOrder
                    userId={userId}
                    productId={details.id}
                    onSuccess={updateReservations}
                />
                <ReservationTable
                    editMode={editMode}
                    reservations={rsvs.next}
                    heading="Next reservations"
                />
                <ReservationTable
                    editMode={false}
                    reservations={rsvs.past}
                    heading="Previous reservations"
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        position: "relative",
        flex: 1,
    },
    scrollable: {
        paddingVertical: 12,
        gap: 6,
        overflow: "scroll",
    },
    editButton: {},
    text: { paddingHorizontal: 12 },
    description: {
        paddingHorizontal: 12,
        marginBottom: 7,
        fontSize: 16,
    },
});

// TODO use consistent data instead of parsing
/** @returns {ProductDetails} */
function parseItem({ details: item }) {
    const {
        id,
        title,
        pricePerDay,
        startDate,
        startDay,
        endDate,
        endDay,
        description,
        ownerId,
        city,
        distanceFromMe,
        imageUrl,
    } = item;
    console.log("item",item)
    return Object.assign(mock, {
        id,
        title,
        description,
        availability: {
            startDate: timeStampToDate(startDay?? startDate),
            endDate: timeStampToDate(endDay?? endDate),
        },
        image: imageUrl,
        price: Object.assign(mock.price, { amount: pricePerDay }),
        owner: Object.assign(mock.owner, { name: ownerId }),
    });
}

const responseParser = (prev, rsv) => {
    const startDate = timeStampToDate(rsv.startDate);
    const endDate = timeStampToDate(rsv.endDate);
    const time = endDate.valueOf() + 12 * 60 * 60 * 1000 <= Date.now() ? "past" : "next";
    const newRsv = {
        id: rsv.id,
        ownerId: rsv.ownerId,
        productId: rsv.productId,
        scheduling: {
            startDate,
            endDate,
        },
        reservingUser: {
            id: rsv.renterId,
            phoneNumber: rsv.enriched_renterId.phoneNumber,
            name: rsv.enriched_renterId.fullName,
        },
    };
    prev[time].push(newRsv);
    return prev;
};

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
        startDate: new Date("2024-02-14T10:00"),
        endDate: new Date("2024-02-17T18:00"),
    },
};

/** @type {Record<string, ProductReservation[]>} */
const mockReservations = {
    next: [
        {
            id: "1",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2026-08-12T15:45:00Z"),
                endDate: new Date("2026-09-05T12:00:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972522708541",
            },
        },
        {
            id: "2",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2027-11-08T08:30:00Z"),
                endDate: new Date("2027-11-25T18:20:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
        {
            id: "3",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2025-03-25T10:15:00Z"),
                endDate: new Date("2025-04-10T20:30:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
    ],
    prev: [
        {
            id: "4",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2022-05-10T08:00:00Z"),
                endDate: new Date("2022-06-01T16:20:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
        {
            id: "5",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2023-08-15T12:30:00Z"),
                endDate: new Date("2023-09-02T18:45:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
        {
            id: "6",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2021-11-20T14:45:00Z"),
                endDate: new Date("2021-12-05T22:10:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
        {
            id: "7",
            title: "Little Black Dress",
            scheduling: {
                startDate: new Date("2023-9-06T14:45:00Z"),
                endDate: new Date("2023-9-06T22:12:00Z"),
            },
            productId: "1",
            reservingUser: {
                id: "1",
                name: "Sasha Baron Cohen",
                phoneNumber: "972555555555",
            },
        },
    ],
};
