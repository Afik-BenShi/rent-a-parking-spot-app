import React, {useState} from 'react';
import { ButtonGroup } from "@rneui/themed";
import { Text, StyleSheet } from 'react-native';

const BottomBar = ({navigation}) => {
    const routePages = (value) => {
      switch (value) {
        case 0: 
          navigation.navigate('addParking')
        case 1: 
          navigation.navigate('history')
        case 2: 
          navigation.navigate('changeType')
        case 3: 
          navigation.navigate('current')
        case 4: 
          navigation.navigate('homePage')
      }
    }

    const [selectedIndex, setSelectedIndex] = useState(0);
    return (
    <>
    <ButtonGroup
      buttons={['Update Settings', 'History', 'Tenant', 'My current parking', 'Home']}
      selectedIndex={selectedIndex}
      onPress={(value) => {
        setSelectedIndex(value);
        routePages(value)
      }}
      textStyle={styles.buttonText}
      buttonStyle={styles.button}
      containerStyle={styles.container}   
    />
  </>
)
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      bottom: 10,
      left: 0,
      right: 0,
      backgroundColor: 'lightgray',
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'skyblue',
      height: '100%',
    },
    buttonText: {
      flexWrap: 'wrap',
      textAlign: 'center',
    },
  });
  

// const styles = StyleSheet.create({
// container: {
//   backgroundColor : "#lightgray",
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   right: 0,
//   padding: 10,
//   marginBottom : 10
// },
// button: {
//     flex: 1,
//     margin: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
// })

export default BottomBar;