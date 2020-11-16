import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import colors from '../config/colors';

const Screen = ({ children }) => {
    return (
        <SafeAreaView style={styles.screen}>
            {children}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
  screen: {
    //   backgroundColor: colors.background,
      height: '100%',
      paddingTop: Constants.statusBarHeight
  },
});

export default Screen;