import React, { useState } from "react";

import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from './welcome.style'



const InputText = ({ titleText, placeholderText, onChangeTextHandler}) => {
  
  return (
    <Input
      containerStyle={{}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{}}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{}}
      label={titleText ? titleText : ""}      
      labelStyle={styles.sectionTitle} // my style 
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} />}
      leftIconContainerStyle={{}}
      rightIcon={{}}
      rightIconContainerStyle={{}}
      placeholder={placeholderText}

      onChangeText={onChangeTextHandler} // Handle input value change
    />
  );
}

export default InputText;