import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import colors from '../config/colors';
import DollarPicker from '../components/DollarPicker';
import Screen from '../components/Screen';

const FilterScreen = ({ navigation }) => {
    return (
        <Screen>
            <View style={styles.container}>
                <DollarPicker />

                <AppButton
                    color="secondary"
                    onPress={() => navigation.navigate("Results")}
                    title="Back" 
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
  container: {
    //   backgroundColor: 'pink',
  },
});

export default FilterScreen;