import React, { useEffect, useState } from "react";
import * as expoImage from "expo-image-picker";
import { Button, Dialog, Icon } from "@rneui/themed";
import { Pressable, StyleSheet, View } from "react-native";
import { COLORS } from "../../assets/theme";
import useDialog from "../customStates/useDialog";
import ExpandableImage from "./ExpandableImage";
/**
 *
 * @param {{
 *  imagePickerProps?: expoImage.ImagePickerOptions,
 *  disabled?:boolean,
 *  onImagePicked: (image:expoImage.ImagePickerAsset) => any,
 *  uri?: string,
 *  showRevert: boolean,
 *  onRevert?: () => any
 * }} _
 */
export default function ImagePicker({
    onImagePicked,
    showRevert = false,
    onRevert = ()=> {},
    uri = "",
    disabled = false,
    imagePickerProps = {},
}) {
    const [image, setImage] = useState(uri);
    const [isLoading, setIsLoading] = useState(false);
    const imageConfirmation = useDialog();
    const [imagePermissionsGranted, setImagePermissionsGranted] = useState(false)
    
    useEffect(() => {
        (async () => {
            const libraryStatus = await expoImage.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await expoImage.requestCameraPermissionsAsync();
            console.log('libraryStatus', libraryStatus)
            console.log('cameraStatus', cameraStatus)

            if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
                alert('Sorry, we need camera roll and media permissions to make this work!');
            }
            else {
                setImagePermissionsGranted(true)
            }
        })();
    }, [imagePermissionsGranted]);

    const handleImagePick = async () => {
        if (disabled || !imagePermissionsGranted) {
            return;
        }
        setIsLoading(true);
        const result = await expoImage.launchImageLibraryAsync({
            ...imagePickerProps,
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
            } else {
                setImage('');
            }
        } catch (e) {
            console.error(e);
            setImage('');
        }
        setIsLoading(false);
    };
    const handleImageRevert = () => {
        setImage('');
        onRevert()
    }
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
            <Button
                title="Revert"
                disabled={!showRevert}
                buttonStyle={styles.revertButton}
                titleStyle={{...styles.buttonLabel, color:COLORS.white}}
                disabledTitleStyle={{ color: COLORS.grey }}
                loadingProps={{ color: "#000" }}
                onPress={handleImageRevert}
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
    revertButton: {
        width: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        gap: 6,
        backgroundColor:COLORS.red
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