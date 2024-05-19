import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import Welcome from './Welcome';
import styles from './welcome.style';


// is not working
const ProductDescriptionInput = () => {
  const [description, setDescription] = useState('');

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = () => {
    // You can do something with the description here, like saving it to state or sending it to a server
    console.log('Product description:', description);
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        //multiline
        numberOfLines={4} // adjust the number of lines visible initially
        placeholder="Enter product description"
        value={description}
        onChangeText={handleDescriptionChange}
        style={styles.inputControl}
      />
    </View>
  );
};

export default ProductDescriptionInput;
