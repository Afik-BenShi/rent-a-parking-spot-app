import React from "react";
import {
    StyleSheet,
    View,
    Linking,
    TouchableOpacity,
    Platform,
} from "react-native";
import { Text } from "@rneui/themed";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { COLORS } from "../../assets/theme";

/**
 * @type {React.FC}
 * @typedef {{latitude:number, longitude:number, address?:string}} Location
 * @param {{
 *  location: Location,
 *  description?: string,
 *  showUser?: boolean,
 *  movable?: boolean,
 *  style?: import("react-native").ViewStyle,
 *  }} props
 */
export default function GoogleMaps({
    location,
    description,
    movable = false,
    showUser = false,
    style,
}) {
    const openMap = () => {
        const url =
            Platform.OS == "ios"
                ? `http://maps.apple.com/?ll=${location.latitude},${location.longitude}`
                : `geo:${location.latitude},${location.longitude}?q=${location.latitude},${location.longitude}`;
        Linking.openURL(url);
    };
    return (
        <View style={style}>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                }}
                showsUserLocation={showUser}
                zoomEnabled={movable}
                rotateEnabled={movable}
                pitchEnabled={movable}
                scrollEnabled={movable}
                provider={PROVIDER_GOOGLE}
            >
                <Marker
                    draggable={false}
                    coordinate={location}
                />
            </MapView>
            <TouchableOpacity
                onPress={openMap}
                style={{
                    position: "absolute",
                    bottom: 12,
                    alignSelf: "center",
                }}
            >
                <View
                    style={{
                        padding: 10,
                        backgroundColor: COLORS.btnBlue,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: "white" }}>Navigate</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const mapStyle = [
    //     { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    //     { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    //     { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    //     {
    //         featureType: "administrative.locality",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#d59563" }],
    //     },
    //     {
    //         featureType: "poi",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#d59563" }],
    //     },
    //     {
    //         featureType: "poi.park",
    //         elementType: "geometry",
    //         stylers: [{ color: "#263c3f" }],
    //     },
    //     {
    //         featureType: "poi.park",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#6b9a76" }],
    //     },
    //     {
    //         featureType: "road",
    //         elementType: "geometry",
    //         stylers: [{ color: "#38414e" }],
    //     },
    //     {
    //         featureType: "road",
    //         elementType: "geometry.stroke",
    //         stylers: [{ color: "#212a37" }],
    //     },
    //     {
    //         featureType: "road",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#9ca5b3" }],
    //     },
    //     {
    //         featureType: "road.highway",
    //         elementType: "geometry",
    //         stylers: [{ color: "#746855" }],
    //     },
    //     {
    //         featureType: "road.highway",
    //         elementType: "geometry.stroke",
    //         stylers: [{ color: "#1f2835" }],
    //     },
    //     {
    //         featureType: "road.highway",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#f3d19c" }],
    //     },
    //     {
    //         featureType: "transit",
    //         elementType: "geometry",
    //         stylers: [{ color: "#2f3948" }],
    //     },
    //     {
    //         featureType: "transit.station",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#d59563" }],
    //     },
    //     {
    //         featureType: "water",
    //         elementType: "geometry",
    //         stylers: [{ color: "#17263c" }],
    //     },
    //     {
    //         featureType: "water",
    //         elementType: "labels.text.fill",
    //         stylers: [{ color: "#515c6d" }],
    //     },
    //     {
    //         featureType: "water",
    //         elementType: "labels.text.stroke",
    //         stylers: [{ color: "#17263c" }],
    //     },
];
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    mapStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
