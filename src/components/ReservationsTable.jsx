import React, { useState } from "react";
import { Card, Icon, Text } from "@rneui/themed";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import ReservationBox from "./reservationBox";

/**
 * @param {{
 * editMode: boolean,
 * reservations: ProductReservation[],
 * heading:string,
 * initialExpanded?:boolean,
 * }} props
 */
export default function ReservationTable({
    editMode,
    reservations,
    heading,
    initialExpanded = false,
}) {
    const [isExpanded, toggleExpand] = useState(initialExpanded);

    return (
        <>
            <TouchableOpacity
                style={styles.headingBox}
                onPress={() => toggleExpand((prev) => !prev)}
            >
                <Text h4> {heading} </Text>
                <Icon
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    type="feather"
                />
            </TouchableOpacity>
            <Card.Divider />
            {isExpanded ? (
                <>
                    {reservations.map((rsv) => (
                        <ReservationBox
                            editMode={editMode}
                            onChange={(newRsv) => {
                                alert(
                                    "changed \n" + JSON.stringify(newRsv, null, 2)
                                );
                            }}
                            onDelete={(delRsv) => {
                                alert(
                                    "deleted \n" + JSON.stringify(delRsv, null, 2)
                                );
                            }}
                            key={rsv.id}
                            reservation={rsv}
                        />
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
