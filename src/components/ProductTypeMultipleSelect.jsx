import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ProductTypeMultipleSelect = ({ selectedCategory, onSelectProductType, title, placeholder }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    // Simulating fetching product types based on the selected category
    const fetchedProductTypes = fetchProductTypes(selectedCategory);
    setProductTypes(fetchedProductTypes);
  }, [selectedCategory]);

  const fetchProductTypes = (category) => {
    // Here, you can implement logic to fetch product types based on the selected category
    // For simplicity, we'll use static data
    const productTypeOptions = {
      'Sports equipment': ['Soccer Ball', 'Basketball', 'Tennis Racket', 'Bicycle'],
      'Fashion & Style': ['Clothing', 'Accessories', 'Shoes', 'Handbags'],
      'Travel equipment': ['Suitcase', 'Backpack', 'Travel Pillow', 'Portable Charger'],
      'Ski & Snowboard': ['Skis', 'Snowboard', 'Ski Boots', 'Snow Goggles'],
      'Camping equipment': ['Tent', 'Plastic Table', 'Outdoor Stove', 'Sleeping Bag'],
      'Home': ['Furniture', 'Home Decor', 'Kitchen Appliances', 'Bedding'],
      'Entertainment & Events': ['Concert Tickets', 'Movie Tickets', 'Board Games', 'Event Space'],
      'Technology & Gadgets': ['Laptop', 'Smartphone', 'Headphones', 'Camera'],
      'Navigation devices': ['GPS', 'Smartwatch', 'Compass', 'Map'],
      'Beauty & Health': ['Skincare', 'Makeup', 'Haircare', 'Fitness Equipment'],
      'Garden & Outdoor': ['Outdoor Furniture', 'Gardening Tools', 'Grill', 'Hammock'],
      'Electronics': ['TV', 'Game Console', 'Smart Home Devices', 'Sound System'],
      'Family & Kids': ['Toys', 'Strollers', 'Baby Gear', 'Children's Clothing'],
      'Photography Gear': ['Camera', 'Lenses', 'Tripod', 'Camera Bag'],
      'Other': ['Miscellaneous Items'],
    };

    return productTypeOptions[category] || [];
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleSelection = (item) => {
    onSelectProductType(item);
    toggleModal();
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal}>
        <View>
          <Text>{title}</Text>
          <Text>{placeholder}</Text>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View>
          <Text onPress={toggleModal}>Close</Text>
        </View>
        {productTypes.map((item) => (
          <TouchableOpacity key={item} onPress={() => handleSelection(item)}>
            <View>
              <Text>{item}</Text>
              <AntDesign name="checkcircle" size={24} color="black" />
            </View>
          </TouchableOpacity>
        ))}
      </Modal>
    </View>
  );
};

export default ProductTypeMultipleSelect;
