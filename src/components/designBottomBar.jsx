import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { COLORS } from '../../assets/theme';

export default function BottomBar({ navigation }) {
    
    const tabs = ['Update Settings', 'History', 'Tenant', 'My current parking', 'Home'];
    const [selectedIndex, setSelectedIndex] = useState(4);

    const routePages = (index) => {
        setSelectedIndex(index);
        switch (index) {
            case 0: 
                navigation.navigate('addParking');
                break;
            case 1: 
                navigation.navigate('history');
                break;
            case 2: 
                navigation.navigate('changeType');
                break;
            case 3: 
                navigation.navigate('current');
                break;
            case 4: 
                navigation.navigate('homePage');
                break;
        }
    }

    return (
        <View style={styles.overlay}>
            <View style={styles.footer}>
                {tabs.map((buttonText, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setSelectedIndex(index);
                            routePages(index)
                          }}
                        style={styles.buttonContainer}
                    >
                        <View style={[styles.btn, selectedIndex === index && styles.selectedButton]}>
                            <Text style={[styles.btnText, selectedIndex === index && styles.selectedText]}>{buttonText}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 8,
        paddingBottom: 25,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        height: 100,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: 2,
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 2,
        paddingHorizontal: 6,
        backgroundColor: COLORS.lightBackground,
        borderColor: 'transparent',
        borderWidth: 1,
        height: 60,
    },
    btnText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#6b7280',
        textAlign: 'center',
    },
    selectedButton: {
        backgroundColor: '#BDBDBD',
    },
    selectedText: {
        color: COLORS.darkBlue,
    },
});
