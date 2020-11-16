import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';
import { normalize } from '../util/dimensions';

const NoResponse = (props) => {
    return (
        <View style={styles.container}>
            <AppText style={styles.text}>Nothing Found Halfway</AppText>
            <AppText style={styles.text}>Change Filters</AppText>
            <AppText style={styles.text}>Or</AppText>
            <AppText style={styles.text}>Try a New Search </AppText>
        </View>
        );
};

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      height: '100%',
      justifyContent: 'center',
      paddingBottom: normalize(150)
  },
  text: {
      fontSize: normalize(20),
      paddingBottom: normalize(10)
  }
});

export default NoResponse;