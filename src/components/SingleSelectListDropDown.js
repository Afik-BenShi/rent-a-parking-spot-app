import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

export default function SingleSelectListDropDown({ dataToShow, onSelectCategory, placeholderText }) {
    
    const [selected, setSelected] = useState("");
    
    let data = [
        {key:'1', value:'Outdoor equipment'},
        {key:'2', value:'Entertainment & Events'},
        {key:'3', value:'Home Improvement'},
    ];

    data = dataToShow ? dataToShow : data;

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
        notFoundText="No suitable category found, try again or choose 'Other'"
        //label="Product categories"
        labelStyles={{color: 'black', fontSize: 16}}
        defaultOption={""}
        
    />
        
    );
}