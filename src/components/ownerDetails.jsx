import React from "react";
import { Avatar, Text } from "@rneui/themed";
import { Pressable, StyleSheet, View, Linking } from "react-native";

export function OwnerDetailsBar({ owner }) {
    const makePhoneCall = () => {
        Linking.openURL(`tel:${owner.phoneNumber}`);
    };
    const avatarLetters = getOwnerLetters(owner.name);
    return (
        <Pressable style={{overflow:"visible"}}onPress={makePhoneCall}>
            <View style={barStyles.container}>
                <Avatar
                    size={48}
                    rounded={true}
                    title={avatarLetters}
                    containerStyle={{ backgroundColor: "#46a" }}
                />
                <View style={barStyles.nameAndPhoneContainer}>
                    <Text h4>{owner.name}</Text>
                    <Text>{owner.phoneNumber}</Text>
                </View>
                <Text>📞</Text>
            </View>
        </Pressable>
    );
}

function getOwnerLetters(name) {
    const words = name.split(" ");
    if (!words.length) {
        return "NA";
    }
    const first = words[0].charAt(0);
    const second = words[1]?.charAt(0);
    return (first + second).toUpperCase();
}

const barStyles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        padding: 12,
        gap: 12,
        alignItems: "center",
        borderTopWidth: 1,
        borderBottomWidth:1,
        borderColor: "rgba(0,0,0,0.1)",
    },
    nameAndPhoneContainer: {
        flex: 2,
        flexDirection: "column",
        margin: 0,
        padding: 0,
    },
});
