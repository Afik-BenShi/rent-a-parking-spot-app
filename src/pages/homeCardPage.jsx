import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  RefreshControl,
} from 'react-native';
import { Header, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Import the mock data for home page:
import { rentalItems } from '../../assets/mockData';

import { COLORS } from '../../assets/theme';
import CardList from '../components/cardList';
import RBSheet from 'react-native-raw-bottom-sheet';
import { ThemeConsumer } from 'react-native-elements';



const items = [
    {key:'1', label:'Sports equipment'},
    {key:'2', label:'Fashion & Style'},
    {key:'3', label:'Travel equipment'},
    {key:'4', label:'Ski & Snowboard'},
    {key:'5', label:'Camping equipment'},
    {key:'6', label:'Home'},
    {key:'7', label:'Entertainment & Events'},
  ];

  
const CIRCLE_SIZE = 18;
const CIRCLE_RING_SIZE = 2;
  

export default function HomeCardPage ({navigation}) {

    
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showSelectBtn, setShowSelectBtn] = useState(true);
    const [showSelectedCategory, setShowSelectedCategory] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
    
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
      }, []);
    

    const sheet = React.useRef();
    const [value, setValue] = React.useState();

    const handleDonePress = () => {
        console.log("Selected category: ", selectedCategory);
        sheet.current.close();
        //setShowSelectBtn(false);
        setShowSelectedCategory(true);
    }
    

    return(
        <SafeAreaView style={styles.layout}>
                <Header
                    leftComponent={
                    <Pressable onPress={() => console.log('Menu button pressed!')}>
                        <FontAwesome name="bars" color={COLORS.cartTitle} size={20} style={styles.menuIcon} />
                    </Pressable>
                    }
                    centerComponent={
                    <View style={styles.centerHeader}>
                        <Text style={styles.headerText}>
                        Rental
                        <FontAwesome5 name="box-open" size={25} color={COLORS.cartTitle} style={styles.logoIcon} />
                        Wise
                        </Text>
                    </View>
                    }
                    rightComponent={
                    <Pressable onPress={() => navigation.navigate('filters')}>
                        <FontAwesome5 name="filter" color={COLORS.btnBlue} size={25} style={styles.filterIcon} />
                    </Pressable>
                    }
                    containerStyle={styles.headerContainer}
                />  
            
            
            
            <ScrollView
            refreshControl={
                <RefreshControl
                  refreshing={false} // Set refreshing state here
                  onRefresh={onRefresh} // Pass onRefresh function here
                />
              }
            >
                
            
            <View style={{justifyContent:'center'}}>

                { showSelectBtn && 
                    ( <View style={{backgroundColor: COLORS.cardBackground}}>
                        <TouchableOpacity
                        onPress={() => sheet.current.open()}
                        style={styles.picker}>

                        <View style={styles.pickerAction}>
                            <Text style={styles.pickerActionText}>Change Category   </Text>

                            <FeatherIcon
                            color="#4C6CFD"
                            name="chevron-down"
                            size={18}
                            marginRight={10} />
                        </View>
                        </TouchableOpacity>
                    </View>
                    )}
                
                {showSelectedCategory && 
                    (<View style={{backgroundColor: COLORS.cardBackground, flexDirection: 'row', alignContent: 'stretch'}}>
                        <Text style={styles.title}>{selectedCategory}</Text>
                    </View>)}
            </View>
                                    
            <View style={styles.container}>
                <CardList
                    items={rentalItems}
                    title=""
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />}
                />
            </View>
                
            </ScrollView>

            

        {/*****************************************/}
        <RBSheet
        customStyles={{ container: styles.sheet }}
        height={500}
        openDuration={250}
        ref={sheet}>
        
        <View style={styles.sheetHeader}>
          <View style={{ width: 60 }} />

          <Text style={styles.sheetHeaderTitle}>Select Category</Text>

          <TouchableOpacity
            onPress={handleDonePress}>
            <View style={{ width: 60, alignItems: 'flex-end' }}>
              <Text style={styles.done}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.sheetBody}>
          {items.map(({ key, label }, index) => {
            const isActive = value === index;
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setValue(index);
                  setSelectedCategory(items[index].label);
                }}>
                <View style={styles.radio}>
                  
                  <Text style={styles.radioLabel}>{label}</Text>

                  <View style={styles.radioCircle}>
                    <View
                      style={[
                        styles.radioCircleInset,
                        isActive && { backgroundColor: '#ff6a55' },
                      ]} />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity
            style={styles.radio}
            onPress={() => {
                setValue(null);
                setSelectedCategory(""); }}>
            <FeatherIcon name="trash" color="#ff6a55" size={20} />
            <Text style={[styles.radioLabel, { color: '#ff6a55' }]}>
              Remove selection
            </Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
      {/*****************************************/}
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    layout: {
        flex: 1, 
        backgroundColor: COLORS.lightWhite, 
        alignContent: 'center',
        justifyContent: 'center', 
    },
    title: {
        fontSize: 25,
        fontWeight: '800',
        color: '#173153',
        marginLeft: 14,
      },
    sec_title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#5f697d',
        marginLeft: 14,
    },
    container: {
        flex: 1, 
        justifyContent: 'flex-start',
        flexDirection: 'column',
    },
    // header
    headerContainer: {
        backgroundColor: COLORS.cardBackground,
        justifyContent: 'flex-start',
        height: 110,
        marginTop: -30,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grey2,
      },
      headerText: {
        color: COLORS.cartTitle,
        fontWeight: '700',
        fontSize: 24,
        fontFamily: 'Roboto',
        textAlign: 'center',
        marginTop: 0,
      },
      centerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      logoIcon: {
        marginRight: 5,
      },
      menuIcon: {
        marginTop: 0,
      },
      filterIcon: {
        marginTop: 0,
      },
    
    //select category
    picker: {
        marginTop: 12,
        paddingVertical: 14,
        paddingHorizontal: 15,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        margin: 20,
        elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 2, // iOS shadow
        shadowOffset: {
            width: 0,
            height: 1,
        },
    },
    pickerDates: {
        marginLeft: 12,
    },
    pickerDatesText: {
        fontSize: 15,
        fontWeight: '500',
    },
    pickerAction: {
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerActionText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '600',
        color: '#4c6cfd',
    },
     /** RBsheet */
    done: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff6a55',
    },
        /** Placeholder */
    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 24,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Sheet */
    sheet: {
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
    },
    sheetHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#efefef',
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    sheetHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    sheetBody: {
        paddingHorizontal: 24,
        paddingVertical: 14,
    },
    /** Radio */
    radio: {
        height: 44,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingVertical: 4,
        paddingHorizontal: 0,
    },
    radioLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
        marginLeft: 12,
        marginRight: 'auto',
    },
    radioCircle: {
        width: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        height: CIRCLE_SIZE + CIRCLE_RING_SIZE * 4,
        borderRadius: 9999,
        backgroundColor: 'transparent',
        borderWidth: CIRCLE_RING_SIZE,
        borderColor: '#d4d4d4',
    },
    radioCircleInset: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: 9999,
        position: 'absolute',
        top: CIRCLE_RING_SIZE,
        left: CIRCLE_RING_SIZE,
        },
    
});