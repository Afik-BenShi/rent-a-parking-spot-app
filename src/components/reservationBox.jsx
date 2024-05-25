import { Button, Card, Icon, Dialog, Text } from "@rneui/themed";
import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { EditableDateRange } from "./editableComponents";
import { OwnerDetailsBar } from "./ownerDetails";
import { COLORS } from "../../assets/theme";
import useDialog from "../customStates/useDialog";
import "../pages/productDetailsPage.types";
import { getUser } from "../auth/auth";
import axios from "axios";
import config from "../backend/config";
const SERVER = `http://${config.serverIp}:${config.port}`;

/**
 * @type {React.FC}
 * @param {{
 *      reservation:ProductReservation, editMode?:boolean,
 *      index:number
 *      onDelete?: (rsv:ProductReservation, index: number) => any,
 *      onChange?: (rsv:ProductReservation) => any,
 * }} props
 */
export default function ReservationBox({
    reservation,
    index,
    editMode = false,
    onDelete = () => {},
    onChange = () => {},
}) {
    const [rsv, setRsv] = useState(reservation);
    const [isLoading, setIsLoading] = useState(false);
    const { openDialog, closeDialog, DialogComponent } = useDialog();
    const [message, setMessage] = useState('');

    const handleDateChange = async (startDate, endDate) => {
        setIsLoading(true);
        const user = getUser();
        const token = user?.getIdToken();
        const payload = {
            ownerId: user?.uid,
            startDate:startDate,
            endDate: endDate, 
            productId: rsv.id, 
            renterId: rsv.reservingUser.id,
        }
        try {
            const response = await axios.put(SERVER + '/orders/update/' + rsv.id, payload, {headers:{Authorization :await token}});
            if (response.status === 200) { 
                setMessage("Reservation updated successfully");
                setRsv((oldRsv) =>
                    Object.assign(oldRsv, { scheduling: { startDate, endDate } })
                );
                onChange(rsv);
            } else {
                setMessage(`${response.data}`);
            }
        } catch (error) {
            console.error('update', error);
            setMessage("we had an error updating the reservation. Please try again");
        }
        setIsLoading(false);
    };
    
    const handleDelete = async () => {
        setIsLoading(true);
        const dialogPromise = openDialog();
        const action = await dialogPromise;
        if (action !== "delete") {
            return;
        }
        const user = getUser();
        const token = user?.getIdToken();
        try {
            const response = await axios.delete(SERVER + '/orders/' + rsv.id, {headers:{Authorization: await token}});
            if (response.status === 200) { 
                setMessage("Reservation removed successfully");
                onDelete(rsv, index);
            } else {
                setMessage(`${response.data}`);
            }
        } catch (error) {
            console.error('delete', error);
            setMessage("we had an error removing the reservation. Please try again");
        }
        setIsLoading(false);
    };

    console.log(rsv.reservingUser);
    return (
        <Card containerStyle={styles.availabilityCard}>
            <View style={styles.availabilityInner}>
                <OwnerDetailsBar owner={rsv.reservingUser} />
                <EditableDateRange
                    key={`${isLoading}`}
                    editMode={editMode}
                    disabled={isLoading}
                    dateRange={rsv.scheduling}
                    minDate={new Date()}
                    onRangeChange={handleDateChange}
                    textProps={{ style: styles.datePickerText }}
                />
                {editMode && (
                    <>
                    {!!message && <Text style={styles.message}>{message}</Text>}
                    <Button color="secondary" onPress={handleDelete} disabled={isLoading}>
                        Delete {"\u00A0"}
                        <Icon
                            name="x-circle"
                            type="feather"
                            color={COLORS.white}
                        />
                    </Button>
                    </>
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

/**
 * @type {React.FC}
 * @param {{
 *      reservation:ProductReservation, editMode?:boolean,
 *      onSubmit?: (rsv:ProductReservation) => any,
 *      onChange?: (rsv:ProductReservation) => any,
 * }} props
 */
export function NewReservationBox({
    reservation,
    editMode = false,
    onSubmit,
    onChange = () => {},
}) {
    const [rsv, setRsv] = useState(reservation);
    const [submitText, setSubmitText] = useState("Submit");
    const { openDialog, closeDialog, DialogComponent } = useDialog();

    const handleDateChange = (startDate, endDate) => {
        setRsv((oldRsv) =>
            Object.assign(oldRsv, { scheduling: { startDate, endDate } })
        );
        onChange(rsv);
    };

    const handleSubmit = async () => {
        const dialogPromise = openDialog();
        const action = await dialogPromise;
        if (action === "submit" && onSubmit) {
            setSubmitText("Sending...");
            const isSuccess = await onSubmit(rsv);
            setSubmitText(isSuccess? "Saved": "Error");
            setTimeout(()=> setSubmitText("Submit"), 5000);
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
                    <Button color="primary" onPress={handleSubmit}>
                        {submitText}
                        {/* <Icon
                           name="x-circle"
                           type="feather"
                           color={COLORS.white}
                       /> */}
                    </Button>
                )}
                <SubmitConfirmationDialog
                    dialogState={{ openDialog, closeDialog, DialogComponent }}
                />
            </View>
        </Card>
    );
}

function SubmitConfirmationDialog({ dialogState }) {
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
                <Dialog.Title title="Are you sure you want to submit this reservation?" />
            </View>
            <Dialog.Actions>
                <View style={styles.dialogActions}>
                    <Button type="outline" onPress={() => closeDialog("close")}>
                        No, go back
                    </Button>
                    <Button
                        color="primary"
                        onPress={() => closeDialog("submit")}
                    >
                        Yes, Submit
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
    message:{
        fontSize: 16,
        fontWeight: "600",
    }
});
