import { Linking, Platform } from "react-native";

const WHATSAPP_STORE_URL = {
    android: "https://play.google.com/store/apps/details?id=com.whatsapp",
    ios: "https://apps.apple.com/us/app/whatsapp-messenger/id310633997",
};
const WHATSAPP_PREFIX = "whatsapp://";
const SMS_PREFIX = "sms:";

/**
 * @param {string} text
 * @param {string} phoneNumber
 * @param {string?} imageURI
 */
export async function sendWhatsappMessage(phoneNumber, text, imageURI) {
    const url = buildMessageUrl(WHATSAPP_PREFIX, "send", {
        phoneNumber,
        text,
        imageURI,
    });

    if (await Linking.canOpenURL(url)) {
        await Linking.openURL(url).catch(console.error);
    } else {
        Linking.openURL(WHATSAPP_STORE_URL[Platform.OS]).catch(console.error);
    }
}
/**
 * @param {string} text
 * @param {string} phoneNumber
 */
export async function sendSmsMessage(phoneNumber, text) {
    const url = buildMessageUrl(SMS_PREFIX, phoneNumber, {
        body: text,
    });

    let isSuccess;
    if (await Linking.canOpenURL(url)) {
        isSuccess = await Linking.openURL(url).catch(console.error);
    } else {
        isSuccess = await Linking.openURL(WHATSAPP_STORE_URL[Platform.OS]).catch(console.error);
    }
    return !!isSuccess;
}   

function buildMessageUrl(prefix, path, params) {
    const encodedParams = Object.entries(params)
        .map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&");
    return prefix + path + "?" + encodedParams;
}
