import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs"
import { NewReservationBox } from "./reservationBox";
import InputWithSuggestions from "./InputWithSuggestions";

import {serverPath} from "../../backend.config.json";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Icon, Text } from "@rneui/themed";
import { getAuth } from "firebase/auth";

export default function AddOrder({ userId, productId, onSuccess = (_) => { } }) {
    const now = new Date();
    const [isExpanded, toggleExpand] = useState(false);
    const [user, setUser] = useState('');
    const [availableDates, setAvailableDates] = useState(null)
    const [reservation, setReservation] = useState({
        productId,
        ownerId: userId,
        scheduling: {
            startDate: now,
            endDate: now,
        },
        reservingUser: {
            id: "",
            name: "",
            phoneNumber: "",
        },
    });

    const userSuggestions = async (query) => {
        const token = getAuth().currentUser?.getIdToken()
        const values = await axios
            .get(serverPath + `/users/suggestion?q=${encodeURI(query)}`
                , { headers: { Authorization: await token } })
            .then(({ data }) => data)
            .catch((_) => []);

        return values.map((value) => ({
            label: `${value.fullName} - ${value.phoneNumber}`,
            value,
        }));
    };
    const onUserChosen = ({ value: _user }) => {
        console.log('choice', _user)
        setUser(_user.id);
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


    const fetchProductOrders = async () => {
        try {
            const token = getAuth().currentUser?.getIdToken()
            const response = await axios.get(serverPath + `/orders/getProductEmptyTimeOrder`,
                {
                    headers: { Authorization: await token },
                    params: { productId }
                });
            const result = response.data;
            setAvailableDates(result)
            console.log("availableDates", result);
        }
        catch (err) {
            console.log(JSON.stringify(err))
            console.log("error while fetching available dates to order")
        }
    };


    useEffect(() => {
        fetchProductOrders();
    }, []);


    const createDateRangeArray = (startDate, endDate) => {
        const dateRange = [];
        let currentDate = startDate;
        while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
            dateRange.push(currentDate.format('YYYY-MM-DD'));
            currentDate = currentDate.add(1, 'day');
        }

        return dateRange;
    }

    const isValidOrder = (startDate, endDate) => {
        const orderDateRange = createDateRangeArray(startDate, endDate)
        return orderDateRange.every(date => availableDates.includes(date))
    }

    /** @param {ProductReservation} rsv */
    const onSubmitReservation = async (rsv) => {
        const token = getAuth().currentUser?.getIdToken();
        if (!isValidOrder(dayjs(rsv.scheduling.startDate), dayjs(rsv.scheduling.endDate))) {
            alert("Choose different dates, this product is not valid in this date range")
            return false;
        }
        const payload = {
            ownerId: userId,
            startDate: rsv.scheduling.startDate,
            endDate: rsv.scheduling.endDate,
            productId,
            renterId: rsv.reservingUser.id,
        }
        const response = await axios.post(serverPath + '/orders/add', payload, { headers: { Authorization: await token } });
        if (response.status === 200) {
            setUser('');
            onSuccess(response.data);
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
                        placeholder="Please insert renter details (name/phone)"
                        suggestionsSupplier={userSuggestions}
                    />
                    {!!user && (
                        <NewReservationBox
                            editMode={true}
                            reservation={reservation}
                            onSubmit={onSubmitReservation}
                            key={user}
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
