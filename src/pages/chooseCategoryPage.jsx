import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { COLORS } from '../../assets/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const items = [
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/rentalwize-481c2.appspot.com/o/assets%2Fall.jpeg?alt=media&token=6d1e427f-8cfa-4d7a-ba5d-7c68d9650e72',
    title: 'View All',
    
    tag: '',
    idx: "0",

  },
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/rentalwize-481c2.appspot.com/o/assets%2Foutdoor.jpeg?alt=media&token=608a24e5-d5d7-477a-8fd5-6ad1b5b294a5',
    title: 'Outdoor Equipment',
    
    tag: 'Camping Equipment: Tents, sleeping bags, camping stoves, portable chairs.\nSports Gear: Bikes, surfboards, kayaks, and outdoor games.',
    idx: "1",
  },
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/rentalwize-481c2.appspot.com/o/assets%2Fevents.jpeg?alt=media&token=041c7210-164a-4a8e-9e0c-20aa540f9856',
    title: 'Entertainment & Events',
    tag: 'Speakers and Sound Systems Event Decor: Chairs, tables, party lights, event tents.',
    idx: "2",
  },
  {
    img: 'https://firebasestorage.googleapis.com/v0/b/rentalwize-481c2.appspot.com/o/assets%2Fhome-improvement.jpeg?alt=media&token=dd90d5c1-4a01-4f31-9a7d-42ca8544bf1f',
    title: "Home Improvement",
    
    tag: 'Power Tools: Drills, saws, and other power tools for DIY projects.\nGarden Equipment: Lawnmowers, trimmers, and gardening tools.',
    idx: "3",
  },
];

const categories = [
    {key:"0", label:'View All'},
    {key:"1", label:'Outdoor Equipment'},
    {key:"2", label:'Entertainment & Events'},
    {key:"3", label:'Home Improvement'},
  ];



export default function ChooseCategory({ navigation }) {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.title}>RentalWize</Text>
        <Text style={styles.subtitle}>A marketplace to rent Every-Day items in your community</Text>
        {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity> */}

        <Text style={styles.catTitle}>CATEGORIES</Text>

        {items.map(({ img, title, tag, idx }, index) => {
          return (
            <TouchableOpacity
            key={idx}
            onPress={() => {
              navigation.navigate('HomeCard', {category:idx});
            }}>
              <View style={styles.card}>
                <Image
                  alt=""
                  resizeMode="cover"
                  source={{ uri: img }}
                  style={styles.cardImg} />

                
                <View style={styles.cardBody}>
                  
                <View style={styles.cardTitle}>
                        <Text style={styles.cardTitle}>{title} </Text>
                        <FontAwesome name="angle-right" size={20} color="#000" style={styles.icon} /> 
                  </View>
                  <Text style={styles.cardTag}>{tag}</Text>
                  
                </View>
                </View>
             
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom:130,
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    color: '#173153',
    marginTop:20,
    alignSelf:'center',
  },
  catTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#173153',
    marginTop:10,
    marginBottom:10,
  },
  /** Card */
  card: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  cardImg: {
    justifyContent:'center',
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  cardBody: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    marginBottom:8,
  },
  cardTag: {
    fontWeight: '500',
    fontSize: 12,
    color: '#939393',
    marginBottom: 7,
    
  },
  cardTitle: {
    alignContent:'space-between',
    flexDirection: 'row',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    color: '#000',
    marginBottom: 8,
  },
  cardRow: {
    //flexDirection: 'row',
    // alignItems: 'center',
    // marginHorizontal: -8,
    
  },
  cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    borderRightWidth: 1,
    borderColor: 'transparent',
  },
  cardRowItemImg: {
    width: 22,
    height: 22,
    borderRadius: 9999,
    marginRight: 6,
  },
  cardRowItemText: {
    fontWeight: '400',
    fontSize: 13,
    color: '#939393',
  },
  cardRowDivider: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#939393',
  },
  icon: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});