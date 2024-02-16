import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { COLORS } from '../../assets/theme';

export default function Profile({ navigation , route}) {
  
    const { profileDetails } = route.params;
    const { name, city, phoneNumber } = profileDetails;
    return (

    <SafeAreaView style={{ flex: 1, backgroundColor:COLORS.cardBackground }}>
      <View style={styles.container}>
        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Image
              alt=""
              source={require('../../assets/avatarImg.jpg')}
              style={styles.profileAvatar} 
              resizeMode="cover"
              />

            <View>
              <Text style={styles.profileName}>{name}</Text>

              <Text style={styles.profileHandle}>{city}</Text>

              <Text style={styles.profileHandle}>{phoneNumber}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              // handle onPress 
            }}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Edit Profile</Text>

              <FeatherIcon color="#fff" name="edit-3" size={16} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 80,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,  
  },
  /** Profile */
  profile: {
    justifyContent: 'center',
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e3e3e3',
    marginLeft:20,
    marginRight:20,
    borderRadius: 12,
    elevation: 2, // Android shadow
        shadowColor: '#000', // iOS shadow
        shadowOpacity: 0.1, // iOS shadow
        shadowRadius: 2, // iOS shadow
        shadowOffset: {
            width: 0,
            height: 1,
        },
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 70,
    height: 70,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 14,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.cartTitle,
  },
  profileHandle: {
    marginTop: 4,
    fontWeight: '600',
    fontSize: 16,
    color: '#989898',
  },
  profileAction: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
});