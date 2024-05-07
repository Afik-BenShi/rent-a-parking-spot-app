import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { COLORS } from '../../assets/theme';

export default function SingleSelectListDropDown({ dataToShow, onSelectCategory, placeholderText }) {
    
    const [selected, setSelected] = useState("");
    
    let data = [
        {key:'1', value:'Outdoor equipment'},
        {key:'2', value:'Entertainment & Events'},
        {key:'3', value:'Home Improvement'},
    ];
    
    let formattedData = [];
    data = dataToShow ? dataToShow : data;
    if (!dataToShow) {
        formattedData = data;
    }
    else{
        formattedData = dataToShow.map((value, index) => ({
            key: index.toString(), // Use the index as the key
            value: value // Use the item itself as the label
        }));
    }

    console.log("dataToShow: " + data);

    return (
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={formattedData} 
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