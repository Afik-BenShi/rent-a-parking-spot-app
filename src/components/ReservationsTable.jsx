import React, { useState } from "react";
import { AvailabilityBox } from "./availabilityBox";
import { Card, Icon, Text } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";

/**
 * @param {{
 * dateRangeList: {id:string, startTime: Date, endTime: Date}[],
 * heading:string,
 * initialExpanded?:boolean,
 * }} props
 */
export default function ReservationTable({
    dateRangeList,
    heading,
    initialExpanded = false,
}) {
    const [isExpanded, toggleExpand] = useState(initialExpanded);

    return (
        <>
            <Pressable
                style={styles.headingBox}
                onPress={() => toggleExpand((prev) => !prev)}
            >
                <Text h4> {heading} </Text>
                <Icon
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    type="feather"
                />
            </Pressable>
            <Card.Divider />
            {isExpanded ? (
                <>
                    {dateRangeList.map((dateRange) => (
                        <AvailabilityBox key={dateRange.id} availability={dateRange} />
                    ))}
                    <Card.Divider />
                </>
            ) : (
                <></>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    headingBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 6,
    },
});
