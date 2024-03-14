import React, { useState } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

export default function MultipleSelectListDropDown({ onSelectCategory }) {
    
    const [selected, setSelected] = useState("");
    
    const data = [
        {key:'1', value:'Outdoor equipment'},
        {key:'2', value:'Entertainment & Events'},
        {key:'3', value:'Home Improvement'},
    ]

    /*
    const onSelectCategory = (item) => {
        console.log(item);
        updated = {...selected, item};
        setDetails(updated);
    };
    */

    return (
        <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="key"
        placeholder="Select product category"
        //placeholderStyle={{color: 'black', fontSize: 16, fontWeight: 'bold'}}
        //search = {false}   // use search bar or not
        onSelect={() => {
            onSelectCategory(selected);
        }} 
        notFoundText="No suitable category found, try again or choose 'Other'"
        //label="Product categories"
        labelStyles={{color: 'black', fontSize: 16}}
    />
        
    );
}