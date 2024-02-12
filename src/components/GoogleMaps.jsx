import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

/**
 * @type {React.FC}
 * @typedef {{latitude:number, longitude:number, address?:string}} Location
 * @param {{
 *  location: Location,
 *  description?: string,
 *  draggable?: boolean,
 *  showUser?: boolean,
 *  movable?: boolean,
 *  style?: import("react-native").ViewStyle,
 *  onLocationSet?: (newLoc:Location, desc?:string) => void | Promise<void>
 *  }} props
 */
export default function GoogleMaps({
    location,
    description,
    draggable=false,
    movable=false,
    showUser=false,
    onLocationSet,
    style,
}) {
    const dragEndHandler = ({ nativeEvent }) => {
        /** @type {Location} */
        const newLocation = nativeEvent.coordinate;
        if (onLocationSet) {
            onLocationSet(newLocation, description);
        }
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
            >
                <Marker
                    draggable={draggable}
                    coordinate={location}
                    onDragEnd={dragEndHandler}
                    title={location.address}
                    description={description}
                />
            </MapView>
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
