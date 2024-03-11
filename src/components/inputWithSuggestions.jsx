import { Input, Text } from "@rneui/themed";
import { debounce } from "lodash";
import React, { useCallback, useState } from "react";
import { Touchable, TouchableOpacity, View } from "react-native";

export default function inputWithSuggestions({
    onValueChange,
    onChooseSuggestion,
    value,
    suggestionsSupplier,
}) {
    const [_value, setValue] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const _suggestionsSupplier = useCallback(
        debounce(suggestionsSupplier, 1000),
        []
    );
    const inputChangeHandler = async (text) => {
        onValueChange(text);
        if (text.length >= 3) {
            const newSuggestions = await _suggestionsSupplier();
            setSuggestions(newSuggestions);
        }
    };
    const pressSuggestion = (suggestion) => {
        setValue(suggestion.label);
        onChooseSuggestion(suggestion);
    };
    return (
        <View>
            <Input value={_value} onChange={inputChangeHandler} />
            {suggestions.map(({ label, value }) => (
                <TouchableOpacity
                    key={label}
                    onPress={() => pressSuggestion({ label, value })}
                >
                    <Text>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}
