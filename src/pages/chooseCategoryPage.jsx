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
    img: 'https://cdn.gencraft.com/prod/user/a275d62c-6004-4894-acc7-a4bdf104d297/9f76b2de-6b4e-4f3b-8346-ad04cc56a5a8/image/image0_0.jpg?Expires=1715173724&Signature=CqxXEjPEigAar1VGdvhGOQEIdP4SKdRI6s7-xBgn~sZPbaYx-5HnUAGXxN8E~LKvEdTDJ086aUu0yuZ-yw6CPpKJXkR1Ec1cG6mcQrn4P~-pdEzeOXx1AIxgABUU~5rr0-HQuTl5wNjHCPuQvuyYFXiIPctys9Id4xxfkecHMxXCtflahApUo1PhU8iQ7-7tDdE3meOY4yW754c0aFo5TQRzJl7pBXBibhlhBMzId1VNOFmMZ3pp4DKtO6A7YHboMKtEaakSNEF-t-Pj7BOC7NVChWCwdM4ZPLGSQMycS5uOLP3aZb-V~XmyLF~q7Tg~4OtQzwVNtgazx~q1BDriTg__&Key-Pair-Id=K3RDDB1TZ8BHT8',
    title: 'View All',
    
    tag: '',
    idx: "0",

  },
  {
    img: 'https://cdn.gencraft.com/prod/user/7c5b0398-eaa9-42fa-8441-322697c5bb2f/5c6bffde-ae95-4973-b072-9d7c55be6730/image/image0_0.jpg?Expires=1715173060&Signature=J40bDZtTupgco5nPKOSuOxz4j3LcC4Omsd0vEqt1xw6IWN2Vw3TnZou5rRIW7frkBM9YZvjs5hQ2qyUrIqcAXgAeWQqK8sOpqCoGlDlR3uLvgLpmrKXDSdwfVnlef5aGesPrrRgyFr8K2uiIUiaxxRkWDr6V-XOFPmsrFPSSLclzZxqNwIN-VsZQysX75lddXY~VBWt76rqb7a-mDxz4C04iD5ElnOQ6851L~zjhCJc1Fsf6vi9QAdH55Oc2K16SrLo0eJcQdAsy1-4~GmxMRU8kVSD~xTAmeZp7jz1FSSCgGHhXZXxQcTGdkKcqdKlKiKqA-OgqvaU7Vfk39jRgRw__&Key-Pair-Id=K3RDDB1TZ8BHT8',
    title: 'Outdoor Equipment',
    
    tag: '· Camping Equipment: Tents, sleeping bags, camping stoves, portable chairs.\n\n· Sports Gear: Bikes, surfboards, kayaks, and outdoor games.',
    idx: "1",
  },
  {
    img: 'https://cdn.gencraft.com/prod/user/a275d62c-6004-4894-acc7-a4bdf104d297/1972c14c-d454-4eb7-a157-ffdc8eb2a226/image/image1_0.jpg?Expires=1715173471&Signature=EJX2Q7dM6gTY8k2D7lKNHLY4Ct0M4ME2rEAGN1xK1SRdIOgPbTm7Vx2gIh6oDR3m3WZ~e1AU4UYdNooiU2-ZLiimxn2yiVz2i96Dr8dcqefhVTGV9P0qtzvaQ52Et-EMGtV08XkC0BM732RbY~Rr0SbeawFMhvS~nK6yO50X-gxO3zR3eS5~rTqSLIuLG63GLXxnN4DBgM6aqa0Zy2MlhoJnldeAHIuIHkh5krQAYzfDq8BTcq5Rnxkb9t3Jz2IaLQA4ap6xMUY30XF60VjZveZ10g0RWSfGWTjihWbeG5prSaKZCkOmtN28zludebDivIBdDCiMwt644VPFzlBqZg__&Key-Pair-Id=K3RDDB1TZ8BHT8',
    title: 'Entertainment & Events',
    tag: '· Speakers and Sound Systems Event Decor: Chairs, tables, party lights, event tents.',
    idx: "2",
  },
  {
    img: 'https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
    title: "Home Improvement",
    
    tag: '· Power Tools: Drills, saws, and other power tools for DIY projects.\n\n· Garden Equipment: Lawnmowers, trimmers, and gardening tools.',
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

        <Text style={styles.title}>CATEGORIES</Text>

        {items.map(({ img, title, tag, idx }, index) => {
          return (
            <TouchableOpacity
            key={idx}
            onPress={() => {
              console.log('Pressed item index:', idx); 
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
    fontSize: 20,
    fontWeight: '700',
    color: '#173153',
    marginLeft: 25,
    marginTop:10,
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
    marginBottom: 30,
    textAlign: 'center',
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