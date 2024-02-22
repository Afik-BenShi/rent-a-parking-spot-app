import { Button, Card, Icon, Dialog, Text } from "@rneui/themed";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { EditableDateRange } from "./editableComponents";
import { OwnerDetailsBar } from "./ownerDetails";
import { COLORS } from "../../assets/theme";
import useDialog from "../customStates/useDialog";
import "../pages/productDetailsPage.types";

/**
 * @type {React.FC}
 * @param {{
 *      reservation:ProductReservation, editMode?:boolean,
 *      onDelete?: (rsv:ProductReservation) => any,
 *      onChange?: (rsv:ProductReservation) => any
 * }} props
 */
export default function ReservationBox({
    reservation,
    editMode = false,
    onDelete,
    onChange = () => {},
}) {
    const [rsv, setRsv] = useState(reservation);
    const { openDialog, closeDialog, DialogComponent } = useDialog();

    const handleDateChange = (startTime, endTime) => {
        setRsv((oldRsv) =>
            Object.assign(oldRsv, { scheduling: { startTime, endTime } })
        );
        onChange(rsv);
    };

    const handleDelete = async () => {
        const dialogPromise = openDialog();
        const action = await dialogPromise;
        if (action === "delete" && onDelete) {
            onDelete(rsv);
        }
        console.log(action);
    };

    return (
        <Card containerStyle={styles.availabilityCard}>
            <View style={styles.availabilityInner}>
                <OwnerDetailsBar owner={rsv.reservingUser} />
                <EditableDateRange
                    editMode={editMode}
                    dateRange={rsv.scheduling}
                    minDate={new Date()}
                    onRangeChange={handleDateChange}
                    textProps={{ style: styles.datePickerText }}
                />
                {editMode && (
                    <Button color="secondary" onPress={handleDelete}>
                        Delete {"\u00A0"}
                        <Icon
                            name="x-circle"
                            type="feather"
                            color={COLORS.white}
                        />
                    </Button>
                )}
                <ConfirmationDialog
                    dialogState={{ openDialog, closeDialog, DialogComponent }}
                />
            </View>
        </Card>
    );
}

function ConfirmationDialog({ dialogState }) {
    const { DialogComponent, closeDialog } = dialogState;
    return (
        <DialogComponent overlayStyle={{ position: "relative" }}>
            <View
                style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                }}
            >
                <Pressable onPress={() => closeDialog()}>
                    <Icon name="close" />
                </Pressable>
            </View>
            <View style={{ alignSelf: "center" }}>
                <Dialog.Title title="Are you sure you want to delete this reservation?" />
            </View>
            <Dialog.Actions>
                <View style={styles.dialogActions}>
                    <Button type="outline" onPress={() => closeDialog("close")}>
                        No, go back
                    </Button>
                    <Button
                        color="secondary"
                        onPress={() => closeDialog("delete")}
                    >
                        Yes, Delete
                    </Button>
                </View>
            </Dialog.Actions>
        </DialogComponent>
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
    dialogActions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
