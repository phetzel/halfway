import React from 'react';
import { StyleSheet, View } from 'react-native';

import AppText from './AppText';

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
      paddingBottom: 150
  },
  text: {
      fontSize: 20,
      paddingBottom: 10
  }
});

export default NoResponse;