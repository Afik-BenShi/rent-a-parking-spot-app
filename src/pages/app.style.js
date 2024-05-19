import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../assets/theme";

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    TopView: {
        width: '100%',
        height: '30%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    ButtomView: {
        width: '100%',
        height: '70%',
        backgroundColor: COLORS.blue3,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    TopViewOpen: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    ButtomViewOpen: {
        width: '100%',
        height: '40%',
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        //display: 'flex',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    Img: {
        flex: 1,
        width: '100%',
        resizeMode: 'cover',
    },
    Heading: {
        fontSize: 34,
        fontWeight: 'bold', 
        color: COLORS.black,
        marginTop: 80,
    },
    openPageHeading: {
        fontSize: 26,
        fontWeight: 'bold', 
        color: COLORS.black,
        marginTop: 80,
    },
    sectionTitle: {
        fontSize: 26,
        color: COLORS.grey2,
        fontWeight: 'bold',
        marginTop: 30,
    },
});

export default styles;