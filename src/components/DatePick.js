import React, { useState } from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import DateTimePicker, {
    DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { COLORS } from "../../assets/theme";
import FeatherIcon from "react-native-vector-icons/Feather";

const DateTimePickerExample = ({
    minDate,
    onDateChange,
    initialDate = new Date(),
    valueToDisplay = null,
    disabled = false,
}) => {
    if (Platform.OS === "ios") {
        return (
            <IosDateTimePicker {...{ minDate, onDateChange, initialDate, valueToDisplay }} />
        );
    } else {
        return (
            <AndroidDateTimePicker
                {...{ minDate, onDateChange, initialDate, valueToDisplay, disabled}}
            />
        );
    }
};
const AndroidDateTimePicker = ({ minDate, onDateChange, initialDate, valueToDisplay, disabled = false }) => {
    const [date, setDate] = useState(initialDate);

    const onChange = (event, selectedDate) => {
        if (event.type === "dismissed") {
            return;
        }
        setDate(selectedDate);
        onDateChange(selectedDate);
    };

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            testID: "dateTimePicker",
            value: valueToDisplay ?? date,
            mode: "date",
            minimumDate: minDate,
            onChange,

        });
    };

    const formattedDate = date.toLocaleDateString();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.picker}
                >
                    <FeatherIcon color="#000" name="calendar" size={18} />
                    <View style={styles.pickerDates}>
                        <Text
                            style={[
                                styles.pickerDatesText,
                                { margin: 5, marginLeft: 10 },
                            ]}
                        >
                            {formattedDate}
                        </Text>
                    </View>
                    {!disabled &&<View style={styles.pickerAction}>
                        <Text style={styles.pickerActionText}>Change</Text>
                        <FeatherIcon
                            color="#4C6CFD"
                            name="chevron-down"
                            size={18}
                        />
                    </View>}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

function IosDateTimePicker({ minDate, onDateChange, initialDate, valueToDisplay, validDates }) {
    const [date, setDate] = useState(initialDate);

    const onChange = (event, selectedDate) => {
        if (event.type === "dismissed") {
            return;
        }
        setDate(selectedDate);
        onDateChange(selectedDate);
    };

    return (
        <SafeAreaView style={styles.iosPicker}>
            <FeatherIcon color="#000" name="calendar" size={18} />
            <DateTimePicker
                testID="dateTimePicker"
                display="calendar"
                value={valueToDisplay ?? date}
                mode="date"
                minimumDate={minDate}
                onChange={onChange}
                {...(validDates && { includeDates: validDates })}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    /** Picker */
    picker: {
        marginTop: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#f5f5f5",
    },
    pickerDates: {
        marginLeft: 12,
    },
    pickerDatesText: {
        fontSize: 15,
        fontWeight: "500",
    },
    pickerAction: {
        marginLeft: "auto",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    pickerActionText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "600",
        color: "#4c6cfd",
    },
    selectedDate: {
        margin: 10,
        fontSize: 16,
        textAlign: "center",
        fontWeight: "bold",
        alignSelf: "flex-start",
    },
    iosPicker: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default DateTimePickerExample;
