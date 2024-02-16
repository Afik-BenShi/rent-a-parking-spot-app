import { StyleSheet, Pressable, View } from 'react-native';
import { Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';

import Slider from './slider';
import Button from './button'
import Divider from './divider';



const Filters = ({navigation}) => {
  return (
    <View> 
      <Header
        rightComponent={
          <Pressable onPress={() => navigation.navigate('Home')}>
            <FontAwesome name="filter" color="#fff" size={20} style={styles.filterIcon} />
          </Pressable>
        }
      />
      <Slider minValue={"Distance"} maxValue={"Price"} title={"Sort By"}/>
      <Divider/>
      <Slider minValue={`Cheapest: \n 1`} maxValue={`Highest: \n 100`} title={"Price"}/>
      <Divider/>
      <View style={styles.labelContainer}>
        <Button title={"Choose start time"}/>
        <Button title={"Choose end time"}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  filterIcon: {
      marginTop: 0,
    },
    container: {
        alignSelf: 'flex-start',
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 100,
        marginBottom: 10,
        paddingHorizontal: 20,
      },
    textLeft: {
        left: 60,
        bottom: 10,
        textAlign: 'center',
      },
    textRight: {
        right: -80,
        bottom: 10,
        textAlign: 'center',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
    slider: {
      width: '80%', // Adjust to match the width of labelContainer
      height: 40, 
      marginLeft: 70,
      marginBottom: 15,
      marginTop: 30,
    },
    labelContainer: {
        flexDirection: 'row',
        marginLeft: 30,
        marginTop: 20,
        justifyContent: 'space-between',
        width: '80%', // Match the width with the slider for alignment
      },  
    });


export default Filters;