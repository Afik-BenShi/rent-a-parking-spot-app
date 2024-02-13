import React, { useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

export default function MultipleSelectListDropDown({ onSelectCategory }) {
    
    const [selected, setSelected] = useState([]);
    
    const data = [
        {key:'1', value:'Sports equipment'},
        {key:'2', value:'Clothing'},
        {key:'3', value:'Travel & Outdoors'},
        {key:'4', value:'Ski & Snowboard'},
        {key:'5', value:'Electronics'},
        {key:'6', value:'Home & Kitchen'},
        {key:'7', value:'Mobiles'},
        {key:'8', value:'Books'},
        {key:'9', value:'Computers'},
        {key:'10', value:'Beauty & Health'},
        {key:'11', value:'Garden'},
        {key:'12', value:'Other'},
    ]

    /*
    const onSelectCategory = (item) => {
        console.log(item);
        updated = {...selected, item};
        setDetails(updated);
    };
    */

    return (
        <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        placeholder="Select product categories"
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