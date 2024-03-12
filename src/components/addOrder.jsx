import React, { useState } from "react";
import axios from "axios";
import { NewReservationBox } from "./reservationBox";
import InputWithSuggestions from "./inputWithSuggestions";
import config from "../backend/config";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon, Text } from "@rneui/themed";
const SERVER = `http://${config.serverIp}:${config.port}`;
export default function AddOrder({ userId, productId }) {
    const now = new Date();
    const [isExpanded, toggleExpand] = useState(false);
    const [user, setUser] = useState(false);
    const [reservation, setReservation] = useState({
        productId,
        ownerId: userId,
        scheduling: {
            startTime: now,
            endTime: now,
        },
        reservingUser: {
            id: "",
            name: "",
            phoneNumber: "",
        },
    });

    const userSuggestions = async (query) => {
        console.log("suggestion");
        const values = await axios
        .get(SERVER + `/users/suggestion?q=${encodeURI(query)}`
            )
            .then(({ data }) => data)
            .catch((_) => []);

        return values.map((value) => ({
            label: `${value.fullName} - ${value.phoneNumber}`,
            value,
        }));
    };
    const onUserChosen = ({value:_user}) => {
        console.log(_user)
        setUser(true);
        setReservation((oldRsv) =>
            Object.assign(oldRsv, {
                reservingUser: {
                    id: _user.id,
                    name: _user.fullName,
                    phoneNumber: _user.phoneNumber,
                },
            })
        );
    };

    /** @param {ProductReservation} rsv */
    const onSubmitReservation = async (rsv) => {
        const payload = {
            startDate:rsv.scheduling.startTime,
            endDate: rsv.scheduling.endTime, 
            productId, 
            userId: rsv.reservingUser.id,
        }
        const response = await axios.post(SERVER + '/orders/add', payload);
        if (response.status === 200){
            return true;
        }
        console.error(response.data);
        return false;
    }
    return (
        <>
            <TouchableOpacity
                style={styles.headingBox}
                onPress={() => toggleExpand((prev) => !prev)}
            >
                <Text h4> Add new order </Text>
                <Icon
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    type="feather"
                />
            </TouchableOpacity>
            <Card.Divider />
            {isExpanded && (
                <>
                    <InputWithSuggestions
                        onChooseSuggestion={onUserChosen}
                        placeholder="Please insert renter's name"
                        suggestionsSupplier={userSuggestions}
                    />
                    {!!user && (
                        <NewReservationBox
                            editMode={true}
                            reservation={reservation}
                            onSubmit={onSubmitReservation}
                        />
                    )}
                </>
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
