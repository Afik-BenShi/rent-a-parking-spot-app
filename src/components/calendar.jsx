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
        const date = new Date(dateString);
        var formattedDate = date.toLocaleDateString(); // Convert to localized date string
        const [minDay, minMonth, minYear] = formattedDate.split('/');
        formattedDate = `${minYear}-${minMonth}-${minDay}`;
        markedDates[formattedDate] = { disabled: true };
    });

    console.log(disabledDates);
    const formattedMin = minDate.toLocaleDateString(); // Convert to localized date string
    const formattedMax = maxDate.toLocaleDateString();  
    const [minDay, minMonth, minYear] = formattedMin.split('/');
    const [maxDay, maxMonth, maxYear] = formattedMax.split('/');

    // Rearrange the components into "YYYY-MM-DD" format
    const parsedMinDate = `${minYear}-${minMonth}-${minDay}`;
    const parsedMaxDate = `${maxYear}-${maxMonth}-${maxDay}`;

    console.log(parsedMinDate);
    return (
        <View>
            <Calendar
                markedDates={markedDates}
                monthFormat='MMM yyyy'
                minDate={parsedMinDate}
                maxDate={parsedMaxDate}
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