import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Card, Image, Text } from "@rneui/themed";
import { ScrollView, StyleSheet, View } from "react-native";
import { OwnerDetailsBar } from "../components/ownerDetails";
import {AvailabilityBox} from "../components/availabilityBox";
import { dateRangeFormat } from "../utils/dateTime";
import "./parkingDetailsPage.types";

/**
 *  @type {React.FC}
 *  @param {ParkingDetailsPageProps} props
 */
export default function ParkingDetailsPage({route}) {
    const {parkingDetails = mock, onReserveParking} = route.params;
    const navigation = useNavigation();

    const parkingImage = parkingDetails.parkingImage
        ? { uri: parkingDetails.parkingImage }
        : //@ts-expect-error
          require("../../assets/parking-details-images/parkingImagePlaceholder.png");

    return (
        <ScrollView contentContainerStyle={styles.page}>
            <Text h3 style={styles.text}>
                Parking - {parkingDetails.location.address}
            </Text>
            <Card.Divider />
            <OwnerDetailsBar owner={parkingDetails.owner} />
            <Image style={styles.image} source={parkingImage} />
            <Text h4 style={styles.text}>
                Availavility
            </Text>
            <AvailabilityBox availability={parkingDetails.availability} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop:12,
        gap: 6,
    },
    image: {
        height: 200,
        width: "auto",
    },
    text: { paddingHorizontal: 12 },
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
}