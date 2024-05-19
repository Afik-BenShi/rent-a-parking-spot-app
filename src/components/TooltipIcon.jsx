import React from "react";
import { Tooltip } from "@rneui/themed";
import FeatherIcon from "react-native-vector-icons/Feather";

function ControlledTooltip(props) {
    const [open, setOpen] = React.useState(false);
    return (
        <Tooltip
            visible={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            containerStyle
            {...props} />
    );
}
/**
 *
 * @param {{
 *  popover:  React.ReactElement<{}, string | React.JSXElementConstructor<any>>,
 * iconName?: string,
 * tooltipStyle?:import("react-native").StyleProp<import("react-native").ViewStyle>,
 * tooltipBGColor?:string,
 * iconSize?:number,
 * iconColor?:string,
 * }} param
 * @returns
 */
export function TooltipIcon({
    popover, iconName = "info", tooltipStyle = undefined, tooltipBGColor = undefined, iconSize = undefined, iconColor = undefined,
}) {
    return (
        <ControlledTooltip
            containerStyle={tooltipStyle}
            backgroundColor={tooltipBGColor}
            popover={popover}
        >
            <FeatherIcon size={iconSize} color={iconColor} name={iconName} />
        </ControlledTooltip>
    );
}
