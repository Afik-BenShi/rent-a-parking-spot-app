import React, { useState, useEffect, useContext } from "react";
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
import { getAuth } from "firebase/auth";

import { RefreshContext } from '../context/context';


const SERVER = `http://${config.serverIp}:${config.port}`;

export default function OwnerProductPage({ route, navigation }) {
    /** @type {ProductDetails} */
    //const details = parseItem(route.params);

    const { updatedItem, setUpdatedItem } = useContext(RefreshContext);


    const [details, setDetails] = useState(parseItem(route.params));  // Parsing 
    const [editMode, setEditMode] = useState(false);
    const [rsvs, setRsvs] = useState({ past: [], next: [] });
    const [userId, setUserId] = useState(route.params.userId);

    // save the title and description in edit mode
    const [title, setTitle] = useState(details.title);
    const [description, setDescription] = useState(details.description);



    const editClickHandler = () => {
        if (editMode) {
            updateProductDetails();
        }
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
        getAuth().currentUser?.getIdToken().then(token => 
        axios
            .get(SERVER + `/orders/owner/${userId}?time=all&productId=${details.id}`, {headers:{Authorization:token}})
            .then(({ data }) => {
                const rsvTemplate = { next: [], past: [] };
                const newRsvs = data.reduce(responseParser, rsvTemplate);
                setRsvs(newRsvs);
            }));
    }
    useEffect(updateReservations, [userId]);

    const productImage = details.image
        ? { uri: details.image }
        : // @ts-ignore
          require("../../assets/parking-details-images/placeholder.png");

    const contactMessage = `Hi I'm texting you about the ${details.title} you offered on RentalWize, Is it still available?`;
 
   


    const updateProductDetails = () => {
        
        if (description === details.description && title === details.title) {
            return;
        }
        getAuth().currentUser?.getIdToken().then(token => 
            axios
                .put(SERVER + `/myProducts/updateProductInfo/${details.id}`, {
                    title,
                    description
                }, { headers: { Authorization: token } })
                .then(() => {
                    setDetails((prevDetails) => ({
                        ...prevDetails,
                        ['title']: title.trim(), 
                        ['description']: description.trim(),
                    }));

                })
                .catch((error) => {
                    console.error("Failed to update product details", error);
                }));
    };


    // In order to updates myProducts page
    useEffect(() => {
        // details.description is already updated after the edit
        setUpdatedItem({ id: details.id, title:details.title, description: details.description });
    }, [details]);

    // This tells React to call our effect when `title`, `description`, or `editMode` changes
    useEffect(() => {
        if (!editMode && (title !== details.title || description !== details.description)) {
            updateProductDetails();
        }
    }, [title, description, editMode]); 
    

    const handleTitleChange = (value) => {
        const newText = value.trim()
        setTitle(newText);
    };

    const handleDescriptionChange = (value) => {
        const newText = value.trim()
        setDescription(newText);
    };
    

    return (
        <View style={styles.pageContainer}>
            <ScrollView contentContainerStyle={styles.scrollable}>
                 <EditableText
                    h3
                    editMode={editMode}
                    textStyle={styles.text}
                    onChange={() => {}}
                    sendDataToParent={handleTitleChange}
                >
                    {details.title}
                </EditableText> 
                {/* <Text h3 style={styles.text}>
                    {details.title}
                </Text> */}
                <Card.Divider />
                <EditableText
                    textStyle={styles.description}
                    editMode={editMode}
                    onChange={() => {}}
                    sendDataToParent={handleDescriptionChange}
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
                    onRemoveItem={updateReservations}
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
export function parseItem({ details: item }) {
    const {
        productId,
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
        urlToimage,
        OrderStartDate,
        OrderEndDate,
        mainCategoryId,
        OwnerInfo,
        
    } = item;
    return Object.assign(mock, {
        id: id ? id : productId,
        title,
        description,
        city,
        mainCategoryId,
        availability: {
            startDate: timeStampToDate(startDate?? startDay),
            endDate: timeStampToDate(endDate ?? endDay),
        },
        image: urlToimage,
        price: Object.assign(mock.price, { amount: pricePerDay }),
        owner: Object.assign(mock.owner, { id: ownerId, 
                                            name: OwnerInfo ? OwnerInfo.fullName : mock.owner.name,
                                            phoneNumber: OwnerInfo ? OwnerInfo.phoneNumber : mock.owner.phoneNumber}),
        orderDates: Object.assign(mock.orderDates, 
            { startDate: timeStampToDate(OrderStartDate?? startDate),   // in case of missing data, use the start date
                endDate: timeStampToDate(OrderEndDate?? endDate) }),
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
        currency: "nis",
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
    orderDates: {
        startDate: new Date("2024-02-14T10:00"),
        endDate: new Date("2024-02-17T18:00"),
    },
};

// /** @type {Record<string, ProductReservation[]>} */
// const mockReservations = {
//     next: [
//         {
//             id: "1",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2026-08-12T15:45:00Z"),
//                 endDate: new Date("2026-09-05T12:00:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972522708541",
//             },
//         },
//         {
//             id: "2",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2027-11-08T08:30:00Z"),
//                 endDate: new Date("2027-11-25T18:20:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//         {
//             id: "3",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2025-03-25T10:15:00Z"),
//                 endDate: new Date("2025-04-10T20:30:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//     ],
//     prev: [
//         {
//             id: "4",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2022-05-10T08:00:00Z"),
//                 endDate: new Date("2022-06-01T16:20:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//         {
//             id: "5",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2023-08-15T12:30:00Z"),
//                 endDate: new Date("2023-09-02T18:45:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//         {
//             id: "6",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2021-11-20T14:45:00Z"),
//                 endDate: new Date("2021-12-05T22:10:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//         {
//             id: "7",
//             title: "Little Black Dress",
//             scheduling: {
//                 startDate: new Date("2023-9-06T14:45:00Z"),
//                 endDate: new Date("2023-9-06T22:12:00Z"),
//             },
//             productId: "1",
//             reservingUser: {
//                 id: "1",
//                 name: "Sasha Baron Cohen",
//                 phoneNumber: "972555555555",
//             },
//         },
//     ],
// };
