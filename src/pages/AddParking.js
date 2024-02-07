import React, { useState } from 'react';
import { SafeAreaView, ScrollView} from "react-native";
import Welcome from "../components/Welcome";

  import { COLORS} from "../../assets/theme";

    
const AddParking = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <ScrollView>
                <Welcome/>
            </ScrollView>    
        </SafeAreaView>   
    )
}

export default AddParking;