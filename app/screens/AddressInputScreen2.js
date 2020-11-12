import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import AppButton from '../components/AppButton';
import AppTextInput from '../components/AppTextInput';
import ErrorMessage from '../components/ErrorMessage';
import Screen from '../components/Screen';

const AddressInputScreen2 = ({ navigation, route }) => {
    const { latitude1, longitude1 } = route.params;
    const [addy2, setAddy2] = useState();

    const getLocation = async () => {
        const { granted } = await Location.requestPermissionsAsync();
        if (!granted) return;

        await Location.getLastKnownPositionAsync({}).then(({ coords }) => {
            const { latitude, longitude } = coords;
            
        })
    }



    return (
        <Screen style={styles.container}>
            <View style={styles.container}>
                <AppTextInput
                    autoCorrect={false}
                    onChangeText={text => setAddy2(text)}
                    placeholder="Enter Second Address"
                />
                <ErrorMessage error="Need Address" />
                { route.params.current &&
                    <AppButton
                        onPress={getLocation}
                        title="Use Current Location" 
                    />
                }
                <AppButton
                    onPress={() => console.log(addy2)}
                    title="Meet Halfway" 
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

export default AddressInputScreen2;