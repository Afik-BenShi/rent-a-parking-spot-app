import React, { useState, useRef, useCallback } from "react";
import { Dialog } from "@rneui/themed";

export default function useDialog() {
    const [isVisible, setIsVisible] = useState(false);
    const resolvedRef = useRef((_) => {});

    const openDialog = useCallback(() => {
        setIsVisible(true);
        return new Promise((resolve) => {
            return (resolvedRef.current = resolve);
        });
    }, []);

    const closeDialog = useCallback((action = "") => {
        setIsVisible(false);
        resolvedRef.current(action);
    }, []);

    /** @param {Omit<import("react-native-elements").DialogProps, "isVisible">} props */
    const DialogComponent = (props) => {
        //@ts-ignore
        const { isVisible: _ = null, children, ..._props } = props;
        return (
            <Dialog isVisible={isVisible} {..._props}>
                {children}
            </Dialog>
        );
    };
    return { openDialog, closeDialog, DialogComponent };
}
