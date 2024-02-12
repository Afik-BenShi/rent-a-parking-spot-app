import React, { useState } from "react";
import { Pressable, Text } from "react-native";
import { Button, Image } from "@rneui/themed";

/**
 * @type {React.FC}
 * @param {{
 *  source,
 *  initialHeight:import("react-native").DimensionValue
 * }} props
 */
export default function ExpandableImage({ source, initialHeight }) {
    const [isExpanded, setExpanded] = useState(false);

    const toggleExpandedImage = () => {
        setExpanded((isExpanded) => !isExpanded);
    };
    return (
        <Pressable
            style={{ 
                position: "relative",
                backgroundColor:"rgba(0,0,0,0.1)"
            }}
            onPress={toggleExpandedImage}
        >
            <Image
                style={{
                    height: isExpanded ? 400 : initialHeight,
                    width: "auto",
                }}
                source={source}
                resizeMode="contain"
            />
            <Text
                style={{
                    backgroundColor: "rgba(255,255,255,0.7)",
                    position: "absolute",
                    top: 12,
                    right:12,
                    fontSize: 14,
                    borderRadius:999,
                    padding:12
                }}
            >
                {isExpanded ? "><" : "<>"}
            </Text>
        </Pressable>
    );
}
