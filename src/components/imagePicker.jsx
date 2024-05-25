import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


import styles from './addProduct.style';
import { COLORS } from "../../assets/theme";


const ImagePickerScreen = () => {
    const [image, setImage] = useState(null);
    const [permissionsGranted, setPermissionsGranted] = useState(false);

    useEffect(() => {
        (async () => {
            const libraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
            const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

            if (libraryStatus.status !== 'granted' || cameraStatus.status !== 'granted') {
                alert('Sorry, we need camera roll and media permissions to make this work!');
            }
            else {
                setPermissionsGranted(true)
            }
        })();
    }, [permissionsGranted]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log('result', result)
        if (!result.cancelled) {
            setImage(result.uri);
            //TODO: need to upload the image here
        }
    };

    return (
        <TouchableOpacity style={styles.uploadImgButton} onPress={pickImage}>
            <Text style={styles.buttonText}>
                {<MaterialIcons color={COLORS.similarToBlack} name="file-upload" size={15} />}
                Upload image</Text>
        </TouchableOpacity>
    );
};

export default ImagePickerScreen;
