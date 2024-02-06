import React, {useState} from 'react';
import { Slider } from "@rneui/base";
import { Text, View, StyleSheet } from 'react-native';

const SliderBase = () => {
  const [value, setValue] = useState(50);

  return (
    <Slider
      animateTransitions
      animationType="timing"
      maximumTrackTintColor="#ccc"
      maximumValue={100}
      minimumTrackTintColor="#222"
      minimumValue={1}
      onSlidingComplete={() =>
        console.log("onSlidingComplete()")
      }
      onSlidingStart={() =>
        console.log("onSlidingStart()")
      }
      onValueChange={value => 
        console.log("onValueChange()", value)
      }
      orientation="horizontal"
      step={1}
      style={styles.slider}
      thumbStyle={{ height: 20, width: 20 }}
      thumbTintColor="#abdbe3"
      thumbTouchSize={{ width: 40, height: 40 }}
      trackStyle={{ height: 10, borderRadius: 20 }}
      value={value}
    />
  );
}

const SliderLabels = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{props.title}</Text>
            <SliderBase/>
            <View style={styles.labelContainer}>
                <Text style={styles.textLeft}>{`${props.minValue}`}</Text>
                <Text style={styles.textRight}>{`${props.maxValue}`}</Text>
            </View>
        </View>
      );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: 'flex-start',
        alignContent: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 70,
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
        justifyContent: 'space-between',
        width: '80%', // Match the width with the slider for alignment
      },  
    });

  

export default SliderLabels;
