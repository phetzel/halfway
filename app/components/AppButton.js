import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AppText from './AppText';
import colors from '../config/colors';
import { normalize } from '../util/dimensions';

const AppButton = ({ title, onPress, color = "primary" }) => {
    return (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors[color] }]}
          onPress={onPress}
        >
            <AppText style={styles.text}>{title}</AppText>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  button: {
      alignItems: "center",
      borderRadius: normalize(25),
      justifyContent: 'center',
      marginVertical: normalize(10),
      padding: normalize(15),
      width: '100%'
  },
  text: {
    color: colors.white,
    fontSize: normalize(18),
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }
});

export default AppButton;