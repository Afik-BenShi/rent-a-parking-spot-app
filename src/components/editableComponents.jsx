import React, { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Input } from "@rneui/themed";
import { dateRangeFormat } from "../utils/dateTime";
import DateTimePickerExample from "./DatePick";
import { debounce } from "../utils/utils";
import ExpandableImage from "./ExpandableImage";
import ImagePicker from "./imagePicker";

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
    disabled = false,
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


/**
 * @type {React.FC}
 * @param {EditableImageProps} _ 
 */
export function EditableImage({
    editMode,
    source,
    isChanged=false,
    initialHeight = 200,
    onImageChanged,
    onImageRevert,
    imagePickerProps,
}) {
    const [image, setImage] = useState(source);
    const [_isChanged, setChanged] = useState(isChanged);
    const imageChangedHandler = (newImage) => {
        setImage(newImage);
        setChanged(true);
        onImageChanged(newImage);
    }
    const imageRevertHandler = () => {
        setImage(source);
        setChanged(false);
        onImageRevert(source);
    }
    return (
        <>
            <ExpandableImage source={image} initialHeight={initialHeight} />
            {editMode && (
                <ImagePicker
                    showRevert={_isChanged}
                    uri={image.uri}
                    {...imagePickerProps}
                    onImagePicked={imageChangedHandler}
                    onRevert={imageRevertHandler}
                />
            )}
        </>
    );
}

/**
 * @typedef {{
*  editMode: boolean,
*  source,
*  isChanged?:boolean
*  initialHeight?: import("react-native").DimensionValue,
*  onImageChanged: (image: import('expo-image-picker').ImagePickerAsset) => any,
*  onImageRevert: (oldImage) => any,
*  imagePickerProps?: Parameters<ImagePicker>[0],
* }} EditableImageProps
*/