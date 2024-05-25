import { Button, Icon, Dialog } from "@rneui/themed";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "../../assets/theme";

export function ConfirmationDialog({ dialogState, title }) {
    const { DialogComponent, closeDialog } = dialogState;
    return (
        <DialogComponent overlayStyle={{ position: "relative" }}>
            <View
                style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                }}
            >
                <Pressable onPress={() => closeDialog()}>
                    <Icon name="close" />
                </Pressable>
            </View>
            <View style={{ alignSelf: "center" }}>
                <Dialog.Title title={title} />
            </View>
            <Dialog.Actions>
                <View style={styles.dialogActions}>
                    <Button
                        buttonStyle={{ borderRadius: 6 }}
                        type="outline" onPress={() => closeDialog("close")}>
                        No, go back
                    </Button>
                    <Button
                        buttonStyle={styles.deleteButton}
                        onPress={() => closeDialog("delete")}
                    >
                        Yes, Delete
                    </Button>
                </View>
            </Dialog.Actions>
        </DialogComponent>
    );
}

const styles = StyleSheet.create({
    dialogActions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    deleteButton: {
        alignSelf:"center",
        borderRadius:6,
        backgroundColor: COLORS.red,
    }
})
