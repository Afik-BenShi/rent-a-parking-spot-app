import React, { useState } from 'react';
import { View, Button, Platform , Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { COLORS } from '../../assets/theme';
import FeatherIcon from 'react-native-vector-icons/Feather';

const DateTimePickerExample = ({ minDate, onDateChange }) => {
    const [date, setDate] = useState(new Date());
    const [showDate, setShowDate] = useState(false);
    
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate;

      setDate(currentDate);
      onDateChange(currentDate);
    };
  
    const showDatepicker = () => {
        setShowDate(true);
    };
  
    const handleOK = () => {
        setShowDate(false);
        console.log(date ? date.toLocaleString() : 'Not selected');
    };
    
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
            
            {/*
            <TouchableOpacity style={styles.button} onPress={showDatepicker}>
                <Text style={styles.buttonText}>Click here to select date and time</Text>
            </TouchableOpacity>
            
            {showDate && (
                <>
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='datetime'
                    minimumDate={minDate} // Set minimum date to today for date picker
                    minuteInterval={15} // Set 15-minute interval for time picker
                    is24Hour={true}
                    onChange={onChange}
                />
            
                <View style={styles.container}>
                    <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity>
                </View>

                </>
            )}
            */}
            {/* ------- */}
                
            <TouchableOpacity
                    onPress={showDatepicker}
                    style={styles.picker}>
                    <FeatherIcon color="#000" name="calendar" size={18} />

                    <View style={styles.pickerDates}>
                        <Text style={[styles.pickerDatesText, { margin: 5, marginLeft: 10}]}>
                        {formattedDate}
                        </Text>
                    </View>

                    <View style={styles.pickerAction}>
                        <Text style={styles.pickerActionText}>Change</Text>

                        <FeatherIcon
                        color="#4C6CFD"
                        name="chevron-down"
                        size={18}
                        marginRight={10} />
                    </View>
            </TouchableOpacity>
            

            {/* ------- */}

            {showDate && (
                <View style={styles.dateSelctor}>
                    <View style={styles.dateSelctor}>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode='date'
                            minimumDate={minDate} // Set minimum date to today for date picker
                            //minuteInterval={15} // Set 15-minute interval for time picker
                            is24Hour={true}
                            onChange={onChange}
                        />
                    </View>
                
                    <View style={styles.container}>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleOK}>
                            <Text style={styles.buttonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* 
            <Text style={styles.selectedDate}>Selected Date: 
            <Text style={{color: COLORS.black, fontWeight: 'bold', fontSize: 20}}>  {formattedDate}</Text></Text>
            
            
            <Text style={styles.selectedDate}>Selected Time:    
            <Text style={{color: COLORS.black, fontWeight: 'bold', fontSize: 20}}>  {formattedTime}</Text></Text>
            */}



        </View>
        </SafeAreaView>
    );
  };

    const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },

    dateSelctor: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    /** Picker */
    picker: {
        marginTop: 12,
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f5f5f5',
    },
    pickerDates: {
        marginLeft: 12,
    },
    pickerDatesText: {
        fontSize: 15,
        fontWeight: '500',
    },
    pickerAction: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerActionText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '600',
        color: '#4c6cfd',
    },
    
    
    selectedDate: {
        margin: 10,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        alignSelf: 'flex-start',
    },
    cancelButton: {
        height: 50,
        width: 150,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    button: {
        height: 50,
        width: 300,
        backgroundColor: 'oldlace', // Use your desired button background color
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    buttonText: {
        color: COLORS.black, 
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DateTimePickerExample;
