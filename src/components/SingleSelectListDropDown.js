import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS } from '../../assets/theme';

export default function SingleSelectListDropDown({ dataToShow, onSelectCategory, placeholderText }) {
    
    const [selected, setSelected] = useState("");
    
    // Default data in case dataToShow is not provided
    const defaultData = [
        { key: '1', value: 'Outdoor equipment' },
        { key: '2', value: 'Entertainment & Events' },
        { key: '3', value: 'Home Improvement' },
    ];
    
    // Use provided dataToShow or fallback to defaultData
    const data = dataToShow ? dataToShow.map((value, index) => ({
        key: index.toString(),
        value: value
    })).filter(item => item.value !== undefined) : defaultData;

    console.log("dataToShow: ", data);
    
    return (
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="key"
        placeholder={placeholderText ? placeholderText : "Select product category"}
        //placeholderStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
        //search = {false}   // use search bar or not
        onSelect={() => {
            onSelectCategory(selected);
        }} 
        notFoundText="Oops! We couldn't find any matching results. Please try refining your search."
        labelStyles={{color: 'black', fontSize: 16}}
        defaultOption={""}  
        boxStyles={{backgroundColor:'#fff', 
            borderColor: 'transparent',
            flexDirection: 'row',
            marginVertival:20,
            elevation: 2, // Android shadow
            shadowColor: '#000', // iOS shadow
            shadowOpacity: 0.1, // iOS shadow
            shadowRadius: 2, // iOS shadow
            shadowOffset: {
            width: 0,
            height: 1,
            },}}
        
        inputStyles={{color:COLORS.grey3}}
        dropdownStyles={{backgroundColor:'#fff',
                    borderColor: COLORS.grey3,
            }}
            
       

    />
        
    );
}