import React, { useState } from "react";
import { Text, Input } from "@rneui/themed";
import { dateRangeFormat } from "../utils/dateTime";
import DateTimePickerExample from "./DatePick";
import { debounce } from "../utils/utils";
import { StyleSheet, View } from "react-native";

export function EditableText({
    editMode,
    children: value,
    onChange,
    inputStyle = {},
    textStyle = {},
    h1 = false,
    h2 = false,
    h3 = false,
    h4 = false,
}) {
    const [text, setText] = useState(value);

    const debouncedOnChange = debounce(onChange);
    const textChangeHandler = (newText) => {
        if (!editMode) return;
        setText(newText);
        debouncedOnChange(newText);
    };

    return !editMode ? (
        <Text {...{ h1, h2, h3, h4 }} style={textStyle}>
            {text}
        </Text>
    ) : (
        <Input
            style={inputStyle}
            onChangeText={textChangeHandler}
            multiline
            value={text}
        />
    );
}

export function EditableDateRange({
    editMode,
    dateRange,
    textProps = {},
    minDate,
    onRangeChange,
}) {
    const { startDay, startHour, endDay, endHour } = dateRangeFormat(
        dateRange.startTime,
        dateRange.endTime
    );
    const dateChangeHandler = (event) => {
        onRangeChange(event);
    };
    return !editMode ? (
        <Text {...textProps}>
            From {startDay} at {startHour} to {endDay} at {endHour}{" "}
        </Text>
    ) : (
        <>
            <Text {...textProps}>Start Date</Text>
            <DateTimePickerExample minDate={minDate} onDateChange={(e) => console.log(e)} />
            <Text {...textProps}>End Date</Text>
            <DateTimePickerExample minDate={minDate} onDateChange={(e) => console.log(e)} />
        </>
    );
}

const dateStyles = StyleSheet.create({
    datePickerContainer: {

    }
})