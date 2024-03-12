import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "@rneui/themed";
import { dateRangeFormat } from "../utils/dateTime";

/** @param {{availability: {startDate: Date, endDate: Date}}} props */
export function AvailabilityBox({ availability }) {
    const parkingAvailability = dateRangeFormat(
        availability.startDate,
        availability.endDate
    );
    return (
        <Card containerStyle={styles.availabilityCard}>
            <View style={styles.availabilityInner}>
                <View style={styles.timeBox}>
                    <Text h2>{parkingAvailability.startDay}</Text>
                </View>
                <View>
                    <Text h1>-</Text>
                </View>
                <View style={styles.timeBox}>
                    <Text h2>{parkingAvailability.endDay}</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    availabilityCard: {
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
