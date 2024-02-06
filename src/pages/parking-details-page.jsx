import React from "react";
import { Card, Image, Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/owner-details";
import { dateRangeFormat } from "../utils/utils";
import "./parking-details.types";

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} props
 */
export default function ParkingDetailsPage({
    parkingDetails,
    onReserveParking,
}) {
    const parkingImage = parkingDetails.parkingImage
        ? { uri: parkingDetails.parkingImage }
        : //@ts-expect-error
          require("../assets/parking-details-images/parkingImagePlaceholder.png");

    return (
        <View style={styles.page}>
            <Text h3 style={styles.text}>
                Parking spot
            </Text>
            <Card.Divider />
            <OwnerDetailsBar owner={parkingDetails.owner} />
            <Image style={styles.image} source={parkingImage} />
            <Text h4 style={styles.text}>
                Availavility
            </Text>
            <AvailabilityBox availability={parkingDetails.availability} />
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        gap: 6,
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#000",
    },
    image: {
        height: 200,
        width: "auto",
    },
    text: { paddingHorizontal: 12 },
    availabilityCard: {
        flex:1,
        borderRadius: 8,
        marginVertical: 0,
        marginHorizontal: 6,
    },
    availabilityInner: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    timeBox: {
        alignItems: "center",
    },
});


function AvailabilityBox({availability}) {
    const parkingAvailability = dateRangeFormat(
        availability.startTime,
        availability.endTime
    );
    return (
        <Card containerStyle={styles.availabilityCard}>
            <View style={styles.availabilityInner}>
                <View style={styles.timeBox}>
                    <Text h4>{parkingAvailability.startDay}</Text>
                    <Text h2>{parkingAvailability.startHour}</Text>
                </View>
                <View>
                    <Text h1>-</Text>
                </View>
                <View style={styles.timeBox}>
                    <Text h4>{parkingAvailability.endDay}</Text>
                    <Text h2>{parkingAvailability.endHour}</Text>
                </View>
            </View>
        </Card>
    );
}
