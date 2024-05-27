import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    View,
    Pressable,
    ActivityIndicator,
} from "react-native";
import { Button, Card, Text } from "@rneui/themed";

import {serverPath} from '../../backend.config.json';

import { COLORS } from "../../assets/theme";
import ReservationTable from "../components/ReservationsTable";
import { EditableImage, EditableText } from "../components/editableComponents";
import AddOrder from "../components/addOrder";

import "./productDetailsPage.types";
import { timeStampToDate } from "../utils/dateTime";
import { getAuth } from "firebase/auth";

import { RefreshContext } from "../context/context";
import { Icon } from "react-native-elements";
import useDialog from "../customStates/useDialog";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { getUser } from "../auth/auth";
import { styles as moreStyles } from "./signUpAndLogin.styles";
import { uploadImage } from "../utils/imageStorage";


export default function OwnerProductPage({ route, navigation }) {
    const { updatedItem, setUpdatedItem } = useContext(RefreshContext);

    const [details, setDetails] = useState(parseItem(route.params)); // Parsing
    const [editMode, setEditMode] = useState(false);
    const [rsvs, setRsvs] = useState({ past: [], next: [] });
    const [userId, setUserId] = useState(route.params.userId);

    // save the title and description in edit mode
    const [title, setTitle] = useState(details.title);
    const [description, setDescription] = useState(details.description);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setLoading] = useState(false);

    const { openDialog, closeDialog, DialogComponent } = useDialog();
    const [imageToSave, setImageToSave] = useState("");
    const productImage = details.image
        ? { uri: details.image }
        : // @ts-ignore
          require("../../assets/parking-details-images/placeholder.png");

    const editClickHandler = async () => {
        if (isLoading) {
            return;
        }
        if (editMode) {
            await updateProductDetails();
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
                    {isLoading ? (
                        <ActivityIndicator
                            color={COLORS.btnBlue}
                            size="small"
                        />
                    ) : (
                        <Text style={{ color: COLORS.btnBlue, fontSize: 16 }}>
                            {editMode ? "Done" : "Edit"}
                        </Text>
                    )}
                </TouchableOpacity>
            ),
        });
    }, [editMode, navigation]);

    const updateReservations = () => {
        getAuth()
            .currentUser?.getIdToken()
            .then((token) =>
                axios
                    .get(
                        serverPath +
                            `/orders/owner/${userId}?time=all&productId=${details.id}`,
                        { headers: { Authorization: token } }
                    )
                    .then(({ data }) => {
                        const rsvTemplate = { next: [], past: [] };
                        const newRsvs = data.reduce(
                            responseParser,
                            rsvTemplate
                        );
                        setRsvs(newRsvs);
                    })
            );
    };
    useEffect(updateReservations, [userId]);

    const contactMessage = `Hi I'm texting you about the ${details.title} you offered on RentalWize, Is it still available?`;

    const handleDeleteProduct = async () => {
        setLoading(true);
        const dialogPromise = openDialog();
        const action = await dialogPromise;
        if (action !== "delete") {
            setLoading(false);
            return;
        }
        const user = getUser();
        const token = user?.getIdToken();
        try {
            const response = await axios.delete(
                serverPath + "/myProducts/" + details.id,
                {
                    headers: { Authorization: await token },
                }
            );
            if (response.status === 200) {
                navigation.navigate("My Products cardList");
            } else {
                setErrorMessage(response.data);
            }
        } catch (error) {
            setErrorMessage(
                "There was a problem deleting this product please try again"
            );
        }
        setLoading(false);
    };

    const updateProductDetails = async () => {
        if (description === details.description && title === details.title && !imageToSave) {
            return;
        }
        setLoading(true);
        let urlToimage = details.image ?? "";
        if (imageToSave) {
            const storagePath = `images/${userId}-product-${encodeURI(
                title || details.title
            )}-${Date.now()}`;
            urlToimage = await uploadImage(storagePath, imageToSave);
        }
        const token = await getAuth().currentUser?.getIdToken();
        try {
            await axios.put(
                serverPath + `/myProducts/updateProductInfo/${details.id}`,
                {
                    title,
                    description,
                    urlToimage,
                },
                { headers: { Authorization: token } }
            );
            setLoading(false);
            setDetails((prevDetails) => ({
                ...prevDetails,
                ["title"]: title.trim(),
                ["description"]: description.trim(),
                ["image"]: urlToimage,
            }));
        } catch (error) {
            console.error("Failed to update product details", error);
            setLoading(false);
        }
    };

    // In order to updates myProducts page
    useEffect(() => {
        // details.description is already updated after the edit
        setUpdatedItem({
            id: details.id,
            title: details.title,
            description: details.description,
            image: details.image,
        });
    }, [details]);

    // This tells React to call our effect when `title`, `description`, or `editMode` changes
    useEffect(() => {
        if (!editMode && (title !== details.title || description !== details.description || imageToSave)) {
            updateProductDetails();
        }
    }, [title, description, editMode, imageToSave]);

    const handleTitleChange = (value) => {
        const newText = value.trim();
        setTitle(newText);
    };

    const handleDescriptionChange = (value) => {
        const newText = value.trim();
        setDescription(newText);
    };

    const handleImageChange = (newImage) => {
        const {uri} = newImage;
        setImageToSave(uri);
    }
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
                <EditableImage
                    isChanged={!!imageToSave}
                    editMode={editMode}
                    source={productImage}
                    initialHeight={200}
                    onImageChanged={handleImageChange}
                    onImageRevert={() => setImageToSave("")}
                />
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
                {editMode && (
                    <Button
                        buttonStyle={styles.deleteButton}
                        onPress={handleDeleteProduct}
                        loading={isLoading}
                        disabled={isLoading}
                        disabledStyle={styles.deleteButton}
                    >
                        Delete Product{" "}
                        <Icon
                            type="feather"
                            name="trash"
                            color="#FFF"
                            size={16}
                        />
                    </Button>
                )}
                {errorMessage && (
                    <Text style={moreStyles.failText}>{errorMessage}</Text>
                )}
                <ConfirmationDialog
                    dialogState={{ openDialog, closeDialog, DialogComponent }}
                    title="Are you sure you want to delete this product?"
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
    deleteButton: {
        width: 150,
        alignSelf: "center",
        borderRadius: 6,
        backgroundColor: COLORS.red,
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
            startDate: timeStampToDate(startDate ?? startDay),
            endDate: timeStampToDate(endDate ?? endDay),
        },
        image: urlToimage,
        price: Object.assign(mock.price, { amount: pricePerDay }),
        owner: Object.assign(mock.owner, {
            id: ownerId,
            name: OwnerInfo ? OwnerInfo.fullName : mock.owner.name,
            phoneNumber: OwnerInfo
                ? OwnerInfo.phoneNumber
                : mock.owner.phoneNumber,
        }),
        orderDates: Object.assign(mock.orderDates, {
            startDate: timeStampToDate(OrderStartDate ?? startDate), // in case of missing data, use the start date
            endDate: timeStampToDate(OrderEndDate ?? endDate),
        }),
    });
}

const responseParser = (prev, rsv) => {
    const startDate = timeStampToDate(rsv.startDate);
    const endDate = timeStampToDate(rsv.endDate);
    const time =
        endDate.valueOf() + 12 * 60 * 60 * 1000 <= Date.now() ? "past" : "next";
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
