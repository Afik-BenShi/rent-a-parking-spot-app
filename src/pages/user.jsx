import React, { useState } from 'react';
import axios from 'axios';

import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MoreIcon from 'react-native-vector-icons/Ionicons';
import AnotherIcon from 'react-native-vector-icons/FontAwesome5';


import { COLORS } from '../../assets/theme';
import styles from '../components/addProduct.style';
import { Input } from '@rneui/themed';
import config from '../backend/config'
import {signOutUser } from '../auth/auth';
import { getAuth } from 'firebase/auth';


export default function Profile({ navigation, route }) {

  const curData =
    { fullName: "default name", city: "default city", phoneNumber: "default phone number" };


  const [userId, setUserId] = useState(route.params.userId);
  const [profileData, setProfileData] = useState(curData);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [lastProfileData, setLastProfileData] = useState(curData);
  const [isSignOutLoading, setSignOutLoading] = useState(false);

  const handleDataChange = (field, value) => {
    setProfileData((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
    console.log("profileDetails: ", profileData);
  };

  // Function to handle navigation to EditProfile screen
  const goToEditProfile = () => {
    setLastProfileData(profileData);  // save the current data before editing
    setShowEditProfile(true);
  };

  const doLogOut = async () => {
    console.log('logging out');
    setSignOutLoading(true);
    const isSignedOut = await signOutUser();
    if (!isSignedOut){
      console.error("did not log out", getAuth());
      return;
    }
    navigation.navigate('auth', {screen: 'Login'});
    setSignOutLoading(false);
  }

  // Function to handle 'save' button press
  const handleSave = async () => {
    const token = await getAuth().currentUser.getIdToken();
    await axios({
      method: 'post',
      url: `http://${config.serverIp}:${config.port}/users/upsert`,
      data: { ...profileData, id: userId },
      headers: { Authorization: token },
    })
    setShowEditProfile(false);
  };

  const handleCancel = () => {
    setProfileData(lastProfileData);
    setShowEditProfile(false);
  };

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <View style={moreStyles.main_container}>

        {!showEditProfile &&
          (
            <View style={moreStyles.profile}>

              <View style={moreStyles.profileHeader}>
                <Image
                  alt=""
                  source={require('../../assets/avatarImg.jpg')}
                  style={moreStyles.profileAvatar}
                  resizeMode="cover"
                />

                <View>
                  <Text style={moreStyles.profileName}>{profileData.fullName}</Text>

                  <Text style={moreStyles.profileHandle}>{profileData.city}</Text>

                  <Text style={moreStyles.profileHandle}>{profileData.phoneNumber}</Text>
                </View>
              </View>



              <TouchableOpacity
                onPress={goToEditProfile}
              >
                <View style={moreStyles.profileAction}>
                  <Text style={moreStyles.profileActionText}>Edit Profile</Text>

                  <FeatherIcon color="#fff" name="edit-3" size={16} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={doLogOut}
                disabled={isSignOutLoading}
              >
                <View style={{...moreStyles.profileAction, backgroundColor:COLORS.red}}>
                {!isSignOutLoading?(
                  <>
                  <Text style={moreStyles.profileActionText}>Log Out</Text>
                  <FeatherIcon color="#fff" name="log-out" size={16} />
                  </>
                ):(
                  <ActivityIndicator color="#fff" size="small"/>
                )}
                </View>
              </TouchableOpacity>

            </View>
          )}


        {showEditProfile &&
          (
            <View style={moreStyles.editPage}>
              <KeyboardAvoidingView
                style={moreStyles.container}
                behavior="padding"
              >
                <ScrollView>

                  <SafeAreaView style={moreStyles.container}>


                    <View >
                      <Text style={moreStyles.title}>Edit your Profile</Text>
                    </View>

                    <View style={{ flex: 1, alignContent: 'center' }}>
                      <Image
                        alt=""
                        source={require('../../assets/avatarImg.jpg')}
                        style={moreStyles.profileAvatar_editMode}
                        resizeMode="cover"
                      />
                      <TouchableOpacity style={moreStyles.cameraIcon} onPress={() => { }/* handle change img */}>
                        <MoreIcon name="camera" size={24} color={COLORS.btnBlue} style={moreStyles.cameraIcon} />
                      </TouchableOpacity>
                    </View>


                    <Input
                      label="Full name"
                      labelStyle={styles.inputLabel}
                      leftIcon={<MoreIcon name="person" size={18} />}
                      placeholder=" Enter your full name"
                      onChangeText={(text) => handleDataChange("fullName", text)}
                      inputStyle={styles.inputControl}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      value={profileData.fullName}
                    />

                    <Input
                      label="Location"
                      labelStyle={styles.inputLabel}
                      leftIcon={<MoreIcon name="location-outline" size={18} />}
                      placeholder=" Enter your City"
                      onChangeText={(text) => handleDataChange("city", text)}
                      inputStyle={styles.inputControl}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      value={profileData.city}
                    />

                    <Input
                      label="Phone Number"
                      labelStyle={styles.inputLabel}
                      leftIcon={<AnotherIcon name="phone-alt" size={18} />}
                      placeholder=" Enter your phone number"
                      keyboardType="phone-pad"
                      onChangeText={(text) => handleDataChange("phoneNumber", text)}
                      inputStyle={styles.inputControl}
                      inputContainerStyle={{ borderBottomWidth: 0 }}
                      value={profileData.phoneNumber}
                    />



                    {/*
                      <NextBackBtn
                        backText={"Cancel"}
                        nextText={"Save"}
                        onBackPress={() => {
                          setProfileData(lastProfileData);
                          setShowEditProfile(false)
                        }}
                        onNextPress={handleSave}
                        />
                      */}



                  </SafeAreaView>
                </ScrollView>
              </KeyboardAvoidingView>

              <View>
                <View style={moreStyles.btnGroup}>
                  <TouchableOpacity
                    onPress={handleCancel}
                    style={{ flex: 1, paddingHorizontal: 6 }}>
                    <View style={moreStyles.btn}>
                      <Text style={moreStyles.btnText}>Cancel</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={handleSave}
                    style={{ flex: 1, paddingHorizontal: 6 }}>
                    <View style={moreStyles.btnPrimary}>
                      <Text style={moreStyles.btnPrimaryText}>Save</Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>


            </View>
          )}




      </View>
    </SafeAreaView>
  );
}

export const moreStyles = StyleSheet.create({
  main_container: {
    paddingVertical: 30,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignContent: 'flex-start',
  },
  editPage: {
    backgroundColor: COLORS.lightWhite,
    padding: 17,
    flex: 2,
    paddingVertical: 0,
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
    marginLeft: 20,
    marginRight: 20,
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
  profileAvatar_editMode: {
    width: 80,
    height: 80,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: '#ccc',
    alignSelf: 'center',
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.cartTitle,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.cartTitle,
    marginBottom: 20,
    alignSelf: 'center',
  },
  cameraIcon: {
    backgroundColor: 'transparent',
    borderRadius: 9999,

    position: 'absolute',
    left: 100,
    top: 30,
    padding: 0,
    alignSelf: 'center',
  },
  profileHandle: {
    marginTop: 4,
    fontWeight: '600',
    fontSize: 16,
    color: '#989898',
  },
  profileAction: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: 200,
    marginLeft: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.btnBlue, // Change the background color here
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  layout: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    alignContent: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightWhite,
    paddingVertical: 10,
    alignContent: 'flex-start',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 9999,
  },
  /** Placeholder */
  placeholder: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: 400,
    marginTop: 24,
    padding: 0,
    backgroundColor: 'transparent',
  },
  finishButton: {
    backgroundColor: COLORS.btnBlue,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1, // iOS shadow
    shadowRadius: 2, // iOS shadow
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  btn: {
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
    borderColor: '#266EF1',
  },
  btnGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: -6,
    marginTop: 18,
  },
  btnText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#266EF1',
  },
  btnPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: '#266EF1',
    borderColor: '#266EF1',
  },
  btnPrimaryText: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
});