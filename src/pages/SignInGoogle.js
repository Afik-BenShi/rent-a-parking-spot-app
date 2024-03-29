import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { COLORS } from '../../assets/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';



function SignInGoogle({navigation}) {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightBackground }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt=""
            resizeMode="contain"
            style={styles.headerImg}
            source={{
              uri: 'https://withfra.me/android-chrome-512x512.png',
            }} />

          <Text style={styles.title}>
            Sign in to <Text style={{ color: '#075eec' }}>MyApp</Text>
          </Text>

          <Text style={styles.subtitle}>
            Get access to add your own parking spot
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Email address</Text>

            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={email => setForm({ ...form, email })}
              placeholder=""
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={form.email} />
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Password</Text>

            <TextInput
              autoCorrect={false}
              onChangeText={password => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={form.password} />
          </View>

          <View style={styles.formAction}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>Sign in</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.formActionSpacer} />

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.btnSecondary}>
                <MaterialCommunityIcons
                  color="#000"
                  name="face-recognition"
                  size={22}
                  style={{ marginRight: 12 }} />

                <Text style={styles.btnSecondaryText}>Face ID</Text>

                <View style={{ width: 34 }} />
              </View>
            </TouchableOpacity>

            <View style={styles.formActionSpacer} />

            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.GoogleBtn}>
                <MaterialCommunityIcons
                  color="#000"
                  name="google"
                  size={22}
                  style={{ marginRight: 12 }} />

                <Text style={styles.btnSecondaryText}>Sign in with Google</Text>

                <View style={{ width: 34 }} />
              </View>
            </TouchableOpacity>
          
          </View>
          </View>

                <TouchableOpacity
                    onPress={() => {
                    // handle link
                    }}
                    style={{ marginTop: 'auto' }}>
                    <Text style={styles.formFooter}>
                    Don't have an account?{' '}
                    <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
                    </Text>
                </TouchableOpacity>
        
        
        
        </View>
        </SafeAreaView>
  );
}

export default SignInGoogle;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  /** Header */
  header: {
    marginVertical: 36,
  },
  headerImg: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 36,
  },
  /** Form */
  form: {
    marginBottom: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginVertical: 24,
  },
  formActionSpacer: {
    marginVertical: 8,
  },
  formFooter_2: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  formFooter: {
    marginTop: 'auto',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    color: '#929292',
    textAlign: 'center',
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel_onTop: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputLabel: {
    position: 'absolute',
    width: 110,
    lineHeight: 44,
    top: 0,
    left: 0,
    bottom: 0,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#c0c0c0',
    zIndex: 9,
  },
  inputControl_withoutPad: {
    height: 44,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  inputControl: {
    height: 44,
    backgroundColor: '#fff',
    paddingLeft: 110,
    paddingRight: 24,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  /** Button */
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#075eec',
    borderColor: '#075eec',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  btnSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: '#000',
  },
  btnSecondaryText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#000',
  },
  GoogleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: COLORS.lightgrey,
  },
});