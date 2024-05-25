import React, { useCallback, useState } from "react";
import { Input, Text } from "@rneui/themed";
import { debounce } from "lodash";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../assets/theme";

export default function UserLookupByPhone({
    onValueChange = (_) => {},
    onChooseSuggestion,
    placeholder,
    suggestionsSupplier,
}) {
    const [value, setValue] = useState("");
    const regex = /^05[\d]{8}$/;
    const [isValid, setIsValid] = useState(true);
    const [suggestionsOpen, setopenSuggestions] = useState(false);
    const [suggestions, setSuggestions] = useState([{ label: "loading..." }]);
    const _suggestionsSupplier = useCallback(suggestionsSupplier, []);
    const inputChangeHandler = (text) => {
        setValue(text);
        onValueChange(text);
        setopenSuggestions(true);
        setSuggestions([{ label: "waiting for input..." }]);
        if (regex.test(text)) {
            setIsValid(true);
            setSuggestions([{ label: "loading..." }]);
            debouncedPart(text);
        } else {
            setIsValid(false);
            setopenSuggestions(false);
        }
    };

    const debouncedPart = debounce(async (text) => {
        const newSuggestions = await _suggestionsSupplier(text);
        setSuggestions(
            newSuggestions.length > 0
                ? newSuggestions
                : [{ label: "no user found" }]
        );
    }, 1000);

    const pressSuggestion = (suggestion) => {
        if (!suggestion.value) return;
        setValue(suggestion.label);
        onChooseSuggestion(suggestion);
        setopenSuggestions(false);
    };
    return (
        <View style={styles.container}>
            <Input
                value={value}
                errorMessage={!isValid? "Invalid phone number" : undefined}
                onChangeText={inputChangeHandler}
                label={placeholder}
            />
            {suggestionsOpen &&
                suggestions.map(({ label, value }) => (
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
    container: {
        gap: -26.5,
        alignItems: "center",
    },
    suggestion: {
        width: "95%",
        backgroundColor: "#fff",
        padding: 12,
        borderWidth: 1,
        borderColor: COLORS.grey2,
    },
});
