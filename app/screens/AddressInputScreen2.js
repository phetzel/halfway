import React, { useState, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';

import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import AppTextInput from '../components/AppTextInput';
import ErrorMessage from '../components/ErrorMessage';
import FilterContext from '../context/filter_context';
import { normalize } from '../util/dimensions';
import key from '../key/key';
import Screen from '../components/Screen';

const AddressInputScreen2 = ({ navigation, route }) => {
    const { filter, setFilter } = useContext(FilterContext);

    const [addy2, setAddy2] = useState();
    const [error, setError] = useState();

    const getLocation = async () => {
        const { granted } = await Location.requestPermissionsAsync();
        if (!granted) return;

        await Location.getLastKnownPositionAsync({}).then(({ coords }) => {
            const { latitude, longitude } = coords;

            let obj = Object.assign({}, filter);
            obj['addy2'] = {latitude: latitude, longitude: longitude };
            setFilter(obj);
            
            navigation.navigate("Results");
        })
    }

    const handleSubmit = () => {
        if (addy2) {
            const string = addy2.split(' ').join('+');
            const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=${key.googleApi}`;
            
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.results[0]) {
                        const { lat, lng } = data.results[0].geometry.location;

                        let obj = Object.assign({}, filter);
                        obj['addy2'] = {latitude: lat, longitude: lng};
                        setFilter(obj);


                        navigation.navigate("Results");
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
                <View>
                    <AppTextInput
                        autoCorrect={false}
                        onChangeText={text => setAddy2(text)}
                        placeholder="Enter Second Address"
                    />
                    <ErrorMessage error={error} />
                    { filter && filter.addy1.current &&
                        <View>
                            <AppText style={styles.text}>Or</AppText>
                            <AppButton
                                color="third"
                                onPress={getLocation}
                                title="Use Current Location" 
                            />
                        </View>
                    }
                </View>

                <View>
                    <AppButton
                        onPress={handleSubmit}
                        title="Meet Halfway" 
                    />
                    <AppButton
                        color="secondary"
                        onPress={() => navigation.navigate("AddressInput1")}
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
      padding: normalize(10),
      paddingBottom: normalize(20),
      paddingTop: normalize(50)
  },
    text: {
        alignSelf: 'center',
        fontSize: normalize(20),
        margin: normalize(20),
  },
});

export default AddressInputScreen2;