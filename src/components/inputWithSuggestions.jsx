import { Input, Text } from "@rneui/themed";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../assets/theme";

export default function InputWithSuggestions({
    onValueChange = (_)=>{},
    onChooseSuggestion,
    placeholder,
    suggestionsSupplier,
}) {
    const [_value, setValue] = useState("");
    const [suggestionsOpen, setopenSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([{label:"loading..."}]);
    const _suggestionsSupplier = useCallback(suggestionsSupplier,
        []
    );
    const inputChangeHandler = (text) => {
        setValue(text);
        onValueChange(text);
        if (text.length >= 3) {
            setSuggestions([{label:"loading..."}])
            setopenSuggestions(true);
            debouncedPart(text);
        }
    }
    const debouncedPart = debounce(async (text) => {
        const newSuggestions = await _suggestionsSupplier(text);
        setSuggestions(newSuggestions);
    }, 1000);

    const pressSuggestion = (suggestion) => {
        if (!suggestion.value) return;
        setValue(suggestion.label);
        onChooseSuggestion(suggestion);
        setopenSuggestions(false);
    };
    return (
        <View style={styles.container}>
            <Input  value={_value} onChangeText={inputChangeHandler} placeholder={placeholder}/>
            {suggestionsOpen && suggestions.map(({ label, value }) => (
                <TouchableOpacity
                    style={styles.suggestion}
                    key={label}
                    onPress={() => pressSuggestion({ label, value })}
                >
                    <Text>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        gap:-26.5,
        alignItems:"center"
    },
    suggestion:{
        width:"95%",
        backgroundColor:"#fff",
        padding: 12,
        borderWidth:1,
        borderColor:COLORS.grey2
    }
})