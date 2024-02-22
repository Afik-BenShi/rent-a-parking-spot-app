import React from "react";
import { ButtonGroup, Icon } from "@rneui/themed";
import * as messeging from "../utils/messaging";
import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";

export function ContactButtons({phoneNumber, color=COLORS.lightWhite, text = ""}) {
    const actionBarButtons = [
        <Icon color={color} name="message-circle" type="feather" />,
        <Icon color={color} name="phone" type="feather" />,
    ];
    const buttonsNames = ["WhatsApp", "Call"];
    const parkingReserveHandler = (typeIndex) => {
        const type = buttonsNames[typeIndex];
        switch (type) {
            case "WhatsApp": {
                messeging.sendWhatsappMessage(phoneNumber, text);
                break;
            }
            case "Call": {
                messeging.makePhoneCall(phoneNumber);
                break;
            }
        }
    };
    return (
        <ButtonGroup
            containerStyle={styles.container}
            buttonContainerStyle={styles.buttons}
            buttons={actionBarButtons}
            onPress={parkingReserveHandler}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        margin: 0,
        padding: 0,
        backgroundColor:'rgba(0,0,0,0)',
        borderColor:'rgba(0,0,0,0)'
    },
    buttons:{
        borderColor:'rgba(0,0,0,0)',
    },
});
