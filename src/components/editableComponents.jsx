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
}) {
    const [text, setText] = useState(value);

    const debouncedOnChange = useCallback(debounce(onChange), [onChange]);
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

/**
 * @typedef {{
*  editMode: boolean,
*  children: string,
*  onChange: (newText: string) => any,
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
    editMode,
    dateRange,
    textProps = {},
    minDate,
    onRangeChange,
}) {
    const [start, setStart] = useState(dateRange.startTime);
    const [end, setEnd] = useState(dateRange.endTime);

    const { startDay, startHour, endDay, endHour } = dateRangeFormat(
        start,
        end
    );
    const debouncedOnChange = useCallback(debounce(onRangeChange), [onRangeChange]);
    const dateChangeHandler = (setFunc) => (newDate) => {
        setFunc(newDate);
        debouncedOnChange(start, end);
    };
    return !editMode ? (
        <Text {...textProps}>
            From {startDay} at {startHour} to {endDay} at {endHour}{" "}
        </Text>
    ) : (
        <>
            <Text {...textProps}>Start Date</Text>
            <DateTimePickerExample
                minDate={minDate}
                onDateChange={dateChangeHandler(setStart)}
            />
            <Text {...textProps}>End Date</Text>
            <DateTimePickerExample
                minDate={minDate}
                onDateChange={dateChangeHandler(setEnd)}
            />
        </>
    );
}

/**
 * @typedef {{
 *  editMode: boolean,
 *  dateRange: {startTime:Date, endTime:Date},
 *  textProps?: import("react-native-elements").TextProps,
 *  minDate?: Date,
 *  onRangeChange: (newStart:Date, newEnd:Date) => any,
 * }} EditableDateRangeProps
 */

