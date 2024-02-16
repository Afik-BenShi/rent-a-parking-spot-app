import { Linking, Platform } from "react-native";

const WHATSAPP_STORE_URL = {
    android: "https://play.google.com/store/apps/details?id=com.whatsapp",
    ios: "https://apps.apple.com/us/app/whatsapp-messenger/id310633997",
};
const WHATSAPP_PREFIX = "whatsaapp://";
const SMS_PREFIX = "sms:";
const CALL_PREFIX = "tel:";

/**
 * @param {string} text
 * @param {string} phoneNumber
 * @param {string | undefined} imageURI
 */
export async function sendWhatsappMessage(phoneNumber, text, imageURI = undefined) {
    const url = buildMessageUrl(WHATSAPP_PREFIX, "send", {
        phone: phoneNumber,
        text,
        imageURI
    });

    const error = await Linking.openURL(url).catch(e => e);
    if (error) {
        Linking.openURL(WHATSAPP_STORE_URL[Platform.OS]).catch(console.error);
        return false;
    }
    return true;
}

/**
 * @param {string} text
 * @param {string} phoneNumber
 */
export async function sendSmsMessage(phoneNumber, text) {
    const url = buildMessageUrl(SMS_PREFIX, phoneNumber, {
        body: text,
    });

    if (await Linking.canOpenURL(url)) {
        const isSuccess = await Linking.openURL(url).catch(console.error);
        return Boolean(isSuccess);
    }
    return false;
}

function buildMessageUrl(prefix, path, params) {
    const encodedParams = Object.entries(params)
        .filter(([_, value]) => value)
        .map(([key, value]) =>
            `${encodeURIComponent(key)}=${(value)}`
        )
        .join("&");
    return prefix + path + "?" + encodedParams;
}

/**
 * @param {string} phoneNumber
 */
export async function makePhoneCall(phoneNumber) {
    const isSuccess = await Linking.openURL(CALL_PREFIX + phoneNumber).catch(
        console.error
    );
    return Boolean(isSuccess);
}
