import React, { Component } from 'react';
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StyleSheet } from 'react-native';

const CalendarComponent = ({
    disabledDates,
    minDate,
    maxDate,
}) => {
    // Convert the array into an object with keys representing the dates
    const markedDates = {};
    disabledDates.forEach(dateString => {
        markedDates[dateString] = { disabled: true };
    });

    // Format minDate and maxDate
    const formattedMin = `${minDate.getFullYear()}-${(minDate.getMonth() + 1).toString().padStart(2, '0')}-${minDate.getDate().toString().padStart(2, '0')}`;
    const formattedMax = `${maxDate.getFullYear()}-${(maxDate.getMonth() + 1).toString().padStart(2, '0')}-${maxDate.getDate().toString().padStart(2, '0')}`;

    console.log('formattedMin', maxDate);
    console.log('formattedMax', formattedMax);
    return (
        <View>
            <Calendar
                markedDates={markedDates}
                monthFormat='MMM yyyy'
                minDate={formattedMin}
                maxDate={formattedMax}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    about: {
        marginHorizontal: 20,
        marginTop: 8,
      },
});


export default CalendarComponent;

// export default class CalendarComponent extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           disabledDates: {
//             '2024-04-15': { disabled: true, disableTouchEvent: true },
//             '2024-04-20': { disabled: true, disableTouchEvent: true },
//             // Add more disabled dates as needed
//             minDate: '2024-04-01', // Minimum enabled date
//         maxDate: '2024-04-30', // Maximum enabled date
//           },
//         };
//       }

//       render() {
//         return (
//           <View style={{ flex: 1 }}>
//             <Calendar
//                 markedDates={this.state.disabledDates}
//                 monthFormat='MM yyyy'
//                 minDate={this.state.minDate}
//                 maxDate={this.state.maxDate}
//             />
//           </View>
//         );
//       }
    
// };