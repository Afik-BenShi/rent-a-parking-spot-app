import React, { useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

export default function MultipleSelectListDropDown({ onSelectCategory }) {
    
    const [selected, setSelected] = useState([]);
    
    // const data = [
    //     {key:'1', value:'Sports equipment'},
    //     {key:'2', value:'Fashion & Style'},
    //     {key:'3', value:'Travel equipment'},
    //     {key:'4', value:'Ski & Snowboard'},
    //     {key:'5', value:'Camping equipment'},
    //     {key:'6', value:'Home'},
    //     {key:'7', value:'Entertainment & Events'},
    //     {key:'8', value:'Technology & Gadgets'},
    //     {key:'9', value:'Navigation devices'},
    //     {key:'10', value:'Beauty & Health'},
    //     {key:'11', value:'Garden & Outdoor'},
    //     {key:'12', value:'Electronics'},
    //     {key:'13', value:'Family & Kids'},
    //     {key:'14', value:'Photography Gear'},
    //     {key:'15', value:'Other'}
    // ]

    const data = [
        {key:'1', value:'Outdoor'},
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
