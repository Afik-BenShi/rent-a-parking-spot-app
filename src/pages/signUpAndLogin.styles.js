import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";
import { moreStyles } from "./user";

export const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "center",
    },
    signUpContainer: {
        flex: 1,
        backgroundColor: COLORS.lightWhite,
        justifyContent: "center",
    },
    failText: {
        ...moreStyles.profileHandle,
        marginTop: 6,
        marginLeft: 12,
        fontSize: 15,
        fontWeight: "900",
        color: COLORS.red,
    },
    input: {
        height: 44,
        backgroundColor: "#f3eff6", // grey color good
        paddingHorizontal: 12,
        borderRadius: 12,
        fontSize: 15,
        fontWeight: "500",
        color: "#222",
        borderBottomWidth: 0,
    },
    link: {
        ...moreStyles.profileHandle,
        marginTop: 24,
        fontSize: 15,
        textDecorationLine: "underline",
        fontWeight: "900",
        color: COLORS.black,
    },
    tooltip: {
        width: 160,
        height: "auto",
    },
    sections: {
        marginTop: 12,
        paddingLeft: 24,
        alignSelf: "flex-start",
    },
    actionButtons: {
        ...moreStyles.profileAction,
        marginLeft: 0,
        alignSelf: "center",
    },
    ...moreStyles,
});
