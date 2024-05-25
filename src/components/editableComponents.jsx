import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input } from "@rneui/themed";
import { dateRangeFormat } from "../utils/dateTime";
import DateTimePickerExample from "./DatePick";
import { debounce } from "../utils/utils";

/**
 * @type {React.FC}
 * @param {EditableTextProps} props
 */
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
    sendDataToParent,
}) {
    const [text, setText] = useState(value);

    const debouncedOnChange = useCallback(debounce(onChange), [onChange]);
    const textChangeHandler = (newText) => {
        if (!editMode) return;
        console.log("newText : " + newText);

        setText(newText);
        debouncedOnChange(newText);
        sendDataToParent(newText);
    };

    return !editMode ? (
        <Text {...{ h1, h2, h3, h4 }} style={textStyle}>
            {text}
        </Text>
    ) : (
        <Input
            style={inputStyle}
            onChangeText={textChangeHandler}
            //onChangeText={(text) => {textChangeHandler}}
            multiline
            value={text}
        />
    );
}

/**
 * @typedef {{
 *  editMode: boolean,
 *  children: string,
 *  onChange: (newText: string) => any,
 *  sendDataToParent: (value: string) => any,
 *  inputStyle?:  {},
 *  textStyle?: import("react-native").TextStyle,
 *  h1?: boolean,
 *  h2?: boolean,
 *  h3?: boolean,
 *  h4?: boolean,
 * }} EditableTextProps
 */

/**
 * @type {React.FC}
 * @param {EditableDateRangeProps} props
 */
export function EditableDateRange({
    disabled=false,
    editMode,
    dateRange,
    textProps = {},
    minDate,
    onRangeChange,
}) {
    const [start, setStart] = useState(dateRange.startDate);
    const [end, setEnd] = useState(dateRange.endDate);

    const { startDay, startYear, endDay, endYear } = dateRangeFormat(
        start,
        end
    );
    const changeCallback = useCallback(onRangeChange, [onRangeChange]);
    const startChangedHandler = (newDate) => {
        setStart(newDate);
        changeCallback(newDate, end);
    };
    const endChangedHandler = (newDate) => {
        setEnd(newDate);
        changeCallback(start, newDate);
    };
    return !editMode ? (
        <Text {...textProps}>
            From {startDay} to {endDay}
        </Text>
    ) : (
        <>
            <Text {...textProps}>Start Date</Text>
            <DateTimePickerExample
                disabled={disabled}
                minDate={minDate}
                onDateChange={startChangedHandler}
                initialDate={dateRange.startDate}
                />
            <Text {...textProps}>End Date</Text>
            <DateTimePickerExample
                disabled={disabled}
                minDate={minDate}
                onDateChange={endChangedHandler}
                initialDate={dateRange.endDate}
            />
        </>
    );
}

/**
 * @typedef {{
 *  editMode: boolean,
 *  dateRange: {startDate:Date, endDate:Date},
 *  textProps?: import("react-native-elements").TextProps,
 *  minDate?: Date,
 *  onRangeChange: (newStart:Date, newEnd:Date) => any,
 *  disabled?:boolean,
 * }} EditableDateRangeProps
 */
