import React, { useContext, useEffect } from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import defaultFilter from '../context/default_filter';
import FilterContext from '../context/filter_context';

const WelcomeScreen = ({ navigation }) => {
    const { filter, setFilter } = useContext(FilterContext);
    console.log(filter);

    useFocusEffect(() => {
        setFilter(defaultFilter);
    });


    return (
        <ImageBackground
        blurRadius={10}
            source={require("../assets/background.jpg")}
            style={styles.background}
        >
            <View style={styles.logoContainer}>
                <Image 
                    source={require('../assets/logo.png')} 
                    style={styles.logo}/>
                <AppText style={styles.tagline}>Lets Meet Halfway</AppText>
            </View>
            <View style={styles.buttonContainer}>
                <AppButton 
                    onPress={() => navigation.navigate("AddressInput1")}
                    title="Get Started" />
            </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
  background: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end'
  },
  buttonContainer: {
      marginBottom: 30,
    padding: 20,
    width: '100%',
  },
  logo: {
      height: 200,
      width: 200
  },
  logoContainer: {
      alignItems: 'center',
      position: 'absolute',
      top: 110,
  },
  tagline: {
      fontSize: 25,
      fontWeight: '600',
      top: -30
    }
});

export default WelcomeScreen;