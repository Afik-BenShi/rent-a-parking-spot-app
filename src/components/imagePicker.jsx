import React, { useState } from "react";
import * as expoImage from "expo-image-picker";
import { Button, Dialog, Icon } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "../../assets/theme";
import useDialog from "../customStates/useDialog";
import ExpandableImage from "./ExpandableImage";
/**
 *
 * @param {{
 *  imagePickerProps: expoImage.ImagePickerOptions,
 *  disabled?:boolean,
 *  onImagePicked: (image:expoImage.ImagePickerAsset) => any,
 *  onImageRemoved: () => any
 * }} _
 */
export default function ImagePicker({
    onImagePicked,
    onImageRemoved,
    disabled = false,
    imagePickerProps: imagePickeroptions,
}) {
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const imageConfirmation = useDialog();
    const handleImagePick = async () => {
        if (disabled) {
            return;
        }
        setIsLoading(true);
        const result = await expoImage.launchImageLibraryAsync({
            ...imagePickeroptions,
            selectionLimit: 1,
        });
        if (result.canceled) {
            setIsLoading(false);
            return;
        }
        setImage(result.assets[0].uri);
        try {
            const action = await imageConfirmation.openDialog();
            if (action === "select") {
                await onImagePicked(result.assets[0]);
            }
            if (action === "delete") {
                await onImageRemoved();
            }
        } catch (e) {
            console.error(e);
        }
        setIsLoading(false);
    };
    return (
        <View style={styles.container}>
            <Button
                icon={
                    <Icon
                        type="feather"
                        name="image"
                        color={disabled ? COLORS.grey : COLORS.similarToBlack}
                        size={20}
                    />
                }
                title={!image ? "Select Image" : "Replace Image"}
                disabled={disabled}
                loading={isLoading}
                buttonStyle={styles.button}
                titleStyle={styles.buttonLabel}
                disabledTitleStyle={{ color: COLORS.grey }}
                loadingProps={{ color: "#000" }}
                onPress={handleImagePick}
            />
            <imageConfirmation.DialogComponent
                overlayStyle={styles.dialogContainer}
            >
                <Pressable
                    style={{
                        position: "absolute",
                        top: 20,
                        right: 16,
                        zIndex: 1,
                    }}
                    onPress={() => imageConfirmation.closeDialog()}
                >
                    <Icon name="close" />
                </Pressable>
                <View style={{ alignSelf: "center", width: "100%" }}>
                    <Dialog.Title title="This is your image" />
                    <ExpandableImage
                        source={{ uri: image }}
                        initialHeight={200}
                    />
                </View>
                <Dialog.Actions>
                    <View style={styles.dialogActions}>
                        <Button
                            type="outline"
                            buttonStyle={styles.noButton}
                            onPress={() =>
                                imageConfirmation.closeDialog("close")
                            }
                        >
                            Cancel
                        </Button>
                        {image && (
                            <Button
                                type="outline"
                                buttonStyle={styles.noButton}
                                onPress={() =>
                                    imageConfirmation.closeDialog("delete")
                                }
                            >
                                Delete
                            </Button>
                        )}
                        <Button
                            buttonStyle={styles.yesButton}
                            onPress={() =>
                                imageConfirmation.closeDialog("select")
                            }
                        >
                            Great!
                        </Button>
                    </View>
                </Dialog.Actions>
            </imageConfirmation.DialogComponent>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 12,
    },
    button: {
        width: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: COLORS.inputTextGrey,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.grey,
        gap: 6,
    },
    noButton: {
        width: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.btnBlue,
    },
    yesButton: {
        width: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
    },
    buttonLabel: {
        color: COLORS.similarToBlack,
    },
    dialogActions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dialogContainer: {
        position: "relative",
        width: "90%",
    },
});
