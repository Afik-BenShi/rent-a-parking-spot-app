import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default function NextBackBtn({ nextText, backText, navigation, onNextPress }) {
  return (
    <View>
        <View style={styles.btnGroup}>
            <TouchableOpacity
              onPress={navigation.goBack}
              style={{ flex: 1, paddingHorizontal: 6 }}>
              <View style={styles.btn}>
                <Text style={styles.btnText}>{backText}</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={onNextPress}
              style={{ flex: 1, paddingHorizontal: 6 }}>
              <View style={styles.btnPrimary}>
                <Text style={styles.btnPrimaryText}>{nextText}</Text>
              </View>
            </TouchableOpacity>
          </View>

    </View>
  );
}

const styles = StyleSheet.create({
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
