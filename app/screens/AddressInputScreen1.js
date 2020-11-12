import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ErrorMessage from '../components/ErrorMessage';
import Screen from '../components/Screen';

const AddressInputScreen1 = ({ navigation }) => {
    const [addy1, setAddy1] = useState();

    const getLocation = async () => {
        const { granted } = await Location.requestPermissionsAsync();
        if (!granted) return;

        await Location.getLastKnownPositionAsync({}).then(({ coords }) => {
            const { latitude, longitude } = coords;

            navigation.navigate(
                "AddressInput2", 
                { latitude1: latitude, longitude1: longitude, current: false }
            )
        })
    }


    return (
        <Screen style={styles.container}>
            <View style={styles.container}>
                <AppTextInput
                    autoCorrect={false}
                    onChangeText={text => setAddy1(text)}
                    placeholder="Enter First Address"
                />
                <ErrorMessage error="Need Address" />
                <AppButton
                    onPress={getLocation}
                    title="Use Current Location" 
                />
                <AppButton
                    onPress={() => navigation.navigate("AddressInput2", { current: true })}
                    title="Next" 
                />
                <AppButton
                    color="secondary"
                    onPress={() => navigation.navigate("Welcome")}
                    title="Back" 
                />
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
  container: {
      justifyContent: 'center',
      height: '100%',
      padding: 10
  },
});

export default AddressInputScreen1;