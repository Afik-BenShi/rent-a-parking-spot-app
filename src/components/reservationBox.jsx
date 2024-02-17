import { Button, Card, Icon, Text } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { EditableDateRange, EditableText } from "./editableComponents";
import { OwnerDetailsBar } from "./ownerDetails";
import { dateRangeFormat } from "../utils/dateTime";
import { COLORS } from "../../assets/theme";

/**
 * @type {React.FC}
 * @param {{reservation:ProductReservation, editMode:boolean, onChange: (rsv:ProductReservation) => any}} props
 */
export default function ReservationBox({ reservation, editMode }) {
    const [rsv, setRsv] = useState(reservation);

    const handleDateChange = (event) => {
        console.log(event);
    };

    return (
        <Card containerStyle={styles.availabilityCard}>
            <View style={styles.availabilityInner}>
                <OwnerDetailsBar owner={rsv.reservingUser} />
                <EditableDateRange
                    editMode={editMode}
                    dateRange={rsv.scheduling}
                    minDate={new Date()}
                    onRangeChange={() => {}}
                    textProps={{ style: styles.datePickerText }}
                />
                {editMode && (
                    <Button color="secondary">
                        Delete
                        <Icon
                            name="x-circle"
                            type="feather"
                            color={COLORS.white}
                        />
                    </Button>)}
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    timeBox: {
        alignItems: "center",
    },
    datePickerText: {
        fontSize: 18,
    },
});
