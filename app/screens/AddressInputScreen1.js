import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import ErrorMessage from '../components/ErrorMessage';
import key from '../key/key';
import Screen from '../components/Screen';

const AddressInputScreen1 = ({ navigation }) => {
    const [addy1, setAddy1] = useState();
    const [error, setError] = useState();

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

    const handleSubmit = () => {
        if (addy1) {
            const string = addy1.split(' ').join('+');
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=${key.googleApi}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.results[0]) {
                        const { lat, lng } = data.results[0].geometry.location;
    
                        navigation.navigate(
                            "AddressInput2", 
                            { latitude1: lat, longitude1: lng, current: true }
                        )
                    } else {
                        setError('Not a Valid Address');
                    }
                })
        } else {
            setError('Please Input Address');
        }
    }


    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.top}>
                    <AppTextInput
                        autoCorrect={false}
                        onChangeText={text => setAddy1(text)}
                        placeholder="Enter First Address"
                    />
                    <ErrorMessage error={error} />
                    <AppText style={styles.text}>Or</AppText>
                    <AppButton
                        color="third"
                        onPress={getLocation}
                        title="Use Current Location" 
                    />
                </View>

                <View style={styles.bottomButtons}>
                    <AppButton
                        onPress={handleSubmit}
                        title="Next" 
                    />
                    <AppButton
                        color="secondary"
                        onPress={() => navigation.navigate("Welcome")}
                        title="Back" 
                    />
                </View>
            </View>

        </Screen>
    );
};

const styles = StyleSheet.create({
  container: {
      justifyContent: 'space-between',
      height: '100%',
      padding: 10,
      paddingBottom: 50,
      paddingTop: 200
  },
  text: {
        fontSize: 25,
        margin: 20,
  },
  top: {
      alignItems: 'center'
  }
});

export default AddressInputScreen1;